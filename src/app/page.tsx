import HeroSection from "@/components/sections/HeroSection";
import PhotoGallerySection from "@/components/sections/PhotoGallerySection";
import { GallerySection } from "@/components/sections/GallerySection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectInfoSection from "@/components/sections/ProjectInfoSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PhotoGallerySection />
      <GallerySection />
      <AboutSection />
      <ProjectInfoSection />
    </div>
  );
}
