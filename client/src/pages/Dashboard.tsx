import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    matched: 0,
    simulations: 0,
    drafts: 0,
    profileUpdated: "Today",
  });

  useEffect(() => {
    const matches =
      JSON.parse(localStorage.getItem("latestMatches") || "[]");

    const simulations = Number(
      localStorage.getItem("simulationCount") ?? "0"
    );

    const drafts = JSON.parse(
      localStorage.getItem("generatedDrafts") || "[]"
    ).length;

    setStats({
      matched: matches.length,
      simulations,
      drafts,
      profileUpdated: new Date().toLocaleDateString(),
    });
  }, []);

  return (
    <>
      <Header />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              Matched Schemes
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.matched}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              Simulations
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.simulations}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              Drafts
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.drafts}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              Last Updated
            </p>

            <h2 className="text-xl font-bold mt-2">
              {stats.profileUpdated}
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>✅ Profile Updated</span>

              <span className="text-gray-400">
                Today
              </span>
            </div>

            <div className="flex justify-between">
              <span>🤖 AI Matching Completed</span>

              <span className="text-gray-400">
                Latest
              </span>
            </div>

            <div className="flex justify-between">
              <span>📝 Draft Generator Ready</span>

              <span className="text-gray-400">
                Available
              </span>
            </div>

            <div className="flex justify-between">
              <span>🧠 Eligibility Simulator Used</span>

              <span className="text-gray-400">
                Live
              </span>
            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">

          <Button
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/results")}
          >
            View Matches
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/simulator")}
          >
            Eligibility Simulator
          </Button>

        </div>

      </PageContainer>

      <BottomBar />
      <Footer />
    </>
  );
}