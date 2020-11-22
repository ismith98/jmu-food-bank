import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeContent() {
  const navigation = useNavigation();
  function gotoFaqPage() {
    navigation.navigate("Faq");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome </Text>
        <Text style={styles.br}>{"\n\n"}</Text>
        <Text style={styles.bodyText}>
          To see the inventory of your local food bank, or to reserve food for
          pickup, press Reserve
        </Text>
        <Text style={styles.br}>{"\n\n"}</Text>
        <Text onPress={gotoFaqPage} style={styles.faqText}>
          Questions? Visit FAQ {">>"}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    color: "white",
    fontSize: 20,
    fontFamily: "RobotoCondensed",
    //textAlign: "center",
  },
  container: {
    padding: 20,
    paddingTop: 40,
    paddingLeft: 25,
  },
  welcomeText: {
    fontSize: 40,
    marginBottom: 15,
  },
  bodyText: {
    marginBottom: 15,
  },
  faqText: {
    textDecorationLine: "underline",
  },
  br: {
    fontSize: 10,
  },
});
