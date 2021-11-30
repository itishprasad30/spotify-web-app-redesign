import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyAPi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyAPi.setAccessToken(token.accessToken);
    spotifyAPi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyAPi.refreshAccessToken();
    console.log("Refreshed Token", refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hr as 3600 retrun from spotify api
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRECT,
      authorization: LOGIN_URL,
    }),

    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // inital signin
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.access_token_expires_at * 1000, // we handle expire time in milisecond
        };
      }

      // retrun previous token if it is still valid
      if (Date.now() < token.accessTokenExpires) {
        console.log("Existing Access TOken IS Valid");
        return token;
      }

      // Access toke has expired , so we need to refresh
      console.log("Existing Access TOken IS Expired");
      return await refreshAccessToken(token);
    },

    async session({ token, session }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
