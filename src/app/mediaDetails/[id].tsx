import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaDetailedList from '@assets/data/mediaDetailedList.json';
import MediaInfo from "@/components/MediaDetails/MediaInfo";
import { useVideoPlayer,VideoView } from "expo-video";
import MediaHeader from "@/components/MediaDetails/MediaHeader";
import { useRef } from "react";

export default function MediaDetails() {
  const { id } = useLocalSearchParams()
  const videoViewRef = useRef<VideoView | null>(null);

  const mediaItem = mediaDetailedList.find((media) => media.id === id)

  if (!mediaItem) {
    return <Text>Media Not Found!</Text>;
  }

  const {
    type,
    title,
    description,
    releaseYear,
    ageRestriction,
    duration,
    thumbnail,
    trailer,
    videoUrl,
    seasons
  } = mediaItem;

  // Determine the video source based on media type
  const videoSource = type === 'MOVIE' ? videoUrl : seasons?.[0]?.episodes?.[0]?.videoUrl;

  if (!videoSource) {
    return <Text>No playable video found.</Text>;
  }

  const trailerPlayer=useVideoPlayer(trailer,player=>{
    player.currentTime = 10; // start at 10 seconds in a specific trailler intresting part
    player.play(); // auto play
  })
  const mediaPlayer=useVideoPlayer(videoSource,player=>{
    player.showNowPlayingNotification=true; // show in lock screen
  })

  const onPlayMediaPressed=()=>{
    trailerPlayer.pause();
    videoViewRef.current?.enterFullscreen();// works only on real device, full screen
    mediaPlayer.play();
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <MediaHeader
            thumbnail={thumbnail} // could be used for displaying a placeholder or background while video loads
            trailerPlayer={trailerPlayer} // could be used to show a trailer preview
            mediaPlayer={mediaPlayer} // main media player
            videoViewRef={videoViewRef}

        />
      <MediaInfo
        title={title}
        releaseYear={releaseYear}
        ageRestriction={ageRestriction}
        duration={duration}
        description={description}
        type={type}
        nrOfSeasons={seasons?.length}
        onPlayMediaPressed={onPlayMediaPressed}
      />
    </SafeAreaView>
  )
}