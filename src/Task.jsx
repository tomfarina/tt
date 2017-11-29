var React = require('react');

var Task = React.createClass({
	render() {
		return (<li>{this.props.name} | total:{this.props.totalHours} | rem:{this.props.remHours} | color: {this.props.color}
			<button onClick={() => this.props.showUpdateModalFunction({id: this.props.id, name: this.props.name, hours: this.props.totalHours})}>update</button>
			<button onClick={() => this.props.showRemoveModalFunction({id: this.props.id, name: this.props.name, hours: this.props.totalHours})}>-</button></li>)
	}
});

module.exports = Task;