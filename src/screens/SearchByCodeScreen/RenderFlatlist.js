import React from "react";
import { View, Text } from "react-native";

const RenderFlatlist = ({ il, ilce, mahalle, pk }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        padding: 5,
        backgroundColor: "white",
        width: 300,
      }}
    >
      <Text
        style={{
          backgroundColor: "gray",
          textAlign: "center",
          color: "white",
          fontSize: 14,
          fontWeight: "bold",
          padding: 5,
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        {il}
      </Text>
      <Text>{`İLÇE: ${ilce}`}</Text>
      <Text>{`MAHALLE: ${mahalle}`}</Text>
      <Text>{`POSTAKODU: ${pk}`}</Text>
    </View>
  );
};

export default RenderFlatlist;
