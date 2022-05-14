import { useRef } from "react";
import dynamic from "next/dynamic";

const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});

const VideoBlogPost = ({ document }: any) => {
  const playerRef = useRef<HTMLVideoElement>(null);

  return (
    <ReactHlsPlayer
      playerRef={playerRef}
      // TODO: replace with correct id fetching mechanism
      src={`https://stream.mux.com/${document?.value?.video?.asset?.playbackId}.m3u8`}
      autoPlay={false}
      controls={true}
      width="100%"
      height="auto"
    />
  );
};

export default VideoBlogPost;
