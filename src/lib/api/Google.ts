import { google } from "googleapis";

const { G_CLIENT_ID, G_CLIENT_SECRET, PUBLIC_URL } = process.env;

console.log({ PUBLIC_URL });

const auth = new google.auth.OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  `${PUBLIC_URL}/login`
);

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: "online",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  }),
  logIn: async (code: string) => {
    const { tokens } = await auth.getToken(code);

    auth.setCredentials(tokens);

    const { data } = await google.people({ version: "v1", auth }).people.get({
      resourceName: "people/me",
      personFields: "emailAdresses,names,photos",
    });

    return { user: data };
  },
};
