import {StyleSheet, TouchableOpacity, View, Image} from "react-native";
import React from "react";
import {Link} from "expo-router";

const logo = require("../../assets/images/Logo.png");
const profileImage = require("../../assets/images/Profile.png");

function ProfileLinkButton() {
    return (
        <Link href="profile" asChild>
            <TouchableOpacity>
                <Image source={profileImage} style={styles.profile}/>
            </TouchableOpacity>
        </Link>
    );
}

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.spacing}/>
            <Image source={logo}/>
            <ProfileLinkButton/>
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