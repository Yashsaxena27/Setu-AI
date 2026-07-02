import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Consent from "../pages/Consent";
import Profile from "../pages/Profile";
import Results from "../pages/Results";
import SchemeDetail from "../pages/SchemeDetail";
import ApplicationDraft from "../pages/ApplicationDraft";
import Reminders from "../pages/Reminders";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/results" element={<Results />} />
        <Route path="/scheme/:id" element={<SchemeDetail />} />
        <Route
    path="/draft/:id"
    element={<ApplicationDraft />}
/>
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}