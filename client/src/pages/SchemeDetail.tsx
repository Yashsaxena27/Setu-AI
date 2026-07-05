import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExplanation } from "../services/explain";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

export default function SchemeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const scheme = location.state;

  const [whyMatch, setWhyMatch] = useState(
    "Loading AI explanation..."
  );

  useEffect(() => {
    if (!scheme) return;

    const profile = JSON.parse(
      localStorage.getItem("profile") || "{}"
    );

    async function loadExplanation() {
      try {
        const result = await getExplanation(
          scheme._id,
          profile
        );

        setWhyMatch(result.explanation);
      } catch (err) {
        console.error(err);
        setWhyMatch(
          "Unable to generate explanation."
        );
      }
    }

    loadExplanation();
  }, [scheme]);

  if (!scheme) {
    return (
      <PageContainer>
        <h2>Scheme not found.</h2>
      </PageContainer>
    );
  }

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
          {scheme.scheme_name}
        </h1>

        <p className="text-green-600 font-semibold mt-2">
          {scheme.match}% Match
        </p>

        <div className="bg-blue-50 p-4 rounded-xl mt-6">
          <h2 className="font-bold mb-2">
            Why You Match
          </h2>

          <p className="whitespace-pre-line">
            {whyMatch}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Benefits
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {(scheme.benefits || []).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Eligibility
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {(scheme.eligibility || []).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Required Documents
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {(scheme.documents || []).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <a
          href={scheme.official_link}
          target="_blank"
          rel="noreferrer"
        >
          <Button className="mt-8">
            Visit Official Website
          </Button>
        </a>
      </PageContainer>

      <BottomBar />
      <Footer />
    </>
  );
}