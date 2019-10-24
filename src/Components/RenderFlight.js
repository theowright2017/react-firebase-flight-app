import React from "react"


function RenderFlight (props) {

  let flights = props.flights


  return (
    <div>
      <ul>
        {flights.map((item, index) => (
          <li key={index}>{item.carrier}</li>

        ))}
      </ul>
    </div>
  )
}

export default RenderFlight;

//
// <ul>
//   {}
//   <li></li>
// </ul>
//
// {mapName.map((item, index) => (
//   <option key={index}>{item}</option>
// ))}
