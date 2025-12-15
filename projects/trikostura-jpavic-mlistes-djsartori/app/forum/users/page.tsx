import { createServerSupabaseClient } from '@/lib/supabase/server';
import { BreadcrumbClient } from '@/components/forum/breadcrumb-client';
import { UsersContent } from '@/components/forum/users-content';

// Revalidate every 5 minutes for better performance
export const revalidate = 300;

export default async function UsersPage() {
  const supabase = await createServerSupabaseClient();

  // PARALLEL QUERIES: Fetch all data at once
  const [
    { count: totalUsers },
    { count: totalTopics },
    { count: totalReplies },
    { data: topByReputation },
    { data: recentUsers },
    { data: topicCounts },
    { data: replyCounts }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('topics').select('*', { count: 'exact', head: true }),
    supabase.from('replies').select('*', { count: 'exact', head: true }),
    supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, reputation, role, created_at')
      .order('reputation', { ascending: false })
      .limit(10),
    supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, reputation, role, created_at')
      .order('created_at', { ascending: false })
      .limit(50),
    // Only select author_id for counting - much lighter query
    supabase.from('topics').select('author_id'),
    supabase.from('replies').select('author_id')
  ]);

  // Aggregate counts per user
  const activityMap = new Map<string, { topics: number; replies: number }>();

  topicCounts?.forEach((t: any) => {
    const current = activityMap.get(t.author_id) || { topics: 0, replies: 0 };
    activityMap.set(t.author_id, { ...current, topics: current.topics + 1 });
  });

  replyCounts?.forEach((r: any) => {
    const current = activityMap.get(r.author_id) || { topics: 0, replies: 0 };
    activityMap.set(r.author_id, { ...current, replies: current.replies + 1 });
  });

  // Get top 20 most active user IDs
  const topActivityIds = Array.from(activityMap.entries())
    .map(([userId, counts]) => ({
      userId,
      total: counts.topics + counts.replies,
      topics: counts.topics,
      replies: counts.replies,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 20)
    .map(a => a.userId);

  // Fetch full profile data for most active users
  const { data: activeUserProfiles } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, reputation, role, created_at')
    .in('id', topActivityIds);

  // Combine profile data with activity counts
  const mostActive = (activeUserProfiles || [])
    .map((user: any) => {
      const activity = activityMap.get(user.id) || { topics: 0, replies: 0 };
      return {
        ...user,
        topic_count: activity.topics,
        reply_count: activity.replies,
        total_activity: activity.topics + activity.replies,
      };
    })
    .sort((a, b) => b.total_activity - a.total_activity)
    .slice(0, 10);

  // Prepare newest members with activity data
  const newestMembers = (recentUsers || [])
    .map((user: any) => {
      const activity = activityMap.get(user.id) || { topics: 0, replies: 0 };
      return {
        ...user,
        topic_count: activity.topics,
        reply_count: activity.replies,
        total_activity: activity.topics + activity.replies,
      };
    })
    .slice(0, 10);

  // For "All Users" search, combine all unique users we've fetched
  const allUserIds = new Set([
    ...(topByReputation || []).map((u: any) => u.id),
    ...(activeUserProfiles || []).map((u: any) => u.id),
    ...(recentUsers || []).map((u: any) => u.id),
  ]);

  const { data: allUserProfiles } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, reputation, role, created_at')
    .in('id', Array.from(allUserIds));

  const usersWithActivity = (allUserProfiles || []).map((user: any) => {
    const activity = activityMap.get(user.id) || { topics: 0, replies: 0 };
    return {
      ...user,
      topic_count: activity.topics,
      reply_count: activity.replies,
      total_activity: activity.topics + activity.replies,
    };
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Breadcrumb Navigation */}
      <BreadcrumbClient
        items={[
          { labelKey: 'forum', href: '/forum' },
          { labelKey: 'users' },
        ]}
      />

      <UsersContent
        totalUsers={totalUsers || 0}
        totalTopics={totalTopics || 0}
        totalReplies={totalReplies || 0}
        topByReputation={topByReputation || []}
        mostActive={mostActive || []}
        newestMembers={newestMembers || []}
        usersWithActivity={usersWithActivity}
      />
    </div>
  );
}
