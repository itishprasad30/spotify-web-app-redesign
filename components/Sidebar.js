import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIDState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistID, SetPlaylistID] = useRecoilState(playlistIDState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  // console.log(playlists);
  // console.log(session);
  // console.log("You have picked >>>> ", playlistID);
  return (
    <div className="text-gray-500 h-screen overflow-y-scroll scrollbar-hide  p-5  border-r border-gray-900 text-xs sm:text-sm md:text-base lg:text-lg sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex  ">
      <div className="space-y-4   ">
        <button className="flex items-center space-x-2 hover:text-white hover:bg-gray-800 rounded-sm ">
          <HomeIcon className="h-5 w-5" />
          <p>Home </p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white hover:bg-gray-800 rounded-sm ">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white hover:bg-gray-800 rounded-sm ">
          <LibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900 " />

        <button className="flex items-center space-x-2 hover:text-white ">
          <HeartIcon className="h-5 w-5 text-blue-600" />
          <p>Likes </p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <PlusCircleIcon className="h-5 w-5 text-red-500" />
          <p>Create a playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <RssIcon className="h-5 w-5 text-green-600" />
          <p>Podcast</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists redering in Sidebar */}
        {playlists.map((playlist, index) => (
          <p
            key={playlist.id}
            onClick={() => SetPlaylistID(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
