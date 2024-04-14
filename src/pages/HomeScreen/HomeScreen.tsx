import * as React from "react";
import { Button, H1, ListItem, ScrollView, Text, XStack, YStack } from "tamagui";
import { StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import AnimeCard from "../../Components/AnimeCard";



const HomeScreen = ({ navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState();
  const [jsonData, setJsonData] = React.useState(null);
  React.useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.103:3000/anime/gogoanime/top-airing');
        const data = await response.json();
        setJsonData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  return (
    <YStack m={"$4"}>
      <H1 mb={"$4"}>Top trending</H1>
      
    
      <ScrollView horizontal={true} mb={"$4"}>
        <XStack>
        {jsonData ? (
        <XStack>
          {
            jsonData.map((item)=>{
              return(
                <AnimeCard navigation={navigation} key={item.id} anime={item}/>
              )
            })
          }
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
      <XStack>
        <Button
          bg={"$accentBackground"}
          color={"$accentColor"}
          animation="quick"
          elevation="$0.25"
          hoverStyle={{
            scale: 1.02,
          }}
          pressStyle={{
            scale: 0.9,
          }}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          Ver Perfil
        </Button>
      </XStack>
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
