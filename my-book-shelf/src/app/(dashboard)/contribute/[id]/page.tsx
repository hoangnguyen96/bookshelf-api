import { getBookById } from "@app/features/dashboard/actions";
import { EditContribution } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute Update",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const EditContributionPage = async ({ params }: { params: { id: string } }) => {
  const { data: book } = await getBookById(params.id);

  return <EditContribution book={book} />;
};

export default EditContributionPage;
