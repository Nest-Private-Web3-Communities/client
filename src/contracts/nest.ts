const address = "0x3CeBd6a3cBa4174c15e041FC7C98728279E040bf" as const;

const abi = [
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
      {
        internalType: "string",
        name: "theme",
        type: "string",
      },
      {
        internalType: "string",
        name: "emotes",
        type: "string",
      },
    ],
    name: "newCommunity",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "communities",
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
        name: "theme",
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
    inputs: [],
    name: "DHprime",
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
        name: "groupUUID",
        type: "string",
      },
    ],
    name: "getCommunityReactionSet",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "icon",
            type: "string",
          },
          {
            internalType: "string",
            name: "color",
            type: "string",
          },
        ],
        internalType: "struct GroupKeyExchange.Reaction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
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
