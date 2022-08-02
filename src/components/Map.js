import React from 'react'

const Map = ({ routes, getLatLong, handleMapClick }) => {

  const handleClick = (route) => {
    return handleMapClick(route)
  }

  return (
    <div>
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>

          {
            routes.map((route, idx) => {
              const srcCords = getLatLong(route.src)
              const destCords = getLatLong(route.dest)
              const {lat: y1, long: x1} = srcCords
              const {lat: y2, long: x2} = destCords
              
              return (
                <g key={route + idx}>
                  <circle onClick={handleClick(route)} className="source" cx={x1} cy={y1}>
                    <title></title>
                  </circle> 
                  <circle onClick={handleClick(route)} className="destination" cx={x2} cy={y2}>
                    <title></title>
                  </circle>
                  <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
                </g>
              )
            })
          }
        </g>
      </svg>
    </div>
  )
}

export default Map