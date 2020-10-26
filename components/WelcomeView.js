import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WelcomeView() {
  function gotoFaqPage() {
    console.log("faq");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome </Text>
        <Text style={styles.br}>{"\n\n"}</Text>
        <Text style={styles.bodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          malesuada tempor augue eget porttitor.
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
