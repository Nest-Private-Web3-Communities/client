import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../layout";

import ErrorPage from "./ErrorPage/ErrorPage";
import ProtectedRoute, { ProtectedTypes } from "../common/ProtectedRoute";
import CommunitiesPage from "./CommunitiesPage/CommunitiesPage";
import LandingPage from "./LandingPage/LandingPage";
import CommunityPage from "./CommunityPage/CommunityPage";
import NewCommunityPage from "./NewCommunityPage/NewCommunityPage";
import FAQsPage from "./FAQsPage/FAQsPage";
import TestingPage from "./TestingPage/TestingPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<LandingPage />} />
        <Route path="/faq" element={<FAQsPage />} />
        <Route path="/testing" element={<TestingPage />} />

        <Route
          path="/"
          element={<ProtectedRoute type={ProtectedTypes.UNAUTHENTICATEDONLY} />}
        ></Route>

        <Route
          path="/"
          element={<ProtectedRoute type={ProtectedTypes.AUTHENTICATEDONLY} />}
        >
          <Route path="communities/new" element={<NewCommunityPage />} />
          <Route path="communities" element={<CommunitiesPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route
        path="/"
        element={<ProtectedRoute type={ProtectedTypes.AUTHENTICATEDONLY} />}
      >
        <Route path="community" element={<CommunityPage />} />
        <Route path="community/:uuid" element={<CommunityPage />} />
      </Route>
    </>
  )
);

export default router;
