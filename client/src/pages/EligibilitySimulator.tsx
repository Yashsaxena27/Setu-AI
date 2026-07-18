import { useEffect, useState } from "react";
import { simulateEligibility } from "../services/simulatorApi";
import { getProfile, type Profile } from "../services/profileApi";

export default function EligibilitySimulator() {
  const [originalProfile, setOriginalProfile] = useState<Profile>({
    name: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    occupation: "",
    income: "",
    education: "",
    disability: "",
    language: "",
    phone: "",
  });

  const [simulatedProfile, setSimulatedProfile] = useState<Profile>({
    name: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    occupation: "",
    income: "",
    education: "",
    disability: "",
    language: "",
    phone: "",
  });

  const [results, setResults] = useState<any>({
    gained: [],
    lost: [],
    unchanged: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();

        setOriginalProfile(data);
        setSimulatedProfile(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, []);

  async function runSimulation() {
    try {
      setLoading(true);

      const data = await simulateEligibility(
        originalProfile,
        simulatedProfile
      );

      setResults(data);
      const count = Number(
localStorage.getItem("simulationCount") ?? "0"
);

localStorage.setItem(
"simulationCount",
String(count + 1)
);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Eligibility Simulator
      </h1>

      <p className="text-gray-600 mb-6">
        Change your profile to instantly see how your government scheme eligibility changes.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <p className="text-gray-700">
          Change your profile and instantly see
          how your government scheme eligibility changes.
        </p>
      </div>

      {/* Income */}

      <label className="font-medium">
        Income
      </label>

      <input
        type="number"
        className="border rounded p-2 w-full mb-4"
        value={simulatedProfile.income}
        onChange={(e) =>
          setSimulatedProfile({
            ...simulatedProfile,
            income: e.target.value,
          })
        }
      />

      {/* Age */}

      <label className="font-medium">
        Age
      </label>

      <input
        type="number"
        className="border rounded p-2 w-full mb-4"
        value={simulatedProfile.age}
        onChange={(e) =>
          setSimulatedProfile({
            ...simulatedProfile,
            age: e.target.value,
          })
        }
      />

      {/* Occupation */}

      <div className="mt-6">
        <label className="font-medium">
          Occupation
        </label>

        <select
          className="border rounded p-2 w-full"
          value={simulatedProfile.occupation}
          onChange={(e) =>
            setSimulatedProfile({
              ...simulatedProfile,
              occupation: e.target.value,
            })
          }
        >
          <option>Student</option>
          <option>Farmer</option>
          <option>Self Employed</option>
          <option>Private Employee</option>
          <option>Government Employee</option>
          <option>Unemployed</option>
        </select>
      </div>

      {/* Life event buttons */}

      <div className="grid grid-cols-2 gap-3 mt-8">
        <button
          className="border rounded-lg p-3"
          onClick={() =>
            setSimulatedProfile({
              ...simulatedProfile,
              occupation: "Private Employee",
            })
          }
        >
          💼 Got Job
        </button>

        <button
          className="border rounded-lg p-3"
          onClick={() =>
            setSimulatedProfile({
              ...simulatedProfile,
              occupation: "Graduate",
            })
          }
        >
          🎓 Graduate
        </button>

        <button
          className="border rounded-lg p-3"
          onClick={() =>
            setSimulatedProfile({
              ...simulatedProfile,
              income: "50000",
            })
          }
        >
          📉 Lower Income
        </button>

        <button
          className="border rounded-lg p-3"
          onClick={() =>
            setSimulatedProfile({
              ...simulatedProfile,
              income: "500000",
            })
          }
        >
          📈 Higher Income
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={runSimulation}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>

        <button
          onClick={() => {
            setSimulatedProfile(originalProfile);
            setResults({
              gained: [],
              lost: [],
              unchanged: [],
            });
          }}
          className="ml-3 border px-5 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="mt-10 space-y-8">

        {/* Newly Eligible */}

        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🟢 Newly Eligible
          </h2>

          {results.gained?.length === 0 ? (
            <p className="text-gray-500">
              No new schemes found.
            </p>
          ) : (
            results.gained.map((scheme: any) => (
              <div
                key={scheme._id}
                className="border rounded-xl p-4 mb-3 bg-green-50"
              >
                <h3 className="font-bold">
                  {scheme.scheme_name}
                </h3>

                <p className="text-gray-600">
                  {scheme.summary_text}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Lost */}

        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            🔴 Lost Eligibility
          </h2>

          {results.lost?.length === 0 ? (
            <p className="text-gray-500">
              None
            </p>
          ) : (
            results.lost.map((scheme: any) => (
              <div
                key={scheme._id}
                className="border rounded-xl p-4 mb-3 bg-red-50"
              >
                <h3 className="font-bold">
                  {scheme.scheme_name}
                </h3>
              </div>
            ))
          )}
        </div>

        {/* Still Eligible */}

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            🔵 Still Eligible
          </h2>

          {results.unchanged?.length === 0 ? (
            <p className="text-gray-500">
              None
            </p>
          ) : (
            results.unchanged.map((scheme: any) => (
              <div
                key={scheme._id}
                className="border rounded-xl p-4 mb-3 bg-blue-50"
              >
                <h3 className="font-bold">
                  {scheme.scheme_name}
                </h3>

                <p>
                  {scheme.summary_text}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}