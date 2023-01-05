import React from "react";
import { View, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import styles from "./CustomSelectDropDown.style";

const CustomSelectDropDown = ({
  data,
  defaultButtonText,
  onSelect,
  buttonTextAfterSelection,
  rowTextForSelection,
}) => {
  return (
    <SelectDropdown
      data={data}
      defaultButtonText={defaultButtonText}
      onSelect={onSelect}
      buttonTextAfterSelection={buttonTextAfterSelection}
      rowTextForSelection={rowTextForSelection}
      buttonStyle={styles.dropdown1BtnStyle}
      buttonTextStyle={styles.dropdown1BtnTxtStyle}
    />
  );
};

export default CustomSelectDropDown;
