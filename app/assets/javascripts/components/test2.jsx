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

    // make API call
    // .onReturn(apiReturn => {
      // this.state.data = apiReturn.data
    // })

    this.state = {
      data: weatherData.data,
    };
  }

  makeThumbnails() {
    var thumbnails = [];
    for(var i = 0; i < this.state.data.length; i++) {
      thumbnails.push(<WeatherThumbnail date={this.state.data[i].date} temp={this.state.data[i].temp} key={i}/>)
    }
    return <div className="weather-thumbnails">{thumbnails}</div>;
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Weather</h2>
        <nav>navigation?</nav>
        <WeatherFeature date={this.state.data[0].date} temp={this.state.data[0].temp}/>
        {this.makeThumbnails()}
      </div>
    );
  }
}

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

class WeatherThumbnail extends React.Component {
  render() {
    return (
      <div className="weather-thumbnail">
        <h4>{this.props.date}</h4>
        <h2>{this.props.temp}°</h2>
      </div>
    );
  }
}

//onChange handler set state
//need new state to hold active weather info / active index
//then onChange changes the active weather
//react rerenders when state changes
