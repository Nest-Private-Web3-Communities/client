import { useAccount, useConnectKit } from "@particle-network/connect-react-ui";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

export enum ProtectedTypes {
  AUTHENTICATEDONLY,
  UNAUTHENTICATEDONLY,
  CONNECTEDONLY,
  PUBLICONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);

  const timeout = useRef() as React.MutableRefObject<NodeJS.Timeout>;

  const account = useAccount();

  const connected = account ? true : false;
  const authenticated = true;

  useEffect(() => {
    if (timeout.current == undefined) {
      timeout.current = setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    if (account != undefined) {
      clearInterval(timeout.current);
      setLoading(false);
    }
  }, [account]);

  let condition = false;
  switch (props.type) {
    case ProtectedTypes.PUBLICONLY:
      condition = true;
    case ProtectedTypes.CONNECTEDONLY:
      condition = connected;
    case ProtectedTypes.UNAUTHENTICATEDONLY:
      condition = connected && !authenticated;
    case ProtectedTypes.AUTHENTICATEDONLY:
      condition = connected && authenticated;
  }

  return (
    <>
      {loading ? (
        <main className="h-screen flex justify-center items-center">
          <Loader className="w-1/2" />
        </main>
      ) : (
        <>{condition ? <Outlet /> : <Navigate to="/" />}</>
      )}
    </>
  );
}
