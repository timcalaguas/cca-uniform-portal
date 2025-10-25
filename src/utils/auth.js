const TOKEN_KEY = "jwt_token";

/**
 * Persist JWT to localStorage (synchronous). We prefer localStorage for browser apps.
 */
export const setJWT = (token) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getJWT = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const clearJWT = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};
