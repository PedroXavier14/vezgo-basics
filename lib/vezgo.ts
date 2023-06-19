import Vezgo from "vezgo-sdk-js";

export const vezgo = Vezgo.init({
  clientId: process.env.VEZGO_CLIENT_ID || "",
  secret: process.env.VEZGO_CLIENT_SECRET || "",
});

export const refreshToken = async (username: string) => {
  const user = vezgo.login(username);
  return await user.getToken({ minimumLifetime: Number.MAX_SAFE_INTEGER });
};
