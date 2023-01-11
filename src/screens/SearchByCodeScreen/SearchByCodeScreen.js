import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import styles from "./SearchByCodeScreen.style";
import RenderFlatlist from "./RenderFlatlist";
import { onlyCharacter } from "../../utils/onlyNumber";

const SearchByCodeScreen = () => {
  const navigation = useNavigation();
  const [zipcode, setZipcode] = useState("");
  const [data, setData] = useState([
    {
      il: "",
      ilce: "",
      mahalle: "",
      pk: "",
      plaka: "",
      semt_bucak_belde: "",
    },
    {
      il: "",
      ilce: "",
      mahalle: "",
      pk: "",
      plaka: "",
      semt_bucak_belde: "",
    },
    {
      il: "",
      ilce: "",
      mahalle: "",
      pk: "",
      plaka: "",
      semt_bucak_belde: "",
    },
    {
      il: "",
      ilce: "",
      mahalle: "",
      pk: "",
      plaka: "",
      semt_bucak_belde: "",
    },
    {
      il: "",
      ilce: "",
      mahalle: "",
      pk: "",
      plaka: "",
      semt_bucak_belde: "",
    },
  ]);

  const dataHandler = async (zipcode) => {
    const plaka = zipcode.slice(0, 2);
    await axios
      .get(`https://api.ubilisim.com/postakodu/il/${plaka}`)
      .then((response) =>
        setData(
          response.data.postakodu.filter(function (value) {
            return value.pk == zipcode;
          })
        )
      )
      .catch((err) => console.error(err));
  };
  console.log(data);
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

  const createAlert = () =>
    Alert.alert("Yanlış Girdi", "Lütfen 5 haneli bir posta kodu giriniz", [
      { text: "OK", onPress: () => setZipcode("") },
    ]);

  return (
    <View style={styles.container}>
      <TextInput
        value={zipcode}
        onChangeText={(value) => setZipcode(onlyCharacter(value))}
        keyboardType="numeric"
        maxLength={5}
        style={styles.input}
        placeholder="Posta kodu giriniz"
      />
      {zipcode.length !== 5 ? (
        <CustomButton title="Ara" onPress={() => createAlert()} />
      ) : (
        <CustomButton title="Ara" onPress={() => dataHandler(zipcode)} />
      )}

      <FlatList data={data} renderItem={renderItem} style={styles.flatdata} />
      <CustomButton title="GERİ" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SearchByCodeScreen;
