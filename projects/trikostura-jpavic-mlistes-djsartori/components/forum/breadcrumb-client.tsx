'use client';

import { Breadcrumb } from './breadcrumb';
import { useLanguage } from '@/contexts/language-context';
import type { TranslationKey } from '@/lib/translations';

interface BreadcrumbItem {
  labelKey?: TranslationKey;
  label?: string;
  href?: string;
}

interface BreadcrumbClientProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbClient({ items }: BreadcrumbClientProps) {
  const { t } = useLanguage();

  const translatedItems = items.map(item => ({
    label: item.labelKey ? t(item.labelKey) : (item.label || ''),
    href: item.href,
  }));

  return <Breadcrumb items={translatedItems} />;
}
