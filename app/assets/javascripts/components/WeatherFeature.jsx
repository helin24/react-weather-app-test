class WeatherFeature extends React.Component {
  render() {
    return (
      <div className="weather-feature">
        <h2>Today </h2>
        <h2>{this.props.date}</h2>
        <h1>{this.props.temp}°</h1>
      </div>
    );
  }
}
