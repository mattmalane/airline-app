import React from "react"

const Table = ({className, columns, rows, format}) => {
  return (
  <div>
    <table className={className}>
      <thead>
        <tr>
          {
            columns.map((col, idx) => (
              <th key={idx}>{col.name}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          rows.map(route => (
            <tr key={route.airline + route.src + route.dest}>
              {
              columns.map((col, idx) => (
                <td key={idx}>
                  {format(col.property, route[col.property])}
                </td>
              ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  )
}

export default Table
