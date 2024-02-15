import React, { useState } from "react";

export default function AdvancedCommunityConfiguration() {
  const [config, setConfig] = useState({});
  const state = {};

  return (
    <div className="mt-4">
      <ConfigCheckbox />
      <ConfigCheckbox />
      <ConfigCheckbox />
    </div>
  );
}

interface Config {
  allowMessaging: boolean;
  allowNetworks: boolean;
}

function ConfigCheckbox() {
  return <div></div>;
}
