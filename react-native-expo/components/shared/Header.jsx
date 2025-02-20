import {StyleSheet, TouchableOpacity, View, Image} from "react-native";
import React from "react";

const logo = require("../../assets/images/Logo.png");
const profileImage = require("../../assets/images/Profile.png");

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.spacing}/>
            <Image source={logo}/>
            <TouchableOpacity>
                <Image source={profileImage} style={styles.profile}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    spacing: {
        width: 50
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 100,
        elevation: 5,
    }
});