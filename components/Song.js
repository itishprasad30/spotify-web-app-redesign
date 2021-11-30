import { useRecoilState } from "recoil";
import { currentTrackIDState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/Time";

const Song = ({ track, order }) => {
  const spotifyApi = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackID, setCurrentTrackID] =
    useRecoilState(currentTrackIDState);

  const playSong = () => {
    setIsPlaying(true);
    setCurrentTrackID(track.track.id);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      className="grid grid-cols-2 py-4 px-5 hover:bg-gray-800 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-3">
        <p>{order + 1}</p>
        <img
          src={track.track.album.images[0].url}
          alt=""
          className="h-10 w-10"
        />
        <div>
          <p className="w-36 lg:w-64 truncate">{track.track.name}</p>
          <p className="text-gray-300">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline-flex w-40">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
