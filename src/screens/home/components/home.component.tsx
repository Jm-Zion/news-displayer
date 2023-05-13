import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./home.css";
import { Button, Text } from "react-native-paper";
import { Routes } from "../../../router/const";
import { Stack, Box, Columns, Column, Tiles } from "@mobily/stacks";

export const Home = (props: any) => {
  console.log(props);
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  return (
    <Box padding={4} alignSelf="center" alignY="center" style={{ flex: 1 }}>
      <Text variant="displayLarge">Newsletter Announcement</Text>
      <Stack space={4} align="center" paddingTop={24} paddingBottom={24}>
        <Button
          style={{ width: 200 }}
          mode="contained"
          onPress={() => props.navigation.navigate(Routes.TEMPLATE_LIST)}
        >
          Present
        </Button>
        <Button
          mode="contained"
          style={{ width: 200 }}
          onPress={() => props.navigation.navigate(Routes.CREATE_TEMPLATE)}
        >
          Create template
        </Button>
      </Stack>
    </Box>
  );
};
