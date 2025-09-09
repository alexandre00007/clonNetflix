import { View, Text, ImageBackground,StyleSheet, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Episode } from "@/types/types";

type EpisodeListItemProps = {
    episode:Episode;
    onPlayMediaPressed: (video?:string) => Promise<void>;
}


export default function EpisodeListItem({ episode, onPlayMediaPressed }: EpisodeListItemProps) {
  const {episodeThumbnail,episodeTitle,episodeNumber,episodeDescription,duration,videoUrl} = episode;
    return (
        <Pressable style={styles.container} onPress={()=>onPlayMediaPressed(videoUrl)}>
        <View style={styles.episodeContentainer}>
            <ImageBackground source={{uri:episodeThumbnail}} style={styles.imageBackground}>
                <FontAwesome name="play" size={12} color="white" style={{marginLeft:2}} />
            </ImageBackground>
            <View style={{gap:5}}>
                <View style={{flexDirection:'row'}}>
                        <Text style={{color: 'white'}}>{episodeNumber}</Text>
                        <Text style={styles.episodeText}>{episodeTitle}</Text>
                </View>
            <Text style={styles.duration}>{duration} m</Text>
            </View>
        </View>
        <Text style={styles.description} numberOfLines={3}>{episodeDescription}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:15,
        marginBottom:15,
        gap:5,
    },
  imageBackground: {
    width: 100,
    aspectRatio: 3 / 2,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center',
    
  },
  episodeContentainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
     
  },
  episodeText:{
    color:'#ADADAD',
    fontWeight:'500'
  },
  duration:{
    color:'#999999',
    fontSize:12,
    fontWeight:'500'
  },
    description:{
        color:'#ADADAD',
        fontWeight:'500'
    }
});
