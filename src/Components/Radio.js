import React, {Component} from 'react'

class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: ""
    }
  }

  handleChange = (e) => {

    this.props.passprops(e)
  }


  render(){

    return(

      <div>


      <div className="return">
      <form  >

        <input type="radio" name="RETURN" value="1"
          onChange={this.handleChange}/>
          <label >One Way</label>

        <input type="radio" name="RETURN" value="0" onChange={this.handleChange}/>
          <label >Return</label>


      </form>
      </div>

      </div>
    )
  }
};

export default Radio;
