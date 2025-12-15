'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

export function NavbarLoginButton() {
  const { t } = useLanguage();
  return (
    <Link href="/auth/login">
      <Button variant="outline" size="sm">
        {t('login')}
      </Button>
    </Link>
  );
}

export function NavbarRegisterButton() {
  const { t } = useLanguage();
  return (
    <Link href="/auth/register">
      <Button variant="gradient" size="sm">
        {t('register')}
      </Button>
    </Link>
  );
}

export function NavbarNewTopicButton() {
  const { t } = useLanguage();
  return (
    <Link href="/forum/new">
      <Button variant="gradient" size="sm">
        {t('newTopic')}
      </Button>
    </Link>
  );
}
