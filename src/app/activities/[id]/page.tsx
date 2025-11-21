// page.tsx
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
}: Readonly<ActivityDetailPageProps>) {
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
