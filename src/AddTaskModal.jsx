var React = require('react');

var AddTaskModal = React.createClass({
	handleChangeName: function(e) {
		this.setState({ inpName: e.target.value });
	},
	handleChangeHours: function(e) {
		this.setState({ inpHours: e.target.value });
	},
	render() {
		return (<div id="AddTaskModal">
				  name: <input type="text" onChange={ this.handleChangeName }></input>
				  hours: <input type="text" onChange={ this.handleChangeHours }></input>
				  <button onClick={() => this.props.clickFunction(this.state.inpName, this.state.inpHours)}>add</button>
				  <button onClick={() => this.props.hideModalFunction()}>cancel</button>
			  </div>)
	}
});

module.exports = AddTaskModal;