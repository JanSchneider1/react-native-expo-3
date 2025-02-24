import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Button, TextInput} from "react-native-paper";
import {deleteItem, loadItem, saveItem} from "../services/LocalStorageService";
import {router} from "expo-router";

export default function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");

    const loadProfile = () => {
        loadItem("profile")
            .then(profile => {
                setFirstName(profile.firstName);
                setLastName(profile.lastName);
                setEmail(profile.email);
                setTelephone(profile.telephone);
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
            <TextInput
                label="Telephone number"
                value={telephone}
                onChangeText={text => {setTelephone(text)}}
            />
            <Button mode="contained" onPress={() => logout()} style={{backgroundColor: "#F4CE14"}}>
                <Text style={{color: "#333333"}}>Logout</Text>
            </Button>
            <Button mode="contained" onPress={() => loadProfile()}>
                Discard Changes
            </Button>
            <Button mode="contained"
                    onPress={() => saveProfile(firstName, lastName, email, telephone)}
                    disabled={!isInputValid(firstName, lastName, email, telephone)}>
                Save Changes
            </Button>
        </View>
    );
}

function logout() {
    deleteItem("profile")
        .then(() => router.replace("/"));
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