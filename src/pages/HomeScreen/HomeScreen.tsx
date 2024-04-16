import * as React from "react";
import {
  Button,
  H1,
  Input,
  ListItem,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import AnimeCard from "../../Components/AnimeCard";
import { BASE_ANIME_URL } from "../../Utils/Variables";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const video = React.useRef(null);
  const [status, setStatus] = React.useState();
  const [search, setSearch] = React.useState("");
  const [jsonData, setJsonData] = React.useState(null);
  const [genreList, setGenreList] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_ANIME_URL}/top-airing`);
        const genresResponse = await fetch(`${BASE_ANIME_URL}/genre/list`);
        const genresList = await genresResponse.json();
        const data = await response.json();
        setJsonData(data.results);
        setGenreList(genresList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <YStack m={"$4"}>
      <XStack alignItems="center" space="$2"theme="blue_active" >
      <Input theme="blue" flex={1} size={"$4"} placeholder={`Search`} onChangeText={newSearch =>{setSearch(newSearch)}}/>
      <Button size={"$4"} onPress={()=>{navigation.navigate("SearchPage",search)}}>Go</Button>
    </XStack>
      <ScrollView>
      <H1 mb={"$4"}>Top trending</H1>

      <ScrollView horizontal={true} mb={"$4"}>
        <XStack>
          {jsonData ? (
            <XStack>
              {jsonData.map((item) => {
                return (
                  <AnimeCard
                    navigation={navigation}
                    key={item.id}
                    anime={item}
                  />
                );
              })}
            </XStack>
          ) : (
            <Text>Loading...</Text>
          )}
        </XStack>
      </ScrollView>
      {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      /> */}
      
        <XStack >
          {genreList ? (
          <XStack justifyContent="center" flex={1} flexWrap="wrap" gap={"$4"}>
              {genreList.map((item) => {
                return (
                <Button 
                key={item.id} 
                theme="blue_active"
                onPress={():any=>{
                  navigation.navigate("CategoryPage", item.id)
                }}>

                  {item.title}
                  </Button>);
              })}
            </XStack>
          ) : console.log("carregando")}
        </XStack>
      </ScrollView>
    </YStack>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 450,
    height: 300,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
