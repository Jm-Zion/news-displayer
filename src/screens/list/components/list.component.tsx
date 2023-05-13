import React from "react";
import { Box, Stack } from "@mobily/stacks";
import { Button, Divider, Text } from "react-native-paper";
import { Routes } from "../../../router/const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { List } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";

export const TemplateList = (props: any) => {
  const [results, setResults] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    AsyncStorage.getAllKeys((error, results) => {
      if (results) {
        setResults(results as string[]);
      }
    });
  }, []);

  const removeItem = (name: string) => {
    AsyncStorage.removeItem(name, () => {
      AsyncStorage.getAllKeys((error, results) => {
        if (results) {
          setResults(results as string[]);
        }
      });
    });
  };

  return (
    <Box padding={4} alignSelf="center" alignY="center" style={{ flex: 1 }}>
      <Text variant="displayLarge">Newsletter Announcement</Text>
      <Stack space={0} align="center" paddingTop={24} paddingBottom={24}>
        {results.map((key) => (
          <>
            <List.Item
              title={key}
              onPress={() =>
                props.navigation.navigate(Routes.PRESENT, { templateId: key })
              }
              style={{ width: "100%" }}
              right={() => (
                <TouchableOpacity onPress={() => removeItem(key)}>
                  <List.Icon color="red" icon="delete" />
                </TouchableOpacity>
              )}
            />
            <Divider style={{ width: "100%", padding: 0 }} />
          </>
        ))}
      </Stack>
      <Stack space={4} align="center" paddingBottom={24}>
        <Button
          style={{ width: 200 }}
          mode="contained"
          onPress={() => props.navigation.navigate(Routes.PRESENT)}
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
