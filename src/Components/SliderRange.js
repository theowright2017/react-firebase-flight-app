import React, {Component} from 'react'

import SortBy from './SortBy';
import Radio from './Radio';

class SliderRange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }
  }

  updateRange = (event) => {
    event.preventDefault();
    this.props.updateRange(event.target.value);
  }

  passprops = (e) => {
    e.preventDefault()
    this.props.radioReturn(e)
  }

  handleClassChange = (e) => {
    e.preventDefault();
    this.props.handleClassChange(e);
  }



  render(){

    const {range, priceRef, submitPrice,resetClick, classes } = this.props;


    return(
      <div >
      <div className="filter-bar">

      <div className="slider">
      <p>Filter for Prices Less Than: </p>
      <form onSubmit={submitPrice}>
        <input type="range" min="100" max="2500" value={range} step="200" onChange={this.updateRange} className="" id="" ref={priceRef}/>
        <span>{range}</span>
      </form>

      </div>



      <div className="sort-by">
        <SortBy classes={classes} handleClassChange={this.handleClassChange}/>
      </div>



      </div>

      <br />

      <div className="radio">
          <Radio resetclick={resetClick}  passprops={this.passprops}/>
      </div>

      </div>
    )
  }
};

export default SliderRange;
