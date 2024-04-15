import { useRoute } from "@react-navigation/native";
import React from "react";
import { Video, ResizeMode } from "expo-av";
import { StyleSheet } from "react-native";

import {
  Button,
  H1,
  H2,
  Image,
  Paragraph,
  Select,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { BASE_ANIME_URL } from "../../Utils/Variables";

const AnimePage = () => {
  const videoRef = React.useRef(null);

  const route = useRoute();
  const anime:any = route.params;
  const [status, setStatus] = React.useState();

  const [jsonData, setJsonData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_ANIME_URL}/info/${anime.id}`);
        const data = await response.json();
        setJsonData(data);
        changeVideoSource(data.episodes[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const changeVideoSource = async (id) => {
    try {
      const response = await fetch(`${BASE_ANIME_URL}/watch/${id}`);
      const link = await response.json();
      console.log(link.sources[1]);
      if (videoRef.current) {
        await videoRef.current.unloadAsync(); // Unload previous video
        await videoRef.current.loadAsync({
          uri: link.sources[1].url,
        });
        await videoRef.current.playAsync();
      }
    } catch (error) {
      console.error("Error changing video source:", error);
    }
  };
  return (
    <YStack ai="center" m={"$2"}>
      {jsonData ? (
        <YStack m={"$4"}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: "",
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status:any) => setStatus(() => status)}
          />

          <H1>{jsonData.title}</H1>
          <H2>Episodes</H2>
          <XStack mt={"$4"} flex={1} w="full" flexWrap="wrap" gap={"$4"}>
            {jsonData.episodes.map((ep) => {
              return (
                <Button
                  theme="blue_active"
                  onPress={() => {
                    changeVideoSource(ep.id);
                  }}
                >
                  <Text>{ep.number}</Text>
                </Button>
              );
            })}
          </XStack>
        </YStack>
      ) : (
        <Text>Loading...</Text>
      )}
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
export default AnimePage;
