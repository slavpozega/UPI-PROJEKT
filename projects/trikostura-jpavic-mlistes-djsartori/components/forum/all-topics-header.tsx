'use client';

import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function AllTopicsHeader() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2 mb-6">
      <Clock className="w-5 h-5 text-primary" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('allTopics')}</h2>
    </div>
  );
}
