import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Button, TextInput} from "react-native-paper";
import {deleteItem, loadItem, saveItem} from "../services/LocalStorageService";
import {router} from "expo-router";

export default function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const loadProfile = () => {
        loadItem("profile")
            .then(profile => {
                setFirstName(profile.firstName);
                setLastName(profile.lastName);
                setEmail(profile.email);
            });
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Personal Information</Text>
            <TextInput
                label="First name"
                value={firstName}
                onChangeText={text => {setFirstName(text)}}
            />
            <TextInput
                label="Last name"
                value={lastName}
                onChangeText={text => {setLastName(text)}}
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => {setEmail(text)}}
            />
            <Button mode="contained" onPress={() => logout()}>
                Logout
            </Button>
            <Button mode="contained" onPress={() => loadProfile()}>
                Discard Changes
            </Button>
            <Button mode="contained"
                    onPress={() => saveProfile(firstName, lastName, email)}
                    disabled={!isInputValid(firstName, lastName, email)}>
                Save Changes
            </Button>
        </View>
    );
}

function logout() {
    deleteItem("profile")
        .then(() => router.replace("/"));
}

function saveProfile(firstName, lastName, email) {
    const profile = {
        firstName: firstName,
        lastName: lastName,
        email: email,
    }
    saveItem("profile", profile)
        .then(() => router.replace("/"));
}

function isInputValid(firstName, lastName, email) {
    return firstName !== "" && lastName !== "" && isEmailValid(email);
}

function isEmailValid(email) {
    return email !== "" && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) === true;
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    headline: {
        fontFamily: "Karla",
        fontSize: 24,
        color: "#333333",
        fontWeight: "bold",
    },
});