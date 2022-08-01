import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'
import { getAirlineById, getAirportByCode } from './data'
import data from './data.js'

const App = () => {
  
  function formatValue(property, value) {
    if (property === "airline") {
      return getAirlineById(value);
    } else {
      return getAirportByCode(value)
    }
  }

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <p>
        Welcome to the app!
      </p>
      <Table
        className="routes-table"
        columns={columns}
        rows={data.routes}
        format={formatValue}
      />
    </section>
  </div>
  )
}

export default App;