import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { StyleSheet, Text, View, Button, Dimensions, Image } from "react-native";
// import { WebView } from "react-native-webview";

export default function App() {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  // const [playTime, setPlayTime] = useState("0.00");
  const [playerror, setPlayError] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");
  const [playerReady,setPlayerReady]=useState(false)

  const errorMsg = (
    <Text style={{ color: "red", marginHorizontal:15,marginVertical:5 }}>
      Unable to play video due to some issues, Sorry for inconvienence...
    </Text>
  );

  return (
    <View style={styles.container}>
       {!playerror && (
        <YoutubePlayer
          ref={playerRef}
          height={Dimensions.get("window").height / 3}
          width={Dimensions.get("window").width}
          videoId={"aqz-KE-bpKQ"}
          play={playing}
          onChangeState={(event) => {
            console.log(event);
            setCurrentEvent(event);
            if(event === "paused"){
              setPlaying(false)
            }
          }}
          onReady={() => {
            console.log("ready")
            setPlayerReady(true)
          }}
          onError={(e) => {
            setPlayError(true);
            setPlaying(false);
            setCurrentEvent("unstarted");
            console.log(e);
          }}
          onPlaybackQualityChange={(q) => console.log(q)}
          volume={50}
          playbackRate={1}
          playerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: true,
          }}
        />
      )}
      {(playerror || !playerReady) && <Image source={{ uri: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg" }} style={styles.mealImage} />}
      <View>{playerror && errorMsg}</View>
      <View style={styles.btnContainer}>
      {playerror && <Button title="Retry" onPress={() => {
        setPlayError(false)
        setPlaying(true)
        }} />}
      {(currentEvent === "playing" && !playerror ) && <Button title="Pause the video" onPress={() => {
        setCurrentEvent("paused")
        setPlaying(false)
        console.log("Pausing the video...")
        }} />}
      {(currentEvent === "paused" && !playerror) && <Button title="Resume the video" onPress={() => {
        setCurrentEvent("playing")
        setPlaying(true)
        console.log("Trying to resume the video...")
      }} />}
      {(currentEvent === "ended" && !playerror) && <Button title="Replay the video" onPress={() => {
        playerRef.current.seekTo(0,true);
        setPlaying(true)
      }} />}
      {/* {playing && (
        <Button
          title="get current player time"
          onPress={() => {
            playerRef.current
              .getCurrentTime()
              .then((data) => setPlayTime(data));
            playerRef.current
              .getCurrentTime()
              .then((currentTime) =>
                console.log("currentTime:", { currentTime })
              );

            playerRef.current
              .getDuration()
              .then((getDuration) => console.log("Duration", { getDuration }));

            playerRef.current
              .isMuted()
              .then((isMuted) => console.log("Muted", { isMuted }));

            playerRef.current
              .getVolume()
              .then((getVolume) => console.log("Volume", { getVolume }));

            playerRef.current
              .getPlaybackRate()
              .then((getPlaybackRate) =>
                console.log("Play Back Rate:", { getPlaybackRate })
              );

            playerRef.current
              .getAvailablePlaybackRates()
              .then((getAvailablePlaybackRates) =>
                console.log("Available playback Rates", {
                  getAvailablePlaybackRates,
                })
              );
          }}
        />
      )} */}
  </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mealImage: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
  },
  btnContainer:{
    marginVertical:10
  }
});
