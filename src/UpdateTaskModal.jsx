var React = require('react');

var UpdateTaskModal = React.createClass({
	componentWillMount(){
		this.setState({name: this.props.task.name, hours: this.props.task.hours});
	},
    handleChangeName: function(e) {
        this.setState({ name: e.target.value });
    },
    handleChangeHours: function(e) {
        this.setState({ hours: e.target.value });
    },
	render() {

		return (<div id="UpdateTaskModal" >
				name: <input type="text" onChange={ this.handleChangeName } defaultValue={this.state.name}></input>
				hours: <input type="text" onChange={ this.handleChangeHours } defaultValue={this.state.hours}></input>
				<button onClick={() => this.props.clickFunction(this.props.task.id, this.state.name, this.state.hours)}>update</button>
				<button onClick={() => this.props.hideModalFunction()}>cancel</button>
			</div>)
	}
});

module.exports = UpdateTaskModal;