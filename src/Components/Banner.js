import React, {Component} from 'react'

function Banner ({children, title, subtitle}) {
  return (
    <div className="banner">

      <h1>{title}</h1>
      <div></div>
      <h3>{subtitle}</h3>
      {children}

    </div>
  )
}



export default Banner;
