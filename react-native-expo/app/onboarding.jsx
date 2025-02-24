import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Button, TextInput} from "react-native-paper";
import {saveItem} from "../services/LocalStorageService";
import {router} from "expo-router";
import Header from "../components/shared/Header";
import Hero from "../components/shared/Hero";

export default function Onboarding() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <View style={styles.container}>
            <Header/>
            <Hero/>
            <Text style={styles.headline}>Enter your personal information</Text>
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
            <Button mode="contained"
                    onPress={() => saveProfile(firstName, lastName, email)}
                    disabled={!isInputValid(firstName, lastName, email)}>
                Next
            </Button>
        </View>
    );
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