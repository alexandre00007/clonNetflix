import { useLocalSearchParams } from "expo-router";
import { FlatList, Text,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaDetailedList from '@assets/data/mediaDetailedList.json';
import MediaInfo from "@/components/MediaDetails/MediaInfo";
import { useVideoPlayer,VideoView } from "expo-video";
import MediaHeader from "@/components/MediaDetails/MediaHeader";
import { useRef, useState, useEffect } from "react";
import SeasonSelector from "@/components/MediaDetails/SeasonSelector";
import { Episode } from "@/types/types";
import EpisodeListItem from "@/components/EpisodeListItem";

export default function MediaDetails() {

  const { id } = useLocalSearchParams()
  const [selectedSeason, setSelectedSeason] = useState<string>("Season 1");
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>([]);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const videoViewRef = useRef<VideoView | null>(null);
  const mediaItem = mediaDetailedList.find((media) => media.id === id)


  useEffect(() => {
      if (!mediaItem || mediaItem.type !== "TV_SERIES") return;
      const season = mediaItem.seasons?.find((seasonItem) => seasonItem.seasonName === selectedSeason);
      setSeasonEpisodes(season?.episodes || []);
  }, [selectedSeason])

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
    seasons,
     
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

  const onPlayMediaPressed=async(video?:string)=>{
    trailerPlayer.pause();
    if(video){
     await mediaPlayer.replaceAsync(video);
    }
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
        <FlatList
          data={seasonEpisodes} // Wrapping episodes in an array to use FlatList
          renderItem={({ item }) => <EpisodeListItem episode={item} onPlayMediaPressed={onPlayMediaPressed} />}
          ListHeaderComponent={
            <View style={{ padding: 10, gap: 10 }}>
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
                {type === "TV_SERIES" && seasons && seasons.length > 0 && (
                  <SeasonSelector
                    seasons={seasons}
                    selectedSeason={selectedSeason}
                    setSelectedSeason={setSelectedSeason}
                  />
                )}
            </View>
          }
        />
    </SafeAreaView>
  )
}