import React from "react";
import { View, Image } from "react-native";
import styles from "./MainMenu.style";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const MainMenu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/img/ptt_anasayfa.jpg")}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Şehre göre ara"
          onPress={() => navigation.navigate("SearchByAddressScreen")}
        />
        <CustomButton
          title="Posta koduna göre ara"
          onPress={() => navigation.navigate("SearchByCodeScreen")}
        />
      </View>
    </View>
  );
};

export default MainMenu;
