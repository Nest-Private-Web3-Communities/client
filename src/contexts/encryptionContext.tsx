import {
  ContextType,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useWeb3, { AbiReadResponseType } from "./web3context";
import {
  AddEthereumChainParameter,
  Address,
  Chain,
  Client,
  CustomTransport,
  getContract,
} from "viem";
import { useAccount } from "@particle-network/connect-react-ui";
import contractDefinitions from "../contracts";
import { rangeArray } from "../utils";
import CryptoJS from "crypto-js";

interface EncryptionContextType {
  dhParameters: {
    prime: number;
    primitive: number;
  };
  keyPvt: number;
  keyPub: number;
  keyMaster: number;

  setCommunityContract: React.Dispatch<
    React.SetStateAction<
      | ReturnType<
          typeof getContract<
            CustomTransport,
            Address,
            typeof contractDefinitions.community.abi,
            Client<CustomTransport, Chain, any>
          >
        >
      | undefined
    >
  >;
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

  const [prime, setPrime] =
    useState<AbiReadResponseType<"nest", "DHprime">>(-1);
  const [primitive, setPrimitive] =
    useState<AbiReadResponseType<"nest", "DHprime">>(-1);
  const [keyPvt, setKeyPvt] = useState(-1);
  const [keyPub, setKeyPub] = useState(-1);
  const [keyMaster, setKeyMaster] = useState(-1);
  const [agreement, setAgreement] = useState<
    Array<{ createdAt: number; key: number }>
  >([]);
  const [communityContract, setCommunityContract] =
    useState<
      ReturnType<
        typeof getContract<
          CustomTransport,
          Address,
          typeof contractDefinitions.community.abi,
          Client<CustomTransport, Chain, any>
        >
      >
    >();

  const [loading, setLoading] = useState(true);

  const dhParameters = { prime, primitive };

  async function loadData() {
    let primitive = -1,
      prime = -1,
      gotLocalKey = false;

    await web3.contracts.nest.read.DHprime().then((res) => {
      prime = res;
      setPrime(res);
    });

    await web3.contracts.nest.read.DHprimitive().then((res) => {
      primitive = res;
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

  useEffect(() => {
    if (keyPvt > 0 && dhParameters.prime > 0 && dhParameters.primitive > 0)
      console.log(dhParameters.primitive, keyPvt);
    // setKeyPub(dhParameters.primitive ** keyPvt % dhParameters.prime);
  }, [keyPvt, dhParameters]);

  useEffect(() => {
    async function loadKeys() {
      if (!communityContract) {
        return;
      }

      const keyCount = await communityContract.read.getKeyCount();
      for await (let i of rangeArray(Number(keyCount))) {
        const _key = await communityContract.read.keys([BigInt(i)]);
        const publisherAddress = _key[1];

        let key = { createdAt: Number(_key[0]), key: 0 };

        const publicKey = await communityContract.read.getSharedKeyWithUser([
          publisherAddress,
        ]);

        const sharedKey =
          parseInt(publicKey, 16) ** keyPvt % dhParameters.prime;

        const e_key = await communityContract.read.getKeyFromAgreement([
          BigInt(i),
        ]);

        key.key = Number(
          CryptoJS.AES.decrypt(e_key, sharedKey.toString()).toString()
        );

        setAgreement((p) => [...p, key]);
      }
    }

    loadKeys();
  }, [communityContract]);

  const value: EncryptionContextType = {
    dhParameters,
    keyPvt,
    keyPub,
    keyMaster,
    setCommunityContract,
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
