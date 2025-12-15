import { HomeContent } from "@/components/home/home-content";

// Metadata for SEO
export const metadata = {
  title: 'Skripta - Hrvatska Studentska Zajednica | Tvoja Digitalna Skripta',
  description: 'Spoji se s kolegama, dijeli znanje, pronađi odgovore na pitanja iz faksa. Najbolja studentska zajednica u Hrvatskoj. Više od 1000+ studenata, 500+ tema, 24/7 podrška.',
  keywords: ['skripta', 'studenti', 'hrvatska', 'forum', 'faks', 'učenje', 'zajednica', 'pitanja', 'odgovori'],
  openGraph: {
    title: 'Skripta - Hrvatska Studentska Zajednica',
    description: 'Spoji se s kolegama, dijeli znanje, pronađi odgovore na pitanja iz faksa.',
    type: 'website',
  },
};

// Cache this page for 1 hour
export const revalidate = 3600;

export default function Home() {
  return <HomeContent />;
}
