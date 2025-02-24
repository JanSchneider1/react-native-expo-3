import * as SQLite from 'expo-sqlite';

let db = null;

export async function openDBConnection() {
    db = await SQLite.openDatabaseAsync("little_lemon_capstone");
}

export async function createTable() {
    await db.execAsync(`create table if not exists menuitems (id integer primary key not null, name text, description text, price text, image text, category text)`);
}

export async function getMenuItems() {
    return await db.getAllAsync(`select * from menuitems`);
}

export async function saveMenuItems(menuItems) {
    let insertStatement = `insert into menuitems (name, description, price, image, category) values `;

    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        insertStatement += `("${item.name}","${item.description}","${item.price}","${item.image}","${item.category}")`;

        if (i !== menuItems.length - 1) {
            insertStatement += ",";
        }
    }
    await db.execAsync(insertStatement);
}

export async function filterByQueryAndCategories(query, activeCategories) {
    let selectStatement = `select * from menuitems`;
    selectStatement += ` where category in (${activeCategories.map(category => `"${category}"`)})`;
    if (query.length > 0) {
        selectStatement += ` and name like "%${query}%"`;
    }
    return await db.getAllAsync(selectStatement);
}
