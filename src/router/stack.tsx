import { createStackNavigator } from "@react-navigation/stack";
import { Appbar } from "react-native-paper";
import { CreateTemplate } from "../screens/create_template";
import { Home } from "../screens/home";
import { TemplateList } from "../screens/list";
import { Present } from "../screens/present";
import { Routes } from "./const";

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, back }) => (
          <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title="My awesome app" />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name={Routes.HOME} component={Home} />
      <Stack.Screen name={Routes.CREATE_TEMPLATE} component={CreateTemplate} />
      <Stack.Screen name={Routes.TEMPLATE_LIST} component={TemplateList} />
      <Stack.Screen name={Routes.PRESENT} component={Present} />
    </Stack.Navigator>
  );
};
