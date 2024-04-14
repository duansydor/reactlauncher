import React from "react";
import { Button, Image, Text, View } from "tamagui";
import { Card } from "tamagui";
const AnimeCard = ({navigation,...props}) => {
  return (
    <Card h={"$20"} w={"$16"} mr={"$4"} bg={"$black1"}>
      <Card.Header>
        <Text
          style={[{ borderRadius: 10 }, { opacity: 0.9 }]}
          bg={"whitesmoke"}
          p={"$4"}
        >
          {props.anime.title}
        </Text>
      </Card.Header>
      <Card.Footer alignSelf="center" m={"$4"}>
        <Button 
        theme="green_active"
        onPress={() => {
            navigation.navigate("AnimePage",props.anime);
          }}
        >
          Assistir
        </Button>
      </Card.Footer>
      <Card.Background style={{opacity:.6,borderRadius: 10 }}>

        <Image src={props.anime.image} width="100%" height="100%" />
      </Card.Background>
    </Card>
  );
};

export default AnimeCard;
