export const serverUrl =
  import.meta.env.MODE === "development" || !import.meta.env.VITE_BACKEND_URL
    ? "https://127.0.0.1:9000"
    : import.meta.env.VITE_BACKEND_URL;

export const keyBase = 32 as const;

export const networkImagePlaceholder =
  "https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/hashtag-sign-round-icon.png";
