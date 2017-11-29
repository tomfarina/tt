var React = require('react');

var UpdateTaskModal = React.createClass({
	componentWillMount(){
		this.setState({name: this.props.task.name, hours: this.props.task.hours});
	},
	render() {

		return (<div id="UpdateTaskModal" >
				name: <input type="text" ref="newName" defaultValue={this.state.name}></input>
				hours: <input type="text" ref="newHours" defaultValue={this.state.hours}></input>
				<button onClick={() => this.props.clickFunction(this.props.task.id, this.refs.newName.value, this.refs.newHours.value)}>update</button>
				<button onClick={() => this.props.hideModalFunction()}>cancel</button>
			</div>)
	}
});

module.exports = UpdateTaskModal;