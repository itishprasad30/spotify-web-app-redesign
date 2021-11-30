import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIDState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-red-500",
  "from-indigo-500",
  "from-blue-500",
  "from-yellow-500",
  "from-green-500",
  "from-purple-500",
];

const Center = () => {
  const [color, setColor] = useState(null);
  const playlistID = useRecoilValue(playlistIDState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistID]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistID)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {
        console.log("Something Got wrong !!!", err);
      });
  }, [spotifyApi, playlistID]);

  // console.log(playlist);
  return (
    <div className=" flex-grow  overflow-y-scroll h-screen scrollbar-hide">
      <header className="absolute  top-5 right-8">
        <div
          className="flex items-center bg-pink-300  space-x-3 opacity-90 hover:opacity-80  rounded-full p-1 pr-2"
          onClick={() => signOut()}
        >
          <img
            src={session?.user?.image}
            alt="profile pic"
            className="h-10 w-10 rounded-full"
          />
          <h2 className=" text-black text-lg">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end bg-gradient-to-b to-black ${color}  text-white h-80 p-8 w-full `}
      >
        <img
          className="h-44 w-44 rounded-lg"
          alt=""
          src={playlist?.images?.[0]?.url}
        />
        <div className="ml-5">
          <p>PLAYLIST </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            {playlist?.name}
          </h2>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
