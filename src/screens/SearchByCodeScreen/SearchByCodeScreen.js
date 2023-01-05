import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import styles from "./SearchByCodeScreen.style";
import RenderFlatlist from "./RenderFlatlist";

const SearchByCodeScreen = () => {
  const navigation = useNavigation();
  const [zipcode, setZipcode] = useState("");
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const dataHandler = async (zipcode) => {
    const plaka = zipcode.slice(0, 2);
    await axios
      .get(`https://api.ubilisim.com/postakodu/il/${plaka}`)
      .then((response) => setData(response.data.postakodu))
      .then(
        setList(
          data.filter(function (value) {
            return value.pk == zipcode;
          })
        )
      )
      .catch((err) => console.error(err));
  };

  const renderItem = ({ item }) => {
    return (
      <RenderFlatlist
        il={item.il}
        ilce={item.ilce}
        mahalle={item.mahalle}
        pk={item.pk}
      />
    );
  };

  console.log(list);

  return (
    <View style={styles.container}>
      <TextInput
        value={zipcode}
        onChangeText={setZipcode}
        style={styles.input}
      />
      <CustomButton title="Ara" onPress={() => dataHandler(zipcode)} />
      <FlatList data={list} renderItem={renderItem} style={styles.flatlist} />
      <CustomButton title="GERİ" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SearchByCodeScreen;
