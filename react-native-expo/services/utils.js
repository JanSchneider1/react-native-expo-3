import { useRef, useEffect } from 'react';

export function getSectionListData(items) {
  // Creates a map by category.
  const itemsByCategory = new Map();
  items.forEach(item => {
    let itemsForCategory = itemsByCategory.get(item.category);
    if (itemsForCategory === undefined) {
      itemsForCategory = [];
    }
    itemsByCategory.set(item.category, [...itemsForCategory, item]);
  });

  // Convert map back to list with items for each category.
  const data = [];
  itemsByCategory.forEach((value, key) => {
    data.push({ title: key, data: value });
  });
  return data;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
