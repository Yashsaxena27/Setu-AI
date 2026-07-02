import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <PageContainer>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Side */}
          <div className="flex-1">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
              🇮🇳 AI Powered Government Scheme Assistant
            </span>

            <h1 className="text-5xl font-bold mt-6 leading-tight">
              Find Government Schemes
              <span className="text-blue-600"> You Actually Qualify For.</span>
            </h1>

            <p className="text-gray-600 mt-6 text-lg max-w-xl">
              Setu AI helps citizens discover welfare schemes based on
              their profile using AI. No more searching hundreds of
              government websites.
            </p>

            <div className="mt-8 flex gap-4">
              
 <Button onClick={() => navigate("/consent")}>
  Check Eligibility
</Button>

  <Button variant="secondary">
    Learn More
  </Button>
</div>

          </div>

          {/* Right Side */}
          <div className="flex-1 flex justify-center">
            <div className="w-96 h-96 bg-linear-to-br from-blue-500 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center">
              <span className="text-8xl">🤖</span>
            </div>
          </div>

        </section>

        <section className="max-w-7xl mx-auto py-20 px-6">
          <h2 className="text-4xl font-bold text-center">
            Why Choose Setu AI?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-2xl shadow p-8">
              <h3 className="text-xl font-bold mb-3">
                🤖 AI Eligibility Check
              </h3>
              <p className="text-gray-600">
                Instantly discover schemes based on your profile.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-8">
              <h3 className="text-xl font-bold mb-3">
                📄 Smart Recommendations
              </h3>
              <p className="text-gray-600">
                Personalized suggestions with complete details.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-8">
              <h3 className="text-xl font-bold mb-3">
                ⚡ Quick Application
              </h3>
              <p className="text-gray-600">
                Apply faster with guided AI assistance.
              </p>
            </div>
          </div>
        </section>

        {/* AI Search Preview */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 text-white">
            <h2 className="text-4xl font-bold">
              Discover Schemes with AI
            </h2>

            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              Simply describe yourself and let Setu AI instantly recommend the
              government schemes you're eligible for.
            </p>

            <div className="mt-8 bg-white rounded-2xl p-3 flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Example: I am a female college student from Uttar Pradesh..."
                className="flex-1 px-4 py-3 rounded-xl outline-none text-black"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                Search
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-center text-4xl font-bold">
            How Setu AI Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl">📝</div>
              <h3 className="font-bold mt-4 text-xl">Enter Your Details</h3>
              <p className="text-gray-600 mt-3">
                Provide basic information like age, gender,
                income and occupation.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl">🤖</div>
              <h3 className="font-bold mt-4 text-xl">AI Analysis</h3>
              <p className="text-gray-600 mt-3">
                Our AI compares your profile against
                government eligibility rules.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl">🎉</div>
              <h3 className="font-bold mt-4 text-xl">Get Recommendations</h3>
              <p className="text-gray-600 mt-3">
                Receive personalized schemes with
                application guidance.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center">
            Trusted by Citizens
          </h2>

          <p className="text-center text-gray-600 mt-4">
            Helping people discover government schemes faster and easier.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow">
              <p className="text-gray-600">
                "I found two scholarship schemes that I didn't even know existed."
              </p>
              <h4 className="font-bold mt-6">— College Student</h4>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <p className="text-gray-600">
                "The eligibility check saved me hours of searching government websites."
              </p>
              <h4 className="font-bold mt-6">— Small Business Owner</h4>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <p className="text-gray-600">
                "Simple, fast and easy to use. Highly recommended."
              </p>
              <h4 className="font-bold mt-6">— Rural Citizen</h4>
            </div>
          </div>
        </section>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}