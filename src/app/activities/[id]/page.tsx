// page.tsx
import { notFound } from "next/navigation";
import RequestCallBackSection from "@/components/home/RequestCallBackSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ActivityDetailsSection from "@/components/activities/ActivityDetailsSection";

interface ActivityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const id = (await params).id;

  return (
    <>
      <Header />
      <ActivityDetailsSection id={id} />
      <RequestCallBackSection />
      <Footer />
    </>
  );
}
