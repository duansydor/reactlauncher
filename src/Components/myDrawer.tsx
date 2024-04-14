import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Linking } from "react-native";
import { Avatar, AvatarImage, Text, YStack } from "tamagui";

const myDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
        <YStack ai="center" m={"$12"}>
            <Avatar circular scale={"$1.5"}>
                <AvatarImage src="https://avatars.githubusercontent.com/u/42321964?v=4" />
            </Avatar>
        </YStack>
        <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default myDrawer;
