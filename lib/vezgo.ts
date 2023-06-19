import Vezgo from "vezgo-sdk-js";

export const vezgo = Vezgo.init({
  clientId: "8feoadnpj6l4lnharb9lndli1",
  secret: "umm7a960kigmt0hgoe43gb5fjcdrkhuu57tt0jbcrktqb4q0rul",
});

export const refreshToken = async (username: string) => {
  const user = vezgo.login(username);
  return await user.getToken({ minimumLifetime: Number.MAX_SAFE_INTEGER });
};
