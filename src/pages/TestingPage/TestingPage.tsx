type ContentTimestamp = {
  timestamp: number;
  [key: string]: string | number;
};

export default function TestingPage(): JSX.Element {
  const agreement: Array<KeyAgreement> = [
    {
      createdAt: 1632816000, // Dummy timestamp, replace with actual value
      publisher: "0x123456789abcdef", // Dummy address, replace with actual value
      E_Keys: {
        "0x987654321fedcba": "dummyKey1", // Dummy address and key, replace with actual values
        "0xfedcba987654321": "dummyKey2", // Dummy address and key, replace with actual values
      },
    },
    {
      createdAt: 1632902400, // Another dummy timestamp
      publisher: "0xabcdef123456789", // Another dummy address
      E_Keys: {
        "0x13579ace2468bdf": "dummyKey3", // Another dummy address and key
        "0x2468ace13579bdf": "dummyKey4",
        "0xfedcba987654321": "dummyKey5", // Another dummy address and key
      },
    },
  ];

  const address = "0xfedcba987654321";
  const keysForAddress = agreement
    .filter((item) => Object.keys(item.E_Keys).includes(address))
    .map((item) => ({
      timestamp: item.createdAt,
      key: item.E_Keys[address],
    }));

  const contentTimestamp: ContentTimestamp = {
    timestamp: 1632816000,
    content1: "jhafasjfafbafj",
    content2: "ijfboandkdna",
    content3: "nkdjhfsdjbsdmc",
  };

  const decryptedContentTimestamp: any = {
    timestamp: contentTimestamp.timestamp,
  };

  function decryptContent(content: string, key: string): string {
    return content + key;
  }

  const correspondingKey =
    keysForAddress.find((item) => item.timestamp === contentTimestamp.timestamp)
      ?.key ?? "";

  Object.keys(contentTimestamp).forEach((key: string, index: number) => {
    if (key !== "timestamp") {
      decryptedContentTimestamp[key] = decryptContent(
        contentTimestamp[key] as string,
        correspondingKey
      );
    }
  });

  console.log(decryptedContentTimestamp);
  return (
    <section className="py-24 p-page flex flex-col gap-y-4">
      <div>My Address: {address}</div>
      {keysForAddress.map((item, i) => (
        <div key={i}>
          {item.timestamp} : {item.key}
        </div>
      ))}
      <div>
        {Object.keys(decryptedContentTimestamp).map((key) => (
          <div key={key}>
            {key}: {decryptedContentTimestamp[key]}
          </div>
        ))}
      </div>
      <div>
        {Object.keys(contentTimestamp).map((key) => (
          <div key={key}>
            {key}: {contentTimestamp[key]}
          </div>
        ))}
      </div>
    </section>
  );
}

type KeyAgreement = {
  createdAt: number;
  publisher: Address;
  E_Keys: Record<Address, string>;
};

type Address = `0x${string}`;
