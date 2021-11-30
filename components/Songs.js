import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="text-white  px-8 flex flex-col space-y-2 pb-28 ">
      {playlist?.tracks?.items?.map((track, index) => (
        <Song key={track.track.id} track={track} order={index} />
      ))}
    </div>
  );
};

export default Songs;
