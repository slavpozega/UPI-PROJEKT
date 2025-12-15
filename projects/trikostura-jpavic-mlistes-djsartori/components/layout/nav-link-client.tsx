'use client';

import { NavLink } from './nav-link';
import { useLanguage } from '@/contexts/language-context';
import type { TranslationKey } from '@/lib/translations';

interface NavLinkClientProps {
  href: string;
  translationKey: TranslationKey;
  className?: string;
}

export function NavLinkClient({ href, translationKey, className }: NavLinkClientProps) {
  const { t } = useLanguage();

  return (
    <NavLink href={href} className={className}>
      {t(translationKey)}
    </NavLink>
  );
}
