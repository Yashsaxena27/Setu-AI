import { BrowserRouter, Routes, Route } from "react-router-dom";
import EligibilitySimulator from "../pages/EligibilitySimulator";
import Landing from "../pages/Landing";
import Consent from "../pages/Consent";
import Profile from "../pages/Profile";
import Results from "../pages/Results";
import SchemeDetail from "../pages/SchemeDetail";
import ApplicationDraft from "../pages/ApplicationDraft";
import Reminders from "../pages/Reminders";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import CompareSchemes from "../pages/CompareSchemes";
import Dashboard from "../pages/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
<Route
    path="/simulator"
    element={<EligibilitySimulator />}
/>
        <Route element={<ProtectedRoute />}>
          <Route path="/consent" element={<Consent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/results" element={<Results />} />
          <Route path="/scheme/:id" element={<SchemeDetail />} />
          <Route path="/draft/:id" element={<ApplicationDraft />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compare" element={<CompareSchemes />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}