import {StyleSheet, Text, View, Image} from "react-native";
import React from "react";

const image = require("../../assets/images/Bruschetta.png");

export default function Item({item}) {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <Image style={styles.image} source={image}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
    },
    subContainer: {
        width: "70%",
        display: "flex",
        justifyContent: "space-between",
    },
    name: {
        color: "#000000",
        fontFamily: "Karla",
        fontWeight: "bold",
        fontSize: 16,
    },
    description: {
        color: "#515151",
        fontFamily: "Markazi",
        fontSize: 16,
    },
    price: {
        color: "#2e2e2e",
        fontFamily: "Markazi",
        fontSize: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 2,
        elevation: 2,
    },
});