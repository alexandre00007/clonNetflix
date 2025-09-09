import { StyleSheet,View, Text, FlatList, TouchableOpacity, Pressable } from "react-native";
import { Menu } from "react-native-paper";
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";
import { Season } from "@/types/types";

type SeasonSelectorProps = {

    seasons:Season[];
    selectedSeason:string;
    setSelectedSeason: React.Dispatch<React.SetStateAction<string>>;
}

export default function SeasonSelector(props:SeasonSelectorProps) {
    const {seasons,selectedSeason,setSelectedSeason}=props;
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const onHandleSeasonChange=(newSeason:string)=>{
        setSelectedSeason(newSeason);
        setIsMenuVisible(false);
    }
  
  
    return (
    <Menu
        visible={isMenuVisible}
        onDismiss={() => setIsMenuVisible(false)}
        contentStyle={styles.menuContent}
        anchor={
            <Pressable
            style={styles.anchorContainer}
            onPress={() => setIsMenuVisible(true)}
            >
                <Text style={{ color: 'white' }}>{selectedSeason}</Text>
                <Entypo name="chevron-thin-down" size={15} color="#b7b7b7" />
            </Pressable>
        }
        >
            {seasons.map((season)=>(
                <Menu.Item 
                    key={season.seasonName}
                    titleStyle={styles.menuTitle}
                    title={season.seasonName}
                    onPress={() => onHandleSeasonChange(season.seasonName)}
                />
            ))}
        </Menu>
  );
}

const styles = StyleSheet.create({
    menuContent: {
        backgroundColor:'#282828',
        marginTop:5,
        borderRadius:10
    },
    anchorContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#282828', 
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:3,
        gap:5,
        marginTop:10,
        alignSelf:'flex-start'
    },
    selectedSeasonText:{
        color:'#b7b7b7',
        fontWeight:'500'
    },
    menuTitle:{
        color:'white',
        fontWeight:'500',
        fontSize:14,
        height:30
    }
});