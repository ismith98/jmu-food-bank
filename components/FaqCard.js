import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FaqCard({ faq }) {
  const [hideDetails, setHideDetails] = useState(true);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{faq.question}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          <Text>{`${faq.answer} ${faq.details ? "\n" : ""}`}</Text>

          {faq.details ? (
            hideDetails ? (
              <Text
                onPress={() => setHideDetails(false)}
                style={styles.detailsButton}
              >
                more details...{" "}
              </Text>
            ) : (
              <>
                <Text style={styles.detailsText}>
                  {faq.details} {"\n"}
                </Text>
                <Text
                  onPress={() => setHideDetails(true)}
                  style={styles.detailsButton}
                >
                  less details...{" "}
                </Text>
              </>
            )
          ) : null}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card1: {
    backgroundColor: "red",
    borderRadius: 2,
    width: "90%",
    padding: 10,
  },
  card: {
    //height: 100,
    //flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 3,
    marginTop: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    width: "100%",
    backgroundColor: "#CBB677",
    padding: 7,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoCondensed",
    color: "black",
  },
  content: {
    padding: 7,
  },
  text: {
    fontFamily: "RobotoCondensed",
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "bold",
  },
  detailsButton: {
    color: "blue",
    fontWeight: "normal",
  },
  detailsText: {
    fontSize: 14,
    fontWeight: "normal",
  },
});
