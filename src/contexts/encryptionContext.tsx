import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useWeb3, { AbiReadResponseType, ContractType } from "./web3context";
import { Address, Chain, Client, CustomTransport, getContract } from "viem";
import { useAccount } from "@particle-network/connect-react-ui";
import contractDefinitions from "../contracts";
import { modularExponentiation, rangeArray } from "../utils";
import CryptoJS from "crypto-js";

interface EncryptionContextType {
  dhParameters: {
    prime: number;
    primitive: number;
  };
  keyPvt: number;
  keyPub: number;
  keyMaster: string;

  setCommunityContract: React.Dispatch<
    React.SetStateAction<
      ContractType<typeof contractDefinitions.community.abi> | undefined
    >
  >;

  decrypt: (e: string, t: number) => string;
  encrypt: (c: string) => string | undefined;
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
  const [keyMaster, setKeyMaster] = useState("");
  const [agreement, setAgreement] = useState<
    Array<{ createdAt: number; key: string }>
  >([]);
  const [communityContract, setCommunityContract] =
    useState<ContractType<typeof contractDefinitions.community.abi>>();

  const [loading, setLoading] = useState(false);
  const flag = useRef(false);

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
      const pvt = Math.floor(
        primitive + Math.random() * (prime - primitive - 2)
      );
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
    if (account && web3.contracts.nest) {
      setLoading(true);
      loadData().finally(() => setLoading(false));
    }
  }, [account, web3.contracts]);

  useEffect(() => {
    if (keyPvt > 0 && dhParameters.prime > 0 && dhParameters.primitive > 0)
      setKeyPub(
        modularExponentiation(
          dhParameters.primitive,
          keyPvt,
          dhParameters.prime
        )
      );
  }, [keyPvt, dhParameters]);

  useEffect(() => {
    async function loadKeys() {
      if (!communityContract || !account) {
        return;
      }

      setAgreement([]);
      const keyCount = await communityContract.read.getKeyCount();
      for await (let i of rangeArray(Number(keyCount))) {
        const _key = await communityContract.read.keys([BigInt(i)]);
        const publisherAddress = _key[1];

        let key = { createdAt: Number(_key[0]), key: "" };
        const fellow = await web3.contracts.nest.read.users([publisherAddress]);

        const publicKey = fellow[0];

        const sharedKey = modularExponentiation(
          publicKey,
          keyPvt,
          dhParameters.prime
        );

        const e_key = await communityContract.read.getKeyFromAgreement([
          BigInt(i),
        ]);

        key.key = CryptoJS.AES.decrypt(e_key, sharedKey.toString()).toString(
          CryptoJS.enc.Utf8
        );

        if (publisherAddress.toUpperCase() == account.toUpperCase()) {
          key.key = CryptoJS.AES.decrypt(e_key, keyPvt.toString()).toString(
            CryptoJS.enc.Utf8
          );
        }

        if ((key.key = "")) "";

        setAgreement((p) => [...p, key]);
      }
    }

    if (!flag.current && communityContract && account) {
      flag.current = true;
      loadKeys();
    }
  }, [communityContract, account, flag]);

  function encrypt(c: string) {
    if (keyMaster == "") return;
    return CryptoJS.AES.encrypt(c, keyMaster).toString();
  }

  function decrypt(e: string, t: number) {
    let key = keyMaster;

    if (agreement.length == 1)
      return CryptoJS.AES.decrypt(e, keyMaster).toString(CryptoJS.enc.Utf8);

    for (let i = 1; i < agreement.length; i++) {
      if (agreement[i - 1].createdAt < t && t < agreement[i].createdAt)
        key = agreement[i - 1].key;
    }

    return CryptoJS.AES.decrypt(e, key).toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    setKeyMaster(agreement[agreement?.length - 1]?.key || "null");
  }, [agreement]);

  const value: EncryptionContextType = {
    dhParameters,
    keyPvt,
    keyPub,
    keyMaster,
    setCommunityContract,
    encrypt,
    decrypt,
  };

  console.log(agreement);

  return (
    <EncryptionContext.Provider value={value}>
      {loading ? "Loading" : children}
    </EncryptionContext.Provider>
  );
}

export default function useEncryptionContext() {
  return useContext(EncryptionContext);
}

export type StoredKeys = Record<Address | string, number>;
