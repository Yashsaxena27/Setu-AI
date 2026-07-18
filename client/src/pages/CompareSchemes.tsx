import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

export default function CompareSchemes() {
  const navigate = useNavigate();
  const location = useLocation();

  const { scheme1, scheme2 } = location.state || {};

  if (!scheme1 || !scheme2) {
    return (
      <PageContainer>
        <h2 className="text-2xl font-bold">Select two schemes to compare.</h2>

        <Button
          className="mt-6"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </PageContainer>
    );
  }

  function renderList(items: string[]) {
    if (!items?.length) return "-";

    return (
      <ul className="list-disc ml-5 space-y-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
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

        <h1 className="text-3xl font-bold mt-6 mb-8">
          Compare Schemes
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {[scheme1, scheme2].map((scheme) => (
            <div
              key={scheme._id}
              className="border rounded-2xl shadow p-6"
            >
              <h2 className="text-xl font-bold">
                {scheme.scheme_name}
              </h2>

              <p className="text-gray-500 mb-5">
                {scheme.category}
              </p>

              <h3 className="font-semibold mb-2">
                Benefits
              </h3>

              {renderList(scheme.benefits)}

              <h3 className="font-semibold mt-5 mb-2">
                Required Documents
              </h3>

              {renderList(scheme.required_documents)}

              <h3 className="font-semibold mt-5 mb-2">
                Eligibility
              </h3>

              <ul className="list-disc ml-5">
                {Object.entries(
                  scheme.eligibility_rules || {}
                ).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong>: {String(value)}
                  </li>
                ))}
              </ul>

              <a
                href={scheme.official_link}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="mt-6 w-full">
                  Official Website
                </Button>
              </a>

            </div>
          ))}

        </div>

      </PageContainer>

      <BottomBar />
      <Footer />
    </>
  );
}