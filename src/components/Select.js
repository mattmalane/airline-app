import React from 'react'

const Select = ({ allTitle,
                  airlines,
                  airports,
                  handleAirlineSelection,
                  handleAirportSelection,
                  airline,
                  airport,
                  handleSelectReset,
                  allowedAirports,
                  allowedAirlines }) => {
  
  const handleChange = (e) => {
    handleAirlineSelection(e.target.value)
  }

  const handleAirportSelect = (e) => {
    handleAirportSelection(e.target.value)
  }

  const handleReset = () => {
    handleSelectReset()
  }

  return (
    <div>
      <label htmlFor="airline-select">Show routes on </label>
      <select
        onChange={handleChange}
        name="airlines"
        id="airline-select"
        value={airline}
      >
        <option value="">{allTitle}</option>
        {
          airlines.map(airline => {

            if (allowedAirlines.includes(airline.name) || allowedAirlines.length === 0) {
              return (
                <option
                  key={airline.name}
                  value={airline.name}
                >
                  {airline.name}
                </option>
              )
            }
            return (
              <option
                key={airline.name}
                value={airline.name}
                disabled
              >
                {airline.name}
              </option>
            )
          })
        }
      </select>
      <span>flying in or out of</span>
      <div>
      <select
        onChange={handleAirportSelect}
        name="airports"
        value={airport}
        >
        <option value="">All Airports</option>
        {
          airports.map((airport, idx)=> {
            
          if (allowedAirports.includes(airport) || allowedAirports.length === 0) {
            return (
              <option
                key={airport + idx}
                value={airport}
              >
                {airport}
              </option>
            )
          }
            return (
              <option
                key={airport + idx}
                value={airport}
                disabled
              >
                {airport}
              </option>
            )
          })
        }
      </select>
      <button onClick={handleReset}>Show All Routes</button>
      </div>
    </div>
  )
}

export default Select