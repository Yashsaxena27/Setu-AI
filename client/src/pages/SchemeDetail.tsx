import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExplanation } from "../services/explain";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

export default function SchemeDetail() {
  useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const scheme = location.state;

  const [reasons, setReasons] = useState<string[]>([]);
const [loadingReason, setLoadingReason] = useState(true);

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

        const explanation = result.explanation ?? "";

const parsedReasons = explanation
  .split("\n")
  .filter((line: string) => {
  const trimmed = line.trim();
  return trimmed.startsWith("-") || trimmed.startsWith("•");
})
.map((line: string) =>
  line.replace(/^[-•]\s*/, "").trim()
);
  

setReasons(parsedReasons);
setLoadingReason(false);
      } catch (err) {
        console.error(err);

       setLoadingReason(false);

setReasons([
  "AI explanation is temporarily unavailable.",

]);


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

        <div className="mt-4 bg-green-50 rounded-xl p-4">
  <p className="text-sm text-gray-600">
    Match Score
  </p>

  <p className="text-4xl font-bold text-green-600">
    {scheme.score}%
  </p>
</div>

        <div className="bg-blue-50 p-4 rounded-xl mt-6">
          <h2 className="font-bold mb-2">
            Why You Match
          </h2>

         {loadingReason ? (
  <p className="animate-pulse text-gray-500">
    Generating AI explanation...
  </p>
) : (
  <ul className="space-y-2 mt-3">
    {reasons.map((reason, index) => (
      <li
        key={index}
        className="flex items-start gap-2"
      >
        <span className="text-green-600">✔</span>
        <span>{reason}</span>
      </li>
    ))}
  </ul>
)}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Benefits
          </h2>

          <ul className="list-disc ml-6 space-y-2">
  {scheme.eligibility_rules &&
    Object.entries(scheme.eligibility_rules).map(
      ([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong>{" "}
          {Array.isArray(value)
            ? value.join(", ")
            : String(value)}
        </li>
      )
    )}
</ul>
        </div>

        <ul className="list-disc ml-6 space-y-2">
  {scheme.eligibility_rules &&
    Object.entries(scheme.eligibility_rules).map(([key, value]) => {
      if (value === null || value === undefined) return null;

      const label = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return (
        <li key={key}>
          <strong>{label}:</strong>{" "}
          {Array.isArray(value)
            ? value.join(", ")
            : String(value)}
        </li>
      );
    })}
</ul>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Required Documents
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {(scheme.documents || []).map(
              (item: string) => (
                <li key={item}>{item}</li>
              )
            )}
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