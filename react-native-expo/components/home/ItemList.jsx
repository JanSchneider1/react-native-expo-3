import {FlatList} from "react-native";
import Item from "./Item";
import {Divider} from "react-native-paper";


export default function ItemList({items}) {
    return (
        <FlatList
            data={items}
            renderItem={({item}) => <Item item={item}/>}
            ItemSeparatorComponent={<Divider/>}>
        </FlatList>
    );
}