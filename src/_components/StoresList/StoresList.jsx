import React, { useState, useEffect } from "react";

export const SortTypeEnum = {
  ASC: 0,
  DESC: 1,
};

export function StoresList({ items, onRowSelected }) {

  return (
    <>
      <ul>
        {items.map((item, index) => (
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
