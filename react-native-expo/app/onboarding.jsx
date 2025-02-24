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
    const [telephone, setTelephone] = useState("");

    return (
        <View style={styles.container}>
            <Header/>
            <Hero/>
            <Text style={styles.headline}>Let us get to know you!</Text>
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
            <TextInput
                label="Telephone number"
                value={telephone}
                onChangeText={text => {setTelephone(text)}}
            />
            <Button mode="contained"
                    onPress={() => saveProfile(firstName, lastName, email, telephone)}
                    disabled={!isInputValid(firstName, lastName, email, telephone)}>
                Next
            </Button>
        </View>
    );
}

function saveProfile(firstName, lastName, email, telephone) {
    const profile = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        telephone: telephone,
    }
    saveItem("profile", profile)
        .then(() => router.replace("/"));
}

function isInputValid(firstName, lastName, email, telephone) {
    return firstName !== "" && lastName !== "" && telephone !== "" && isEmailValid(email);
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