import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Avatar,
  ActivityIndicator,
} from "react-native";
const axios = require("axios").default;

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [seed, setSeed] = useState(1);
  const [error, setError] = useState();

  /*
  useEffect(() => {
    console.log("use effect");
    setLoading(true);
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    axios
      .get(url)
      //.then((res) => {
        //res.json();
        //console.log(res, "got response p1");
      //})
      .then((res) => {
        console.log(res.data.results);
        console.log("got response p2");
        setData(page === 1 ? res.data.results : [...data, ...res.data.results]);
        //page === 1 ? setData(res.results) : setData([...data, ...res.results]);
        //setError(res.data.error || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    return () => {
      //cleanup;
    };
  }, []); 
  */

  function renderFooter() {
    if (loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  //axios.get("")
  const mockData = [
    { id: "1", text: "Expo 💙" },
    { id: "2", text: "is" },
    { id: "3", text: "Awesome!" },
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => alert("Item pressed!")}>
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              alignItems: "center",
            }}
          >
            <Avatar
              source={{ uri: item.picture.thumbnail }}
              size="giant"
              style={{ marginRight: 16 }}
            />
            <Text
              category="s1"
              style={{
                color: "#000",
              }}
            >{`${item.name.first} ${item.name.last}`}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({});
