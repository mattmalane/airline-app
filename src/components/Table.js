import React from "react"

const Table = ({className,
                columns,
                rows,
                format,
                handleNext,
                handlePrev,
                page }) => {
  
  const getLastPage = () => {
    return rows.length / 25
  }

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
            rows.slice(page.firstRoute - 1, page.lastRoute).map(route => (
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
      <div>
        <p>Showing {page.firstRoute}-{page.lastRoute} of {rows.length} routes</p>
        {page.pageNumber === 1 && page.lastRoute < 25 &&
          <div>
            <button disabled>Prev Page</button>
            <button disabled>Next Page</button>
          </div>
        }
        {page.pageNumber === 1 && page.lastRoute >= 25 &&
          <div>
            <button disabled>Prev Page</button>
            <button onClick={handleNext}>Next Page</button>
          </div>
        }
        {
          page.pageNumber >= getLastPage() && page.lastRoute > 25 &&
          <div>
            <button onClick={handlePrev}>Prev Page</button>
            <button disabled>Next Page</button>
          </div>
        }
        {
          page.pageNumber !== 1 && page.pageNumber < getLastPage() &&
          <div>
            <button onClick={handlePrev}>Prev Page</button>
            <button onClick={handleNext}>Next Page</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Table
