import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import FaqCard from "./FaqCard";

export default function FaqList() {
  const faqs = [
    {
      question: "What are the food pantry's hours",
      answer: "Monday: 12-6PM, \nWednesday: 12-5PM",
    },
    {
      question: "Where is the food pantry located?",
      answer: "Taylor Down Under 112, in Madison Union",
    },
    {
      question: "Where do I pick up my food?",
      answer: "For curbside pickup...",
      details:
        "pull in front of Taylor Down Under" +
        " or the Taylor Hall loading dock. " +
        "Upon arrival, call 540-568-6071 and someone will bring you your order",
    },
    {
      question: "Who can use the food pantry",
      answer: "The pantry is open to all JMU students. No questions asked",
      details:
        "Additionally, there is a student-driven initiative in partnership" +
        " with Canterbury Episcopal Campus Ministry, called SHELF’D" +
        " (Students Helping Every Last Fellow Duke). This resource is" +
        " located just off campus, at 741 South Main Street. Tucked away on" +
        " the back porch of Canterbury Episcopal Campus Ministry, SHELF’D " +
        "strives to offer a stigma-free gateway to nutrition for anyone who" +
        " feels they do not have enough nutritional food to eat. If you are" +
        " hungry, you are welcome. No exceptions, no questions asked.",
    },
  ];
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
    <View style={{ flex: 1, width: "100%" }}>
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
  emptyCartView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    //height: 100,
    //backgroundColor: "#EDEDED",
  },
  bg: {
    backgroundColor: "#EDEDED",
    padding: 5,
    borderRadius: 5,
  },
  emptyCartText: {
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
  },
});
