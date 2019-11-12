import React, {Component} from 'react'

class SelectOption extends Component {


render() {
  const mapName = this.props.mapName;
  const name = this.props.name;
  const selectName = this.props.selectName;
  const selectRef = this.props.selectRef;



    return(
      <div className={this.props.className}>
      <span>{name}</span>
      <select name={selectName} ref={selectRef} disabled={this.props.disabled}>
        {mapName.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      </div>
    )
  }
};

export default SelectOption;
