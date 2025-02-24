import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function Filters({onChange, activeCategories, categories}) {
    return (
        <View style={styles.filtersContainer}>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onChange(index)}
                    style={{
                        flex: 1 / categories.length,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 16,
                        backgroundColor: activeCategories.includes(categories[index]) === true ? '#EE9972' : '#495E57',
                        borderWidth: 1,
                        borderColor: 'white',
                    }}>
                    <View>
                        <Text style={{color: activeCategories.includes(categories[index]) === true ? 'black' : 'white'}}>
                            {category}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    filtersContainer: {
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
});
