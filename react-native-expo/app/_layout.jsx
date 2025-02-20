import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'Karla': require('../assets/fonts/Karla-Regular.ttf'),
        'Markazi': require('../assets/fonts/MarkaziText-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    // Expo doesn't require specifying routes when using "file-based-routing".
    // Also navigating is done by using <Link/> component.
    return <Stack/>;
}