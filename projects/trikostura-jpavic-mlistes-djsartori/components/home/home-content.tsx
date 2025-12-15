'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SkriptaLogo } from "@/components/branding/skripta-logo";
import { MessageSquare, Users, BookOpen, Lightbulb, TrendingUp, Award, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function HomeContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="animate-pulse-slow">
              <SkriptaLogo size={120} />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-skripta text-white rounded-full text-sm font-medium mb-4 animate-slide-up shadow-lg">
              <Sparkles className="w-4 h-4" />
              {t('homeTagline')}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-gradient animate-slide-up">
              {t('homeTitle')}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-semibold animate-slide-up">
              {t('homeSubtitle')}
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-up">
              {t('homeDescription')}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center gap-4 pt-4 flex-wrap">
            <Link href="/forum">
              <Button variant="gradient" size="xl" className="group shadow-xl">
                <MessageSquare className="w-5 h-5" />
                {t('getStarted')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
                <Users className="w-10 h-10 mx-auto mb-3 text-red-500" />
                <div className="text-4xl font-bold bg-gradient-to-br from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">1000+</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('statsStudents')}</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 text-blue-500" />
                <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">500+</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('statsTopics')}</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
                <Sparkles className="w-10 h-10 mx-auto mb-3 text-purple-500" />
                <div className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-purple-600 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('statsSupport')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('homeTagline')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-300" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                {t('featuresCommunityTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('featuresCommunityDesc')}
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-300" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                {t('featuresNotesTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('featuresNotesDesc')}
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-300" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                {t('featuresQATitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('featuresQADesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
