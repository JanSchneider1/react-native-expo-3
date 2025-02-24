import {View} from "react-native";
import React, {useEffect, useState} from "react";
import Header from "../components/shared/Header";
import Hero from "../components/shared/Hero";
import {router} from "expo-router";
import {loadItem} from "../services/LocalStorageService";
import Filters from "../components/home/Filters";
import ItemList from "../components/home/ItemList";
import {
    createTable,
    filterByQueryAndCategories,
    getMenuItems,
    openDBConnection,
    saveMenuItems
} from "../services/DatabaseService";

const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const CATEGORIES = ["starters", "mains", "desserts"];

export default function Index() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategories, setActiveCategories] = useState([...CATEGORIES]);

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

    useEffect(() => {
        getFilteredItems(searchQuery, activeCategories)
            .then(items => {
                setItems(items);
            });
    }, [searchQuery, activeCategories]);

    return (
        <View style={{display: "flex", flex: 1}}>
            <Header isProfileLinkButtonVisible={true}/>
            <Hero isSearchBarVisible={true} onSearchSubmit={searchText => setSearchQuery(searchText)}/>
            <Filters categories={CATEGORIES} activeCategories={activeCategories} onChange={(index) => {
                setActiveCategories(getToggledCategories(activeCategories, index));
            }}/>
            <ItemList items={items}/>
        </View>
    );
}

function getToggledCategories(activeCategories, indexClicked) {
    if (activeCategories.includes(CATEGORIES[indexClicked]) === true) {
        return activeCategories.filter(
            (activeCategory) => activeCategory.includes(CATEGORIES[indexClicked]) === false);
    }
    return [...activeCategories, CATEGORIES[indexClicked]];
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

async function getFilteredItems(searchQuery, activeCategories) {
    try {
        console.log(activeCategories);
        return await filterByQueryAndCategories(searchQuery, activeCategories);
    } catch (e) {
        console.log(e.message);
    }
}