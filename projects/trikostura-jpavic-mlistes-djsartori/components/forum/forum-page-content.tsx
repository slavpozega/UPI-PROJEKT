'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import type { Category, Topic, Profile } from '@/types/database';
import type { TranslationKey } from '@/lib/translations';

// Map category slugs to translation keys
const getCategoryNameKey = (slug: string): TranslationKey => {
  const mapping: Record<string, TranslationKey> = {
    'opce': 'categoryGeneral',
    'pitanja-i-odgovori': 'categoryQA',
    'studij': 'categoryStudy',
    'karijera': 'categoryCareer',
    'tehnologija': 'categoryTech',
    'lifestyle': 'categoryLifestyle',
  };
  return mapping[slug] || 'categoryGeneral';
};

const getCategoryDescKey = (slug: string): TranslationKey => {
  const mapping: Record<string, TranslationKey> = {
    'opce': 'categoryGeneralDesc',
    'pitanja-i-odgovori': 'categoryQADesc',
    'studij': 'categoryStudyDesc',
    'karijera': 'categoryCareerDesc',
    'tehnologija': 'categoryTechDesc',
    'lifestyle': 'categoryLifestyleDesc',
  };
  return mapping[slug] || 'categoryGeneralDesc';
};

interface LatestTopicData {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  category_id: string;
  author: Pick<Profile, 'username'> | null;
}

interface CategoryWithStats extends Category {
  topic_count: number;
  latest_topic: LatestTopicData | null;
}

interface TopicWithCategoryAndAuthor extends Topic {
  category: Pick<Category, 'name' | 'slug' | 'color'> | null;
  author: Pick<Profile, 'username' | 'avatar_url'> | null;
  view_count: number;
  reply_count: number;
}

interface ForumPageContentProps {
  categories: CategoryWithStats[];
  trendingTopics: TopicWithCategoryAndAuthor[];
}

export function ForumPageContent({ categories, trendingTopics }: ForumPageContentProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t('forumCategoriesTitle')}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            {t('forumCategoriesSubtitle')}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="hover-lift cursor-pointer border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                  <div
                    className="text-3xl sm:text-4xl flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/forum/category/${category.slug}`}>
                      <h3 className="text-lg sm:text-xl font-bold hover:text-primary transition-colors truncate text-gray-900 dark:text-white">
                        {t(getCategoryNameKey(category.slug))}
                      </h3>
                    </Link>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {t(getCategoryDescKey(category.slug))}
                    </p>
                    {category.latest_topic && (
                      <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 line-clamp-1">
                        {t('lastTopic')}:{' '}
                        <Link
                          href={`/forum/topic/${category.latest_topic.slug}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {category.latest_topic.title}
                        </Link>
                        <span className="hidden sm:inline">
                          {' '}{t('by')} {category.latest_topic.author?.username}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {category.topic_count}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">{t('topicsCount')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trending Topics Section */}
      {trendingTopics && trendingTopics.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {t('trending')}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trendingTopics.slice(0, 3).map((topic, index) => (
              <Card key={topic.id} className="hover-lift cursor-pointer border-gray-200 dark:border-gray-700 bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/10 dark:to-gray-800">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl font-bold text-orange-500/50">#{index + 1}</div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/forum/topic/${topic.slug}`}
                        className="text-sm sm:text-base font-bold hover:text-primary transition-colors block line-clamp-2 text-gray-900 dark:text-white"
                      >
                        {topic.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{topic.view_count} {t('views')}</span>
                        <span>•</span>
                        <span>{topic.reply_count} {t('replies')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
