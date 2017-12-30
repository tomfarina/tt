var React = require('react');

var Task = React.createClass({
	render() {
		var cname = "taskName color" + this.props.color;
		return (<li className={cname}><span>{this.props.name}</span><br/>
					<div className="buttons">
						<button onClick={() => this.props.showUpdateModalFunction({id: this.props.id, name: this.props.name, hours: this.props.totalHours})}>update</button>
						<button onClick={() => this.props.showRemoveModalFunction({id: this.props.id, name: this.props.name, hours: this.props.totalHours})}>-</button>
					</div>
				</li>)
	}
});

module.exports = Task;