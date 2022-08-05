import React, { useEffect, useRef } from "react";

import videojs from "@mux/videojs-kit/dist/index.vhs.js";
import { client } from "../utils/sanity";
import dynamic from "next/dynamic";

const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});
import MuxPlayer from "@mux/mux-player-react";

interface ShortProps {
  playbackId: string;
  title: string;
  id: string;
  description?: string;
}

const classes = {
  // player: {
  //   height: "100vh",
  // },
};

const Short = ({ playbackId, title, description, id }: ShortProps) => {
  const playerRef = useRef(null);

  return (
    <div style={classes.container} className="snap-start flex sm:h-1/2">
      <div className="sm:w-1/2">
        <MuxPlayer
          className="h-screen sm:h-full w-screen sm:w-full"
          style={{ maxHeight: "100vh" }}
          playbackId={playbackId}
          metadata={{
            video_id: { id },
            video_title: { title },
          }}
          ref={playerRef}
          streamType="on-demand"
          object-fit="cover"
          playsInline
          muted
        />
      </div>
      <div
        className="hidden sm:block sm:w-1/2 mx-auto mr-4 py-4 px-4 sm:w-1/2"
        style={{ flex: 1, maxHeight: "100vh" }}
      >
        <p className="text-xl font-bold">{title}</p>
        {description && <p className="text-xl text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

export default Short;
