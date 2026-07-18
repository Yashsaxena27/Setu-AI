import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";

import Button from "../components/common/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  const matches = location.state?.matches || [];

  const [selectedSchemes, setSelectedSchemes] = useState<any[]>([]);

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
          {matches.length === 0 && (
  <div className="text-center text-gray-500 py-10">
    No matching schemes found.
  </div>
)}
          {matches.map((scheme: any) => (
            <div
              key={scheme._id}
              className="bg-white rounded-2xl shadow-md p-6 border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    {scheme.scheme_name}
                  </h2>

                  <p className="text-gray-500">
                    {scheme.category}
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-full font-bold ${getColor(
                    scheme.score
                  )}`}
                >
                  {scheme.score}% Match
                </div>
              </div>

              <div className="mt-5 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-1">
                  Why You Match
                </h3>

                <p className="text-gray-700">
                 {scheme.summary}
                </p>
              </div>

              <label className="flex items-center gap-2 mt-5 mb-4">
                <input
                  type="checkbox"
                  checked={selectedSchemes.some(
                    (s) => s._id === scheme._id
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (selectedSchemes.length < 2) {
                        setSelectedSchemes([
                          ...selectedSchemes,
                          scheme,
                        ]);
                      }
                    } else {
                      setSelectedSchemes(
                        selectedSchemes.filter(
                          (s) => s._id !== scheme._id
                        )
                      );
                    }
                  }}
                />

                Compare
              </label>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() =>
                    navigate(`/scheme/${scheme._id}`, {
                      state: scheme,
                    })
                  }
                >
                  View Details
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                   navigate(`/draft/${scheme._id}`, {
  state: scheme,
})
                  }

              
                >
                  Generate Draft
                </Button>
              </div>
            </div>
          ))}
        </div>

        {selectedSchemes.length === 2 && (
          <div className="sticky bottom-5 flex justify-center mt-8">
            <Button
              onClick={() =>
                navigate("/compare", {
                  state: {
                    scheme1: selectedSchemes[0],
                    scheme2: selectedSchemes[1],
                  },
                })
              }
            >
              Compare Selected Schemes
            </Button>
          </div>
        )}
      </PageContainer>

      <BottomBar />
      <Footer />
    </>
  );
}