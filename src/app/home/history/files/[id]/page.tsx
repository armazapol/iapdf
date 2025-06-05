import { getFiles } from "@/app/actions";
import ViewFiles from "@/components/ViewFiles";
// import { useRouter } from "next/navigation";

type Params = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date: string }>;
};

export default async function Page({ params, searchParams }: Params) {
  const { id } = await params;
  const { date } = await searchParams;
  const { data } = await getFiles(Number(id));

  return <ViewFiles date={date} files={data} idPDF={Number(id)} />;
}
