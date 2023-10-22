import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import './map-comp.css';

export default function MyMap (props) {
  const mapContainer = useRef(null);

  const positions = props.info;
  const circles = positions.map((position) => {

    if (position.event_location !== null && position.event_location.toLowerCase() in props.geocoding && position.date >= props.startDate && position.date <= props.endDate) {
      var latlong = props.geocoding[position.event_location.toLowerCase()];
      var lat = latlong[0] + Math.random() * 0.02;
      var long = latlong[1] + Math.random() * 0.02;
      latlong = [lat, long];

      return (
        <Circle center={latlong} radius={300}>
          <Popup>
            {
              <div>  
                <h2>Subject: {position.event_subject}</h2>
                <p>Victims: {position.event_number_of_victims}</p>
                <p>Location: {position.event_location}</p>
                <p>Date: {position.date}</p>
                <p>Title: {position.title}</p>
                <p>URL: <a href={position.url}>{position.url}</a></p>
              </div>
            };
          </Popup>
        </Circle>
      )
    }
  })
        
  return (
    <MapContainer className='map-container' center={props.center} zoom={9} scrollWheelZoom={true}>
      {circles}
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
      />

    </MapContainer>
  )

};
