import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table'
import Select from './components/Select'
import Map from './components/Map'
import { getAirlineById,
         getAirportByCode,
         getRoutesByAirline,
         getAirports, 
         getRoutesByAirlineAndAirport,
         getRoutesByAirport,
         getLatLong } from './data'
import data from './data.js'

const App = () => {
  const [page, setPage] = useState({
    pageNumber: 1,
    firstRoute: 1,
    lastRoute: 25
  })
  const [airline, setAirline] = useState("")
  const [airport, setAirport] = useState("")
  const [routes, setRoutes] = useState([])
  const [allowedAirports, setAllowedAirports] = useState([])
  const [allowedAirlines, setAllowedAirlines] = useState([])

  useEffect(() => {
    const filterRoutes = () => {
      if (airline && airport) {
        return getRoutesByAirlineAndAirport(airline, airport)
      } else if (airline) {
        return getRoutesByAirline(airline)
      } else if (airport) {
        return getRoutesByAirport(airport)
      } else {
        return data.routes
      }
    }
    setRoutes(filterRoutes())
  }, [airline, airport])

  useEffect(() => {
    function getPage(pageNumber = 1) {
      const routesPerPage = routes.length > 25 ? 25 : routes.length
      const lastRoute = pageNumber * routesPerPage
      const firstRoute = lastRoute - (routesPerPage - 1)
      
      return {
        pageNumber,
        firstRoute,
        lastRoute,
      }
    }
    setPage(getPage(page.pageNumber))
  }, [routes.length, page.pageNumber])

  const nextPage = (e) => {
    setPage({
      ...page,
      pageNumber: page.pageNumber + 1
    })
  }

  const prevPage = (e) => {
    setPage({
      ...page,
      pageNumber: page.pageNumber - 1
    })
  }

  const handleAirlineSelection = (airline) => {
    if (!airline) { 
      setAirline("")
      setAllowedAirports([])
      return
    }
    setAirline(airline)
    const AirportsSrc = getRoutesByAirline(airline).map(route => {
      return getAirportByCode(route.src)
    })
    const AirportsDest = getRoutesByAirline(airline).map(route => {
      return getAirportByCode(route.dest)
    })
    setAllowedAirlines([airline])
    setAllowedAirports([...AirportsSrc, ...AirportsDest])
  }

  const handleAirportSelection = (airport) => {
    if (!airport) {
      setAirport("")
      setAllowedAirlines([])
      return
    }
    setAirport(airport)
    setAllowedAirports([airport])
    setAllowedAirlines(getRoutesByAirport(airport).map(routes => {
      return getAirlineById(routes.airline)
    }))
  }

  const handleSelectReset = () => {
    setAirline("")
    setAirport("")
    setAllowedAirports([])
    setAllowedAirlines([])
    setRoutes(data.routes)
  }

  const handleMapClick = (route) => {
    return (e) => {
      if (e.target.className.baseVal === "source") {
        handleAirportSelection(getAirportByCode(route.src))
      } else {
        handleAirportSelection(getAirportByCode(route.dest))
      }
    }
  }
  
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
      <Map
        routes={routes}
        getLatLong={getLatLong}
        handleMapClick={handleMapClick}/>
      <Select
        handleAirlineSelection={handleAirlineSelection}
        handleAirportSelection={handleAirportSelection}
        handleSelectReset={handleSelectReset}
        airlines={data.airlines}
        airports={getAirports()}
        allTitle="All Airlines"
        airline={airline}
        airport={airport}
        allowedAirports={allowedAirports}
        allowedAirlines={allowedAirlines}
      />
      <Table
        className="routes-table"
        columns={columns}
        rows={routes}
        format={formatValue}
        handleNext={nextPage}
        handlePrev={prevPage}
        page={page}
        airline={airline}
      />
    </section>
  </div>
  )
}

export default App;