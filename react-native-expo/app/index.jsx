import {Pressable, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Header from "../components/shared/Header";
import Hero from "../components/shared/Hero";
import {Link, router} from "expo-router";
import {loadItem} from "../services/LocalStorageService";
import Filters from "../components/home/Filters";
import ItemList from "../components/home/ItemList";
import {createTable, getMenuItems, openDBConnection, saveMenuItems} from "../services/DatabaseService";

const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const SECTIONS = ["starters", "mains", "deserts"];

export default function Index() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItem("profile")
            .then(profile => {
                // Redirect to onboarding page if app is opened for the first time
                // or logout button was clicked and profile has been cleared.
                if (profile === null) {
                    router.replace("/onboarding");
                    return;
                }
                // Setup database and fetch data from server or just return data from database.
                initializeDatabase().then(items => setItems(items));
            });
    }, []);

    return (
        <View style={{display: "flex", flex: 1}}>
            <Header/>
            <Hero/>
            <Link href="/onboarding" asChild>
                <Pressable>
                    <Text>Onboarding</Text>
                </Pressable>
            </Link>
            <Filters sections={SECTIONS} selections={[]} onChange={(index) => {
                console.log(index)
            }}/>
            <ItemList items={items}/>
        </View>
    );
}

async function initializeDatabase() {
    try {
        await openDBConnection()
        await createTable();
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
            const menuItems = await fetchData();
            await saveMenuItems(menuItems);
        }
        return menuItems;
    } catch (e) {
        console.log(e.message);
    }
}

async function fetchData() {
    const response = await fetch(API_URL);
    const json = await response.json();

    return json.menu;
}