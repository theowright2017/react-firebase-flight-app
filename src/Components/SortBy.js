import React, {Component} from 'react'

class SortBy extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  handleClassChange = (e) => {
    this.props.handleClassChange(e)
  }

  render(){

    let { classes } = this.props;

    let list = classes.map((item, index) => {
      return (
        <option value={item} key={index} >{item}</option>
      )
    })


    return(
      <div className="filter-bar">

        <form className="sort-form">
          <div className="classSelect">
            <span>select class</span>
              <select name="classSelect" onChange={this.handleClassChange} defaultValue="please choose" required>
                <option value="">Please choose class</option>
                {list}
              </select>
          </div>
        </form>
      </div>
    )
  }
};

export default SortBy;
