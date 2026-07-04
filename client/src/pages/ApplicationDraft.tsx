import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

import { mockSchemes } from "../data/mockSchemes";

export default function ApplicationDraft() {
  const { id } = useParams();
  const navigate = useNavigate();

  const scheme = mockSchemes.find(
    (s) => s.id === Number(id)
  );

  if (!scheme) {
    return <PageContainer>Draft not found.</PageContainer>;
  }

  const draft = `
Application for ${scheme.name}

Applicant Name: Yash Saxena

Address:
Rampur, Uttar Pradesh

Reason for Applying:
${scheme.why}

Required Documents:
${scheme.documents.join(", ")}

Official Website:
${scheme.officialLink}
`;

  const copyDraft = async () => {
    await navigator.clipboard.writeText(draft);
    alert("Application Draft Copied!");
  };

  return (
    <>
      <Header />

      <PageContainer>

        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <h1 className="text-3xl font-bold mt-6">
          Application Draft
        </h1>

        <div className="bg-gray-100 rounded-xl p-6 mt-6 whitespace-pre-line">
          {draft}
        </div>

        <Button
          className="mt-6"
          onClick={copyDraft}
        >
          Copy Draft
        </Button>

      </PageContainer>

      <BottomBar />
      <Footer />
    </>
  );
}