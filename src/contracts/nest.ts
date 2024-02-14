const address = "0xfa9CA2f6FEE0287c91b89A78df98Be60583949eE" as const;

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
    name: "DHprimitive",
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
        internalType: "string",
        name: "imageUrl",
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
        internalType: "string",
        name: "imageUrl",
        type: "string",
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
