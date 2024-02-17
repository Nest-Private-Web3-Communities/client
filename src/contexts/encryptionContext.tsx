import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useWeb3, { AbiReadResponseType } from "./web3context";
import { Address } from "viem";
import { useAccount } from "@particle-network/connect-react-ui";

interface EncryptionContextType {
  dhParameters: {
    prime: bigint;
    primitive: bigint;
  };
  keyPvt: number;
}

const EncryptionContext = createContext<EncryptionContextType>(
  {} as EncryptionContextType
);

export function EncryptionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const web3 = useWeb3();
  const account = useAccount();

  const [prime, setPrime] = useState<AbiReadResponseType<"nest", "DHprime">>(
    BigInt(-1)
  );
  const [primitive, setPrimitive] = useState<
    AbiReadResponseType<"nest", "DHprime">
  >(BigInt(-1));
  const [keyPvt, setKeyPvt] = useState<number>(-1);

  const [loading, setLoading] = useState(true);

  const dhParameters = { prime, primitive };

  async function loadData() {
    let primitive = -1,
      prime = -1,
      gotLocalKey = false;

    await web3.contracts.nest.read.DHprime().then((res) => {
      prime = Number(res);
      setPrime(res);
    });

    await web3.contracts.nest.read.DHprimitive().then((res) => {
      primitive = Number(res);
      setPrimitive(res);
    });

    const localKeysString = localStorage.getItem("nest-keys");

    if (localKeysString && account) {
      const localKeys = JSON.parse(localKeysString) as StoredKeys;
      const existentKey = localKeys[account];

      if (existentKey) {
        setKeyPvt(existentKey);
        gotLocalKey = true;
      }
    }

    if (account && !gotLocalKey) {
      const pvt = primitive + Math.random() * (prime - primitive - 2);
      setKeyPvt(pvt);

      let newKeys = {};

      if (localKeysString) newKeys = JSON.parse(localKeysString) as StoredKeys;

      localStorage.setItem(
        "nest-keys",
        JSON.stringify({ ...newKeys, [account]: pvt })
      );
    }
  }

  useEffect(() => {
    setLoading(true);
    loadData().finally(() => setLoading(false));
  }, [account, web3.contracts]);

  const value: EncryptionContextType = {
    dhParameters,
    keyPvt,
  };

  return (
    <EncryptionContext.Provider value={value}>
      {!loading && children}
    </EncryptionContext.Provider>
  );
}

export default function useEncryptionContext() {
  return useContext(EncryptionContext);
}

export type StoredKeys = Record<Address | string, number>;
