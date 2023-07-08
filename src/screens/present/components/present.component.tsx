import React from "react";
import { Box, Stack } from "@mobily/stacks";
import { Button, Divider, Text } from "react-native-paper";
import { useArticle } from '../hooks/use.article'
import { Routes } from "../../../router/const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { List } from "react-native-paper";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
//import TypeWriterEffect from "react-typewriter-effect";
import Rive from "@rive-app/react-canvas";
import BackgroundImage from "../../../assets/1.png";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { toast } from "react-toastify";
import { Template } from "../../../types/template";

function remainingTimeUntilNextSunday(): { minutes: number; seconds: number } {
  const now = new Date();
  const sunday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    10,
    15,
    0,
    0
  );
  const remainingTime = sunday.getTime() - now.getTime();
  const remainingMinutes = Math.floor(remainingTime / (1000 * 60));
  const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  return { minutes: remainingMinutes, seconds: remainingSeconds };
}

const Timer = () => {
  const [timeLeft, setTimeLeft] = React.useState(
    remainingTimeUntilNextSunday()
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(remainingTimeUntilNextSunday());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  if (timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
    return (
      <Text
        variant="displayLarge"
        style={{ color: "white", fontWeight: "bold" }}
      >
        C'est parti !
      </Text>
    );
  }

  return (
    <Text
      variant={timeLeft.minutes > 0 ? "displayMedium" : "displayLarge"}
      style={{ color: "white" }}
    >
      {timeLeft.minutes > 0 ? `${timeLeft.minutes} min` : ""} {timeLeft.seconds}{" "}
      s
    </Text>
  );
};


export const Present = (props: any) => {
  const handle = useFullScreenHandle();

  const { article } = useArticle(props.route.params.templateId);

  return (
    <Box
      padding={4}
      alignSelf="center"
      alignY="center"
      style={{
        height: Dimensions.get("screen").height,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <FullScreen handle={handle}>
        <Box
          style={StyleSheet.absoluteFillObject}
          alignSelf="center"
          alignX="center"
        >
          <Image
            source={{ uri: BackgroundImage }}
            style={{ height: "100%", width: "100%" }}
          />
          <Box
            style={StyleSheet.absoluteFillObject}
            alignSelf="center"
            alignX="center"
            alignY="center"
          >
            <Stack space={4} style={{ paddingLeft: 200 }}>
              {/* <TypeWriterEffect
                style={{ marginTop: 60 }}
                textStyle={{
                  //fontFamily: "Red Hat Display",
                  color: "black", //#3F3D56",
                  fontWeight: 500,
                  fontSize: "2.5em",
                }}
                startDelay={1}
                cursorColor="#3F3D56"
                multiText={article?.text.split("\n")}
                multiTextDelay={3000}
                typeSpeed={30}
              /> */}

              {article?.template.sections.map((s) => (
                <Stack space={8} style={{ marginTop: 50 }}>
                  <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
                    {s.title}
                  </Text>
                  <Stack space={8}>
                    {s.content != null
                      ? s.content.split("\n").map((text) =>
                        text !== "" ? (
                          <Text
                            style={{ marginLeft: 50 }}
                            variant="displaySmall"
                          >
                            ➡️ {text}
                          </Text>
                        ) : null
                      )
                      : null}
                  </Stack>
                </Stack>
              ))}
              {article?.template.showTimer && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 200,
                  }}
                >
                  <Rive
                    style={{
                      minHeight: 400,
                      minWidth: 400,
                    }}
                    src="countdown.riv"
                  />
                  <View style={{ position: "absolute" }}>
                    <Timer />
                  </View>
                </View>
              )}
            </Stack>
          </Box>

          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                justifyContent: "flex-end",
                alignItems: "flex-end",
              },
            ]}
          >
            <Rive
              style={{
                height: 700,
                width: 700,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
              src="girl_and_dog.riv"
            />
          </View>
        </Box>
      </FullScreen>
      <Stack
        space={4}
        align="center"
        paddingBottom={24}
        style={{ position: "absolute", left: 0, bottom: 0 }}
      >
        <Button style={{ width: 200 }} mode="contained" onPress={handle.enter}>
          Full Screen
        </Button>
      </Stack>
    </Box>
  );
};
