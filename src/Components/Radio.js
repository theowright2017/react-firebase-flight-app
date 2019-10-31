import React, {Component} from 'react'

class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: ""
    }
  }

  handleChange = (e) => {
    // this.setState({
    //   selection: e.target.value
    // })
    this.props.passprops(e)
  }


  render(){

    let { resetclick, radioReturn } = this.props;
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
