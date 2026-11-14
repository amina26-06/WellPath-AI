import { createBrowserRouter } from "react-router";
import {
  AssessmentPage,
  AuthPage,
  DashboardPage,
  FollowUpPage,
  HomePage,
  InsightsPage,
  JournalPage,
  NotFoundPage,
  PrivacyPage,
  RootLayout,
  SafetyPage,
  SupportPage,
} from "./screens";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", element: <AuthPage mode="login" /> },
      { path: "signup", element: <AuthPage mode="signup" /> },
      { path: "recover", element: <AuthPage mode="recover" /> },
      { path: "dashboard", Component: DashboardPage },
      { path: "assessment", Component: AssessmentPage },
      { path: "insights", Component: InsightsPage },
      { path: "support", Component: SupportPage },
      { path: "safety", Component: SafetyPage },
      { path: "journal", Component: JournalPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "follow-up", Component: FollowUpPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
