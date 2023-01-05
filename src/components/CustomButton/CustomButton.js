import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./CustomButton.style";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
