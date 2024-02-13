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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<LandingPage />} />

        <Route
          path="/"
          element={<ProtectedRoute type={ProtectedTypes.PUBLICONLY} />}
        ></Route>

        <Route
          path="/"
          element={<ProtectedRoute type={ProtectedTypes.PRIVATEONLY} />}
        >
          <Route path="communities" element={<CommunitiesPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </>
  )
);

export default router;
