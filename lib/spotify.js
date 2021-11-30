import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-private",
  "streaming",
  "user-library-read",
  // 'user-library-modify',
  "user-top-read",
  "user-read-recently-played",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-follow-read",
].join(" ");

const params = {
  scope: scopes,
};

// https:accounts.spotify.com/authorize?params=user-read-email ,...

const queryParamStiring = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamStiring.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRECT,
});

export default spotifyApi;
export { LOGIN_URL };
