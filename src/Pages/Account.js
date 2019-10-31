import React, {Component} from 'react'
import Banner from '../Components/Banner'

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  render(){
    return(
      <div>
        <Banner title="Click to access account">

          <button>Account</button>


        </Banner>



      </div>
    )
  }
};

export default Account;
