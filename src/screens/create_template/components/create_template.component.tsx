import { Box, Stack } from "@mobily/stacks";
import { useRef, useState } from "react";
import {
  Button,
  Text,
  Title,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Routes } from "../../../router/const";
import { Alert, ScrollView, View, Switch } from "react-native";
import { toast } from "react-toastify";
import { Template } from "../../../types/template";
import { supabase } from "../../../supabase";

export const CreateTemplate = (props: any) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Template>({
    sections: [{ title: "Vie de l'Eglise", content: "Contenu..." }],
    name: "",
    showTimer: false,
  });

  const storeData = async (name: string, value: Template) => {
    try {
      setLoading(true);
      debugger;
      supabase.from('Article').insert({
        title: name,
        show_timer: form.showTimer,
        content: JSON.stringify(value)
      }).single().then((res) => { console.log(res); debugger; if (res.error) { toast.error("Error Occured: " + JSON.stringify(res.error.message)); } });
      setLoading(false);
      toast.success("Template has been created", {
        autoClose: 2000,
      });
      props.navigation.navigate(Routes.TEMPLATE_LIST);
    } catch (e) {
      toast.error("Error Occured: " + JSON.stringify(e));
    }
  };

  return (
    <Box padding={4} alignSelf="center" alignY="center" style={{ flex: 1 }}>
      <Text variant="displayLarge">Create a Template</Text>
      <ScrollView style={{ flex: 1 }}>
        <Stack space={4} align="center" paddingTop={24} paddingBottom={24}>
          <TextInput
            defaultValue={form.name}
            mode="outlined"
            label="Template Name"
            style={{ width: 400 }}
            onChangeText={(v) => {
              setForm((p) => ({ ...p, name: v }));
            }}
          />
          {form.sections.map((section, index) => (
            <>
              <TextInput
                defaultValue={section.title}
                mode="outlined"
                label="Nom de la section"
                style={{ width: 400 }}
                onChangeText={(v) => {
                  setForm((p) => {
                    const newState = { ...p };
                    newState.sections[index].title = v;
                    return newState;
                  });
                  section.content = v;
                }}
              />
              <View style={{ height: 20 }} />
              <TextInput
                mode="outlined"
                label="Text"
                numberOfLines={10}
                multiline
                defaultValue={section.content}
                style={{ width: 400, height: 200 }}
                onChangeText={(v) => {
                  setForm((p) => {
                    const newState = { ...p };
                    newState.sections[index].content = v;
                    return newState;
                  });
                  section.content = v;
                }}
              />
            </>
          ))}
          <Text>Show Timer</Text>
          <Switch
            value={form.showTimer}
            disabled={false}
            onValueChange={(value) => {
              setForm((p) => {
                const newState = { ...p };
                newState.showTimer = value;
                return newState;
              });
            }}
          />
        </Stack>
      </ScrollView>
      <Stack space={4} align="center" paddingTop={24} paddingBottom={24}>
        <Button
          loading={loading}
          style={{ width: 200 }}
          mode="contained"
          onPress={() => {
            setForm((p) => {
              const newState = { ...p };
              newState.sections = [
                ...newState.sections,
                { title: "", content: "" },
              ];
              return newState;
            });
          }}
        >
          Add Section
        </Button>
        <Button
          loading={loading}
          style={{ width: 200 }}
          mode="contained"
          onPress={() => storeData(form.name, form)}
        >
          Create the template
        </Button>
        <Button
          style={{ width: 200 }}
          mode="contained"
          onPress={() => props.navigation.navigate(Routes.HOME)}
        >
          Go Back
        </Button>
      </Stack>
    </Box>
  );
};
