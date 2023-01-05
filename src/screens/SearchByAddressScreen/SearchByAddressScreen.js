import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { iller } from "../../assets/data/provinces";
import styles from "../SearchByAddressScreen/SearchByAddressScreen.style";
import CustomSelectDropDown from "../../components/CustomSelectDropDown";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SearchByAddressScreen = () => {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState();
  const [pk, setPk] = useState(0);

  const dataHandler = async (plaka) => {
    await axios
      .get(`https://api.ubilisim.com/postakodu/il/${plaka}`)
      .then((response) => setSelectedCity(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (
      selectedCity == null &&
      selectedDistrict == null &&
      selectedNeighbourhood == null
    ) {
      return;
    }
    let temp = selectedCity.postakodu.filter(
      (x) => x.ilce == selectedDistrict && x.mahalle == selectedNeighbourhood
    )[0].pk;
    setPk(temp);
  }, [selectedNeighbourhood]);

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <CustomSelectDropDown
          data={iller}
          defaultButtonText={"İl Seçiniz"}
          onSelect={(selectedItem, index) => {
            dataHandler(selectedItem[0]);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        {selectedCity != null && (
          <CustomSelectDropDown
            data={Array.from(
              new Set(selectedCity.postakodu.map((x) => x.ilce))
            )}
            defaultButtonText={"İlçe Seçiniz"}
            onSelect={(selectedItem, index) => {
              setSelectedDistrict(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        )}
        {selectedDistrict != null && (
          <CustomSelectDropDown
            data={Array.from(
              new Set(
                selectedCity.postakodu
                  .filter((x) => x.ilce == selectedDistrict)
                  .map((x) => x.mahalle)
              )
            )}
            defaultButtonText={"Mahalle Seçiniz"}
            onSelect={(selectedItem, index) => {
              setSelectedNeighbourhood(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return `${item}`;
            }}
          />
        )}
      </View>
      <View>
        {pk != 0 ? (
          <Text style={styles.title}>{`${pk}`}</Text>
        ) : (
          <View style={styles.result} />
        )}
      </View>
      <View style={styles.button}>
        <CustomButton title="GERİ" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default SearchByAddressScreen;
