import { useAccount } from "@particle-network/connect-react-ui";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";
import useWeb3 from "../contexts/web3context";

export enum ProtectedTypes {
  AUTHENTICATEDONLY,
  UNAUTHENTICATEDONLY,
  CONNECTEDONLY,
  PUBLICONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
  failRedirect?: string;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const account = useAccount();
  const connected = account ? true : false;

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const web3 = useWeb3();

  useEffect(() => {
    if (timeout.current == null) {
      timeout.current = setTimeout(() => {
        setLoading(false);
      }, 6000);
    }
  }, []);

  useEffect(() => {
    if (account != undefined && timeout.current) {
      clearTimeout(timeout.current);

      web3.contracts.nest.read
        .doesSenderHaveAnAccount()
        .then((res) => {
          setAuthenticated(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [account]);

  let condition = false;
  switch (props.type) {
    case ProtectedTypes.PUBLICONLY:
      condition = true;
      break;
    case ProtectedTypes.CONNECTEDONLY:
      condition = connected;
      break;
    case ProtectedTypes.UNAUTHENTICATEDONLY:
      condition = connected && !authenticated;
      break;
    case ProtectedTypes.AUTHENTICATEDONLY:
      condition = connected && authenticated;
      break;
  }

  return (
    <>
      {loading ? (
        <main className="h-screen flex justify-center items-center flex-col gap-y-12">
          <Loader className="w-1/4" />
          <p className="text-primary">Loading</p>
        </main>
      ) : (
        <>
          {condition ? (
            <Outlet />
          ) : (
            <>
              {loading ? (
                <p>loading</p>
              ) : (
                <Navigate to={props.failRedirect || "/"} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
