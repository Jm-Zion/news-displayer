import React from "react";
import { Box, Stack } from "@mobily/stacks";
import { Button, Divider, Text } from "react-native-paper";
import { Routes } from "../../../router/const";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../../supabase";
import { toast } from "react-toastify";
import { useArticlesTitle } from "../hooks/use.articles";

export const TemplateList = (props: any) => {

  const { results, loadArticlesTitle } = useArticlesTitle();
  const removeItem = (name: string) => {
    supabase.from("Article").delete().eq("title", name).then(res => {
      if (res.error) {
        toast.error(res.error.message);
      }
      else {
        loadArticlesTitle();
        toast.success("L'article a été supprimé.")
      }
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
