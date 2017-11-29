var React = require('react');

var App = require('./App');

React.render(
  <App url="tasks.json" pollInterval={2000}/>,
  document.getElementById('app')
);
