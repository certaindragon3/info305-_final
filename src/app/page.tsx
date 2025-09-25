import HeroSection from "@/components/sections/HeroSection";
import PhotoGallerySection from "@/components/sections/PhotoGallerySection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PhotoGallerySection />
    </div>
  );
}
