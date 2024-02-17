import { useAccount, useConnectKit } from "@particle-network/connect-react-ui";
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

  const timeout = useRef() as React.MutableRefObject<NodeJS.Timeout>;

  const web3 = useWeb3();

  async function verifyAuthentication() {
    const res = await web3.contracts.nest.read.doesSenderHaveAnAccount();
    setAuthenticated(res);
  }

  useEffect(() => {
    if (timeout.current == undefined) {
      timeout.current = setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, []);

  useEffect(() => {
    if (account != undefined) {
      clearInterval(timeout.current);
      verifyAuthentication().finally(() => {
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
        <main className="h-screen flex justify-center items-center">
          <Loader className="w-1/4" />
        </main>
      ) : (
        <>
          {condition ? <Outlet /> : <Navigate to={props.failRedirect || "/"} />}
        </>
      )}
    </>
  );
}
