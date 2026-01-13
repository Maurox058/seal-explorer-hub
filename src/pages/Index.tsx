import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SpeciesSection from '@/components/SpeciesSection';
import InteractiveMap from '@/components/InteractiveMap';
import CompareSection from '@/components/CompareSection';
import QuizSection from '@/components/QuizSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SpeciesSection />
      <InteractiveMap />
      <CompareSection />
      <QuizSection />
      <Footer />
    </div>
  );
};

export default Index;
