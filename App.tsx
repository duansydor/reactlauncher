import "@tamagui/core/reset.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { TamaguiProvider } from "@tamagui/core";
import tamaguiConfig from "./tamagui.config";
import HomeScreen from "./src/pages/HomeScreen/HomeScreen";
import ProfileScreen from "./src/pages/ProfileScreen/ProfileScreen";
import myDrawer from "./src/Components/myDrawer";
import AnimePage from "./src/pages/AnimePage/AnimePage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <TamaguiProvider config={tamaguiConfig}>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AnimePage" component={AnimePage} />

        </Stack.Navigator>
      </TamaguiProvider>
    </NavigationContainer>
  );
}
