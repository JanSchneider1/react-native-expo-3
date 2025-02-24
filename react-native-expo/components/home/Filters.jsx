import {View, Text, StyleSheet} from 'react-native';
import {Chip, Divider} from "react-native-paper";

export default function Filters({onChange, activeCategories, categories}) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>ORDER FOR DELIVERY!</Text>
            <View style={styles.subContainer}>
                {categories.map((category, index) => (
                    <Chip key={index}
                          onPress={() => onChange(index)}
                          selected={activeCategories.includes(categories[index])}
                          elevated={true}
                    style={{backgroundColor: "#F4CE14"}}>
                        {category}
                    </Chip>
                ))}
            </View>
            <Divider bold={true} style={{marginTop: 10}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 20
    },
    header: {
        fontFamily: "Karla",
        fontWeight: "bold",
        fontSize: 18,
    }
});
