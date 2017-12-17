class TemperatureUnitConverter extends React.Component {

  render() {
    return (
      <div className="temperature-unit-converter">
        <div className = {this.props.tempUnit == 'F'? 'active' : ''} onClick = {this.props.convertF}>°F</div>
        <div className = {this.props.tempUnit == 'C'? 'active' : ''} onClick = {this.props.convertC}>°C</div>
      </div>
    );
  }
}
