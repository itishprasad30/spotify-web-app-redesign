import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIDState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

export const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentTrackID, setCurrentTrackID] =
    useRecoilState(currentTrackIDState);
  const [songInfo, setSongInfo] = useState(null);
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackID) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackID}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackID, spotifyApi]);
  return songInfo;
};
