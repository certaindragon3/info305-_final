'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { restaurant, culturalContext, photoGallery } from "@/lib/data"
import Image from "next/image"

const heroPhotos = photoGallery.slice(0, 5) // Use first 5 photos for hero carousel

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('photo-gallery')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgba(255,255,255,1)"
        gradientBackgroundEnd="rgba(255,239,225,1)"
        primaryColor="233, 118, 54"
        secondaryColor="108, 156, 80"
        pointerColor="233, 118, 54"
        size="70%"
        blendingValue="soft-light"
        containerClassName="min-h-screen w-full flex items-center justify-center px-4 py-20 text-foreground"
        className="relative z-10 flex w-full items-center justify-center"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Preserving Subang Cuisine Heritage
                  </span>
                </h1>
                <div className="text-xl md:text-2xl text-muted-foreground space-y-2">
                  <p className="font-medium">{restaurant.name}</p>
                  <p className="text-sm">Est. {restaurant.established} • {restaurant.location}</p>
                </div>
              </div>

              <div className="space-y-6">
                <blockquote className="text-lg italic border-l-4 border-primary pl-6 text-muted-foreground">
                  "Labor-intensive culinary traditions are disappearing in modern fast-paced society"
                </blockquote>

                <p className="text-base leading-relaxed text-muted-foreground">
                  {culturalContext.overview.split('.')[0]}.{' '}
                  <span className="text-foreground font-medium">
                    This neighborhood eatery represents a critical moment of cultural transition.
                  </span>
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">What's at stake:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {culturalContext.threats[0]}</li>
                    <li>• {culturalContext.threats[1]}</li>
                    <li>• {culturalContext.threats[3]}</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <InteractiveHoverButton
                  type="button"
                  onClick={scrollToNext}
                  className="px-10 py-3 text-base shadow-md border-border/50 bg-background/80 backdrop-blur transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  Explore Stories Below
                </InteractiveHoverButton>
              </div>
            </div>

            {/* Right Photo Carousel */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Carousel
                  className="w-full max-w-sm"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {heroPhotos.map((photo, index) => (
                      <CarouselItem key={photo.id}>
                        <div className="p-1">
                          <Card className="border-2 border-muted shadow-xl">
                            <CardContent className="p-0">
                              <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
                                <Image
                                  src={photo.imageUrl}
                                  alt={photo.alt}
                                  fill
                                  className="object-cover transition-transform hover:scale-105"
                                  placeholder="blur"
                                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                              </div>
                              <div className="p-4 bg-card">
                                <h3 className="font-medium text-sm text-center">
                                  {photo.title}
                                </h3>
                                <p className="text-xs text-muted-foreground text-center mt-1">
                                  {photo.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>

                {/* Decorative Frame Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30"></div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </section>
  )
}
