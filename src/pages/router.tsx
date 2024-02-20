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
import NewAccountPage from "./NewAccountPage/NewAccountPage";
import { CommunityContextProvider } from "./CommunityPage/CommunityContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<LandingPage />} />
        <Route path="/faq" element={<FAQsPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute
              failRedirect="/communities"
              type={ProtectedTypes.UNAUTHENTICATEDONLY}
            />
          }
        >
          <Route path="auth/new" element={<NewAccountPage />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute
              type={ProtectedTypes.AUTHENTICATEDONLY}
              failRedirect="/auth/new"
            />
          }
        >
          <Route path="communities/new" element={<NewCommunityPage />} />
          <Route path="communities" element={<CommunitiesPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route element={<Layout.Community />}>
        <Route
          path="/"
          element={<ProtectedRoute type={ProtectedTypes.AUTHENTICATEDONLY} />}
        >
          <Route
            path="community/:cid"
            element={
              <CommunityContextProvider>
                <CommunityPage />
              </CommunityContextProvider>
            }
          />
        </Route>
      </Route>
    </>
  )
);

export default router;
