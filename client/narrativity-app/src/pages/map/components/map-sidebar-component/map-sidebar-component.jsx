import React, { useEffect, useRef } from 'react';

import DatePicker from "react-datepicker";

import './map-sidebar-component.css';

export default function MapSidebar (props) {

  const center = [31.768319, 35.213710];

  useEffect(() => {
  }, []);


  return (
      <>
          <div className='map-sidebar-container'>
            <div className='map-sidebar-title'>NewEventsMapped</div>
            <div className='map-sidebar-datepicker-container'>
                Start Date: <DatePicker selected={props.startDate} onChange={(date) => props.setStartDate(date)} />

            </div>
            <div className='map-sidebar-datepicker-container'>
                End Date <DatePicker selected={props.endDate} onChange={(date) => props.setEndDate(date)} />


            </div>
          </div>
      </>
  )
  }
