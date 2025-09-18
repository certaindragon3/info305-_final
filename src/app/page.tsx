import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Placeholder for other sections */}
      <div id="photo-gallery" className="min-h-screen bg-muted/10 flex items-center justify-center">
        <p className="text-muted-foreground">Photo Gallery & Reviews Section - Coming Next</p>
      </div>
    </div>
  );
}
