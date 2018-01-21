const weatherData = {
  location: "Portland",
  data: [
    {
      date: "11/04/2017",
      temp: 53,
    },
    {
      date: "11/05/2017",
      temp: 54,
    },
    {
      date: "11/06/2017",
      temp: 55,
    },
    {
      date: "11/07/2017",
      temp: 56,
    },
  ],
};

class WeatherBox extends React.Component {
  // constructor that gets API information
  constructor(props) {
    super(props);

    fetch(`http://api.wunderground.com/api/${props.weather_key}/forecast/q/OR/Portland.json`)
      .then(response => response.json())
      .then(json => console.log(json));

    this.state = {
      data: weatherData.data,
      activeIndex: 0,
      temperatureUnit: 'F',
    };

    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.handleConvertF = this.convertFahrenheit.bind(this);
    this.handleConvertC = this.convertCelsius.bind(this);
  }

  convertFahrenheit() {
    this.setState({temperatureUnit: 'F'})
  }

  convertCelsius() {
    this.setState({temperatureUnit: 'C'})
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
      data,
      activeIndex,
      temperatureUnit,
    } = this.state;
    return (
      <div>
        <h2>Weather</h2>
        <nav>navigation?</nav>
        <TemperatureUnitConverter tempUnit = {temperatureUnit} convertF = {this.handleConvertF} convertC = {this.handleConvertC} />
        <WeatherFeature date={data[activeIndex].date} temp={this.convertTemperatureUnit(data[activeIndex].temp)}/>
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
