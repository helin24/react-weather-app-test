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
      activeIndex: 0,
    };

    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
  }

  handleThumbnailClick(index) {
    this.setState({activeIndex: index})
  }

  makeThumbnails() {
    var thumbnails = [];
    for(var i = 0; i < this.state.data.length; i++) {
      thumbnails.push(
        <WeatherThumbnail
          index={i}
          handleClick={this.handleThumbnailClick}
          date={this.state.data[i].date}
          temp={this.state.data[i].temp}
          key={i}
        />
      )
    }
    return <div className="weather-thumbnails">{thumbnails}</div>;
  }

  render() {
    const {
      data,
      activeIndex
    } = this.state;
    return (
      <div>
        <h2>Weather</h2>
        <nav>navigation?</nav>
        <WeatherFeature date={data[activeIndex].date} temp={data[activeIndex].temp}/>
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
