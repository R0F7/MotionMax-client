/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css' 

const center = {
  lat: 51.505,
  lng: -0.09,
};

const DraggableMarker = ({ draggable, position, onDragEnd, toggleDraggable }) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        onDragEnd(marker.getLatLng());
      }
    },
  }), [onDragEnd]);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
};

const MapWithMarker = () => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);

  const toggleDraggable = useCallback(() => {
    setDraggable(d => !d);
  }, []);

  const handleDragEnd = useCallback((newPosition) => {
    setPosition(newPosition);
  }, []);

  return (
    <MapContainer className='h-[200px] md:h-[400px]' center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        draggable={draggable}
        position={position}
        onDragEnd={handleDragEnd}
        toggleDraggable={toggleDraggable}
      />
    </MapContainer>
  );
};

export default MapWithMarker;