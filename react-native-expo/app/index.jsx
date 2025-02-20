import {Text, View} from "react-native";
import React from "react";
import Header from "../components/shared/Header";
import Hero from "../components/shared/Hero";
import Filters from "../components/home/filters";

export default function Index() {
    return (
        <View style={{display: "flex", flex: 1}}>
            <Header/>
            <Hero/>
        </View>
    );
}