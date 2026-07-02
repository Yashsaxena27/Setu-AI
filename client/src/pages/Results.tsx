import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";

import Button from "../components/common/Button";

import { mockSchemes } from "../Data/mockSchemes";

export default function Results() {
  const navigate = useNavigate();

  const getColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-700";
    if (score >= 75) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <>
      <Header />

      <PageContainer>
        <h1 className="text-3xl font-bold mb-2">
          Your Matched Schemes
        </h1>

        <p className="text-gray-600 mb-8">
          Based on your profile, these are the best matches.
        </p>

        <div className="space-y-6">
          {mockSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl shadow-md p-6 border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    {scheme.name}
                  </h2>

                  <p className="text-gray-500">
                    {scheme.category}
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-full font-bold ${getColor(
                    scheme.match
                  )}`}
                >
                  {scheme.match}% Match
                </div>
              </div>

              <div className="mt-5 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-1">
                  Why You Match
                </h3>

                <p className="text-gray-700">
                  {scheme.why}
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() =>
                    navigate(`/scheme/${scheme.id}`)
                  }
                >
                  View Details
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                    navigate(`/draft/${scheme.id}`)
                  }
                >
                  Generate Draft
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>

      <BottomBar />
      <Footer />
    </>
  );
}