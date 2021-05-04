import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listActions } from "../../_actions";
import Map from "../../_components/map/map";
import Pagination from "../../_components/pagination/pagination";

function ListPage() {
  const list = useSelector((state) => state.list);
  const mapPositions= getMapPoisitions(list.items);
  const [centerPosition, setCenterPosition]= useState(list.items.length>0? list.items[0]: null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listActions.getAll());
  }, []);

  function getMapPoisitions(){
    return list.items.map(item => {
      return {
        key: item.id,
        lat: +item.Latitude,
        lng: +item.Longitude,
        title: item.StoreName,
        description: '',
      }
    })
  }

  function onRowSelected(item) {
    const focusPosition = {
        lat: +item.Latitude,
        lng: +item.Longitude,
    };
    setCenterPosition(focusPosition);
  }

  return (
    <>
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {list.loading && <em>Loading items...</em>}
              {list.error && (
                <span className="text-danger">ERROR: {list.error}</span>
              )}
              {list.items && (
                <ul>
                  {list.items.map((item, index) => (
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
              )}
            </div>
          </div>
        </div>
        <div className="col-3">
          {mapPositions && <Map positions={mapPositions} center={centerPosition} />}
        </div>
      </div>
    </>
  );
}

export { ListPage };
