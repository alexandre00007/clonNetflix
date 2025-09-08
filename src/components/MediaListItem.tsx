import { StyleSheet, Text, View,Image, Pressable} from "react-native";

import { MediaList, MediaListData } from "@/types/types";
import { Link } from "expo-router";


type MediaListItemProps = {
  mediaItem: MediaListData;
};

export default function MediaListItem({ mediaItem }: MediaListItemProps) {
  return (
    <Link href={`/mediaDetails/${mediaItem.id}`} asChild>
      <Pressable>
        <Image
          source={{ uri: mediaItem.image }}
          style={{ width: 110, aspectRatio: 3 / 4, marginHorizontal: 5, borderRadius: 5 }}
        />
      </Pressable>
    </Link>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "goldenrod",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
