import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

import { mockSchemes } from "../data/mockSchemes";

export default function SchemeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const scheme = mockSchemes.find(
    (s) => s.id === Number(id)
  );

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
          {scheme.name}
        </h1>

        <p className="text-green-600 font-semibold mt-2">
          {scheme.match}% Match
        </p>

        <div className="bg-blue-50 p-4 rounded-xl mt-6">
          <h2 className="font-bold mb-2">
            Why You Match
          </h2>

          <p>{scheme.why}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Benefits
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {scheme.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Eligibility
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {scheme.eligibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Required Documents
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {scheme.documents.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <a
          href={scheme.officialLink}
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