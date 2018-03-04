class WeatherBox extends React.Component {
  // constructor that gets API information
  constructor(props) {
    super(props);

    this.fetchWeather();

    this.state = {
      activeIndex: 0,
      data: [],
      location: "Portland, OR",
      temperatureUnit: 'F',
    };

    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.handleConvertF = this.convertFahrenheit.bind(this);
    this.handleConvertC = this.convertCelsius.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  parseApiResponse(json) {
    const data = json.forecast.simpleforecast.forecastday;
    const parsedData = [];
    for (let i = 0; i < data.length; i++) {
      const unformattedDate = data[i].date.epoch * 1000;
      const formattedDate = (new Date(unformattedDate)).toDateString();
      const dataObject = {
        date: formattedDate,
        temp: data[i].high.fahrenheit,
      }
      parsedData.push(dataObject);
    }
    return parsedData;
  }

  convertFahrenheit() {
    this.setState({temperatureUnit: 'F'})
  }

  convertCelsius() {
    this.setState({temperatureUnit: 'C'})
  }

  fetchWeather(city = "Portland", state = "OR") {
    fetch(`http://api.wunderground.com/api/${this.props.weather_key}/forecast/q/${state}/${city}.json`)
      .then(response => response.json())
      .then(json => {
        const parsedApiResponse = this.parseApiResponse(json);
        this.setState({data: parsedApiResponse, location: `${city}, ${state}`})
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.location.value);
    const location = event.target.location.value.split(", ");
    const city = location[0];
    const state = location[1];
    this.fetchWeather(city, state);
  }

  convertTemperatureUnit(tempInF) {
    if (this.state.temperatureUnit == 'C') {
      return Math.round((tempInF - 32) * 5 / 9)
    }
    return tempInF;
  }

  handleThumbnailClick(index) {
    this.setState({activeIndex: index})
  }

  makeThumbnails() {
    const {
      data
    } = this.state
    var thumbnails = [];
    for(var i = 0; i < this.state.data.length; i++) {
      thumbnails.push(
        <WeatherThumbnail
          index={i}
          handleClick={this.handleThumbnailClick}
          date={data[i].date}
          temp={this.convertTemperatureUnit(data[i].temp)}
          key={i}
        />
      )
    }
    return <div className="weather-thumbnails">{thumbnails}</div>;
  }

  render() {
    const {
      activeIndex,
      data,
      location,
      temperatureUnit,
    } = this.state;
    return (
      <div>
        <h2>{location} Weather</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Location (eg. Portland, OR):
            <input type="text" name="location"></input>
          </label>
          <button type="submit">Submit</button>
        </form>
        <TemperatureUnitConverter tempUnit = {temperatureUnit} convertF = {this.handleConvertF} convertC = {this.handleConvertC} />
        {data.length &&
          <WeatherFeature date={data[activeIndex].date} temp={this.convertTemperatureUnit(data[activeIndex].temp)}/>
        }
        {this.makeThumbnails()}
      </div>
    );
  }
}

// Track when a thumbnail is clicked then do something
// In WeatherBox, track state to know which date to display
// default to first day, but be able to change
// change state in wheather feature based on what happens in weather
// thumbnail so need parent to hold that state

//onChange handler set state
//need new state to hold active weather info / active index
//then onChange changes the active weather
//react rerenders when state changes

// Next time?
// F/C conversion button
// possible to handle thumbnail onClick directly in parent?
