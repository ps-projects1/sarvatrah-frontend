import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DestinationGallerySection from "@/components/home/DestinationGallerySection";
import HeroSection from "@/components/home/HeroSection";
import InvertedDestinationSection from "@/components/home/InvertedDestinationSection";
import PilgrimageSection from "@/components/home/PilgrimageSection";
import RequestCallBackSection from "@/components/home/RequestCallBackSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import TravelAdventuresPage from "@/components/home/TravelAdventuresPage";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <DestinationGallerySection />
      <PilgrimageSection />
      <TravelAdventuresPage />
      <InvertedDestinationSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}
