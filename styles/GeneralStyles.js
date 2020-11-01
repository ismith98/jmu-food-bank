import { StyleSheet, StatusBar, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  underStatusBar: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  foodBg: {
    //justifyContent: "center",
    //height: "100%",
    //elevation: 15,
    /*
      shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        shadowColor: 'rgba(0,0,0, 0.8)',
        elevation: 10,
        */
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    height: "100%",
  },
});
