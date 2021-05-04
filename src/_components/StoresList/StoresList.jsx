import React, { useState, useEffect } from "react";
import { orderBy, includes, isEmpty } from "lodash";

export const SortTypeEnum = {
  ASC: 0,
  DESC: 1,
};

export function StoresList({ items, filterText, sortType, onRowSelected }) {
  const filteredItems = getFilteredItems(items, filterText);
  const sortedItems = orderBy(filteredItems,'StoreName', sortType == SortTypeEnum.DESC ? "desc" : "asc");

  function getFilteredItems(items, text) {
    if (isEmpty(text)) return items;
    return items.filter((item) => {
      return includes(item.StoreName, text);
    });
  }

  return (
    <>
      <ul>
        {sortedItems.map((item, index) => (
          <li
            key={item.id}
            onClick={() => {
              onRowSelected(item);
            }}
          >
            {item.StoreName}
          </li>
        ))}
      </ul>
    </>
  );
}
