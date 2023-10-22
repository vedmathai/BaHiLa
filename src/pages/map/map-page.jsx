import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


import './map-page.css'
import '../pages.css'
import  MyMap  from './components/map-component/map-comp';
import MapSidebar  from './components/map-sidebar-component/map-sidebar-component';
import israel_info from '../../data/israel.jsx'


import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default function MapPage(props) {
    var [searchResponse, setSearchResponse] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const info = israel_info;

    const geocoding = {
        "gaza": [31.354675, 34.308826],
        "gaza strip": [31.354675, 34.308826],
        "occupied west bank": [31.946570, 35.302723],
        "west bank": [31.946570, 35.302723],
        "jerusalem": [31.768319, 35.213710],
        "sinai border with egypt": [31.125730, 34.782730],
        "tel aviv": [32.085300, 34.781768],
        "yafa an-naseriyye": [32.685500, 35.295900],
        "palestinian hospital": [31.768319, 35.213710],
        "east jerusalem": [31.768319, 35.213710],
        "israel": [31.768319, 35.213710],
        "negev desert": [31.000000, 34.000000],
        "rafah crossing": [31.292400, 34.255800],
        "norther gaza": [31.354675, 34.308826],
    }

    const center = [31.768319, 35.213710];

    useEffect(() => {
    }, []);

    const stringify_date = (date) => {
        return date.toISOString().split('T')[0]
    }

    return (
        <>
            <div className='sidebar-container'>
                <MapSidebar
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    startDate={startDate}
                    endDate={endDate}
                 />
            </div>
            <div><MyMap info={info} center={center} geocoding={geocoding} startDate={stringify_date(startDate)} endDate={stringify_date(endDate)} /></div>
        </>
    )
}

