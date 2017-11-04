var data = 'test string';

var HelloMessage = React.createClass({
  render: function() {
    return (
      <h1>Hello {this.props.name}! data is {data}</h1>
    )
  }
});