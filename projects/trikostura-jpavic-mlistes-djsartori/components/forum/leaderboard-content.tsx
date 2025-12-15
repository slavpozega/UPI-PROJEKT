'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Trophy, TrendingUp, Star, Flame, Award } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

interface LeaderboardUser {
  id: string;
  username: string;
  avatar_url?: string;
  reputation: number;
  activityCount?: number;
  streak?: number;
}

interface LeaderboardContentProps {
  topAllTime: LeaderboardUser[];
  topActive: LeaderboardUser[];
  topStreaks: LeaderboardUser[];
}

export function LeaderboardContent({ topAllTime, topActive, topStreaks }: LeaderboardContentProps) {
  const { t } = useLanguage();

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('leaderboardTitle')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('bestContributors')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* All Time Leaders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              {t('allTime')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topAllTime?.map((user, index) => (
                <Link
                  key={user.id}
                  href={`/forum/user/${user.username}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`text-lg font-bold w-6 ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-orange-600' :
                    'text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <Avatar
                    src={user.avatar_url}
                    alt={user.username}
                    username={user.username}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.reputation} RP</div>
                  </div>
                  {index < 3 && (
                    <Award className={`w-5 h-5 ${
                      index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-400' :
                      'text-orange-600'
                    }`} />
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Active This Month */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {t('thisMonth')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topActive?.map((user, index) => (
                <Link
                  key={user.id}
                  href={`/forum/user/${user.username}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="text-lg font-bold w-6 text-gray-500">
                    {index + 1}
                  </div>
                  <Avatar
                    src={user.avatar_url}
                    alt={user.username}
                    username={user.username}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.activityCount} {t('activities')}</div>
                  </div>
                  {index === 0 && <Star className="w-5 h-5 text-blue-600" />}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Longest Streaks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              {t('longestStreaks')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topStreaks?.map((user, index) => (
                <Link
                  key={user.id}
                  href={`/forum/user/${user.username}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="text-lg font-bold w-6 text-gray-500">
                    {index + 1}
                  </div>
                  <Avatar
                    src={user.avatar_url}
                    alt={user.username}
                    username={user.username}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.streak} {t('days')}</div>
                  </div>
                  {index === 0 && <Flame className="w-5 h-5 text-orange-600" />}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
