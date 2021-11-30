import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "../lib/spotify";

const useSpotify = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);
  return spotifyApi;
};

export default useSpotify;
