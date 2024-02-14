const address = "0xc3134b25fFac3165481Da9baE4fF293df4e82e43" as const;

const abi = [
  {
    inputs: [],
    name: "DHparam",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCommunitiesOfSender",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "groups",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "primary",
            type: "string",
          },
          {
            internalType: "string",
            name: "secondary",
            type: "string",
          },
          {
            internalType: "string",
            name: "background",
            type: "string",
          },
          {
            internalType: "string",
            name: "foreground",
            type: "string",
          },
          {
            internalType: "string",
            name: "front",
            type: "string",
          },
          {
            internalType: "string",
            name: "back",
            type: "string",
          },
        ],
        internalType: "struct GroupKeyExchange.ColorTheme",
        name: "themeLight",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "primary",
            type: "string",
          },
          {
            internalType: "string",
            name: "secondary",
            type: "string",
          },
          {
            internalType: "string",
            name: "background",
            type: "string",
          },
          {
            internalType: "string",
            name: "foreground",
            type: "string",
          },
          {
            internalType: "string",
            name: "front",
            type: "string",
          },
          {
            internalType: "string",
            name: "back",
            type: "string",
          },
        ],
        internalType: "struct GroupKeyExchange.ColorTheme",
        name: "themeDark",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "keyExpiryEpoch",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_number",
        type: "uint256",
      },
    ],
    name: "hashNumber",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "groupUUID",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "keys",
        type: "string[]",
      },
      {
        internalType: "address[]",
        name: "correspondingUsers",
        type: "address[]",
      },
    ],
    name: "join",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "Kpub",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "makeAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "keyExpiryEpoch",
        type: "uint256",
      },
    ],
    name: "newGroup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "string",
        name: "Kpub",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export default { address, abi };
