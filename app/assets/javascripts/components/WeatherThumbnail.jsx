class WeatherThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    this.props.handleClick(this.props.index);
  }

  render() {
    return (
      <div className="weather-thumbnail" onClick={this.click}>
        <h4>{this.props.date}</h4>
        <h2>{this.props.temp}°</h2>
      </div>
    );
  }
}
