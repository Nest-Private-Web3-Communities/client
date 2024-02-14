import { useAccount } from "@particle-network/connect-react-ui";
import { Navigate, Outlet } from "react-router-dom";

export enum ProtectedTypes {
  PRIVATEONLY,
  PUBLICONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const account = useAccount();

  const loading = false;
  const authenticated = account ? true : false;

  if (props.type === ProtectedTypes.PRIVATEONLY) {
    return (
      <>{!loading && <>{authenticated ? <Outlet /> : <Navigate to="/" />}</>}</>
    );
  }

  if (props.type === ProtectedTypes.PUBLICONLY) {
    return (
      <>
        {!loading && <>{!authenticated ? <Outlet /> : <Navigate to="/" />}</>}
      </>
    );
  }

  return <Navigate to="/" />;
}
