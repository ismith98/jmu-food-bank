import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import FaqCard from "./FaqCard";
import Faqs from "./Faqs.json";

export default function FaqList() {
  const faqs = Faqs;
  const [filteredQuestions, setFilteredQuestions] = useState(faqs);
  const [searchBarText, setSearchBarText] = useState("");

  function filterQuestions(text) {
    setSearchBarText(text);
    let filteredQs = faqs.filter((faq) => {
      let question = faq.question.toLowerCase();
      return question.includes(text.toLowerCase());
    });
    setFilteredQuestions(filteredQs);
  }

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={filterQuestions}
        value={searchBarText}
        placeholder="Search questions"
        platform="ios"
        lightTheme
        round
      />

      <ScrollView>
        {filteredQuestions.map((faq, index) => (
          <FaqCard faq={faq} key={index} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
