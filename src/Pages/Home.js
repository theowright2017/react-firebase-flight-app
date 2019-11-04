import React from "react"

import Hero from '../Components/Hero'
import Banner from '../Components/Banner'

import {Link} from 'react-router-dom'







function Home (props) {
  return (
  <Hero>
    <Banner title="Welcome to Flight Checker"
            subtitle="Click below to search for flights">
      <Link to="/search">
        Search!
      </Link>

    </Banner>
  </Hero>
  )
}

export default Home;
