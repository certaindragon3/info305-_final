import { Suspense, lazy } from "react";
import HeroSection from "@/components/sections/HeroSection";
import FloatingDockNav from "@/components/ui/floating-dock-nav";
import { SectionLoader, GallerySkeleton } from "@/components/loading/SectionLoader";

// Lazy load heavy sections for better initial load performance
const EthnographicEntrySection = lazy(() => import("@/components/sections/EthnographicEntrySection"));
const PhotoGallerySection = lazy(() => import("@/components/sections/PhotoGallerySection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection").then(mod => ({ default: mod.GallerySection })));
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const ProjectInfoSection = lazy(() => import("@/components/sections/ProjectInfoSection"));

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero loads immediately - first contentful paint */}
      <HeroSection />

      {/* Ethnographic entry section */}
      <Suspense fallback={<SectionLoader text="Loading Fieldwork Documentation" />}>
        <EthnographicEntrySection />
      </Suspense>

      {/* Gallery sections lazy load on scroll */}
      <Suspense fallback={<GallerySkeleton />}>
        <PhotoGallerySection />
      </Suspense>

      <Suspense fallback={<SectionLoader text="Loading Gallery" />}>
        <GallerySection />
      </Suspense>

      <Suspense fallback={<SectionLoader text="Loading Restaurant History" />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SectionLoader text="Loading Project Information" />}>
        <ProjectInfoSection />
      </Suspense>

      {/* Navigation loads immediately */}
      <FloatingDockNav />
    </div>
  );
}
