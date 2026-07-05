import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { generateDraft } from "../services/draft";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

export default function ApplicationDraft() {
  const navigate = useNavigate();
  const location = useLocation();

  const scheme = location.state;

  const [draft, setDraft] = useState(
    "Generating application draft..."
  );

  useEffect(() => {
    if (!scheme) return;

    const profile = JSON.parse(
      localStorage.getItem("profile") || "{}"
    );

    async function loadDraft() {
      try {
        const result = await generateDraft(
          profile,
          scheme
        );

        setDraft(result.draft);
      } catch (err) {
        console.error(err);
        setDraft("Unable to generate draft.");
      }
    }

    loadDraft();
  }, [scheme]);

  if (!scheme) {
    return <PageContainer>Draft not found.</PageContainer>;
  }

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