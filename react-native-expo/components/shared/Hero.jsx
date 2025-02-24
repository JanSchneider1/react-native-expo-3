import {StyleSheet, View, Image, Text} from "react-native";
import React, {useState} from "react";
import {Searchbar} from "react-native-paper";

const image = require("../../assets/images/Pasta.png");

export default function Hero({isSearchBarVisible, onSearchSubmit}) {
    const [searchText, setSearchText] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.headline1}>Little Lemon</Text>
                    <Text style={styles.headline2}>Chicago</Text>
                    <Text style={styles.text}>We are a family owned Mediterranean restaurant, focused on traditional
                        recipes served with a modern twist.</Text>
                </View>
                <Image source={image} style={styles.image}/>
            </View>
            {isSearchBarVisible && <Searchbar
                placeholder="Search"
                placeholderTextColor="#333333"
                onChangeText={(text) => {setSearchText(text)}}
                value={searchText}
                style={styles.searchBar}
                iconColor="#333333"
                inputStyle={{ color: "#333333" }}
                elevation={5}
                onIconPress={() => onSearchSubmit(searchText)}
                onSubmitEditing={() => onSearchSubmit(searchText)}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        gap: 20,
        backgroundColor: "#495E57",
        elevation: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "50%",
    },
    headline1: {
        fontFamily: "Karla",
        fontSize: 24,
        color: "#EDEFEE",
        fontWeight: "bold",
    },
    headline2: {
        fontFamily: "Karla",
        fontSize: 18,
        color: "#EDEFEE",
        fontWeight: "bold",
    },
    text: {
        fontFamily: "Markazi",
        marginTop: 15,
        fontSize: 16,
        color: "#EDEFEE"
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 20,
        elevation: 5,
    },
    searchBar: {
        width: "100%",
        backgroundColor: "#F4CE14"
    },
});