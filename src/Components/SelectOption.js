import React, {Component} from 'react'

class SelectOption extends Component {
constructor(props) {
  super(props);
}

render() {
  const item = this.props.item
  const mapName = this.props.mapName;
  const name = this.props.name;
  const selectName = this.props.selectName;
  const selectRef = this.props.selectRef;



    return(
      <div className="select-component">
      <span>{name}</span>
      <select name={selectName} ref={selectRef}>
        {mapName.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      </div>
    )
  }
};

export default SelectOption;
