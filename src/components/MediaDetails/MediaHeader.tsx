import { VideoPlayer, VideoView } from "expo-video";
import { View, Text, ImageBackground,StyleSheet, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from "react";

type MediaHeaderProps = {
  thumbnail: string;
  trailerPlayer: VideoPlayer;
  mediaPlayer: VideoPlayer;
    videoViewRef: React.RefObject<VideoView | null>;
};


export default function MediaHeader(props: MediaHeaderProps) {
    const [isTrailerLoading, setIsTrailerLoading] = useState(true);
    const { 
        thumbnail, 
        trailerPlayer, 
        mediaPlayer,
        videoViewRef
    } = props;
  return (
    <View style={styles.container}>
      <AntDesign
        name="closecircle"
        size={24}
        color="#3b3b3b"
        style={styles.closeIcon}
        onPress={()=> router.back()}
      />
        {isTrailerLoading && (
      <ImageBackground source={{ uri: thumbnail }} style={styles.imageBackground}>
        <ActivityIndicator size="large" color="white" />
      </ImageBackground>
        )}

          <VideoView
                style={StyleSheet.absoluteFill}
                player={trailerPlayer}
                onFirstFrameRender={() => setIsTrailerLoading(false)}
         />
         <VideoView
                    ref={videoViewRef}
                style={StyleSheet.absoluteFill}
                player={mediaPlayer}
           
         />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
     width: '100%'
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6
  },
  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },

});