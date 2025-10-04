import HeroSection from "@/components/sections/HeroSection";
import PhotoGallerySection from "@/components/sections/PhotoGallerySection";
import CustomerReviewSection from "@/components/sections/CustomerReviewSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PhotoGallerySection />
      <CustomerReviewSection />
    </div>
  );
}
