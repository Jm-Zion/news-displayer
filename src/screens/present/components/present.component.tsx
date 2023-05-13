import React from "react";
import { Box, Stack } from "@mobily/stacks";
import { Button, Divider, Text } from "react-native-paper";
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

const calculateTimeLeft = (initialTime: number) => {
  let difference = initialTime - +new Date();

  let timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
    days: number;
  } = {} as any;

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

function remainingTimeUntilNextSunday(): { minutes: number; seconds: number } {
  const now = new Date();
  const sunday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + (7 - now.getDay()),
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
  //const initialTime = React.useRef(dateTimeNextSunday());
  const [timeLeft, setTimeLeft] = React.useState(
    //calculateTimeLeft(initialTime.current)
    remainingTimeUntilNextSunday()
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        /*calculateTimeLeft(initialTime.current)*/ remainingTimeUntilNextSunday()
      );
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Text variant="headlineMedium" style={{ color: "white" }}>
      {timeLeft.minutes > 0 ? `${timeLeft.minutes} min` : "0 min"}{" "}
      {timeLeft.seconds} s
    </Text>
  );
};

class TemplateModel {
  public template: Template;

  constructor(templateString: string) {
    const object = JSON.parse(templateString);
    this.template = object;
  }
}

export const Present = (props: any) => {
  const handle = useFullScreenHandle();
  const [model, setTemplate] = React.useState<TemplateModel>();

  console.log("Present");

  React.useEffect(() => {
    if (props.route.params) {
      const { templateId } = props.route.params;
      AsyncStorage.getItem(templateId)
        .then((value) => {
          if (value) {
            setTemplate(new TemplateModel(value));
          }
        })
        .catch((err) => {
          toast.error(JSON.stringify(err));
        });
    }
  }, []);

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
                multiText={model?.text.split("\n")}
                multiTextDelay={3000}
                typeSpeed={30}
              /> */}

              {model?.template.sections.map((s) => (
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
              {model?.template.showTimer && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 200,
                  }}
                >
                  <Rive
                    style={{
                      minHeight: 300,
                      minWidth: 300,
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
