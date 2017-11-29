var React = require('react');

var AddWorkModal = React.createClass({
	handleChangeTask(e){
		this.setState({selectedTask: e.target.value});
	},
	handleChangeHours(e){
		this.setState({inpHours: e.target.value});
	},
	handleChangeDesc(e){
		this.setState({inpDesc: e.target.value});
	},
	optionTasks(task){
		return (<option key={task.id} value={task.id}>{task.name}</option>)
	},
	addWork(){
		this.props.clickFunction(this.state.selectedTask, this.props.day, this.state.inpHours, this.state.inpDesc);
	},
	render(){
		return (<div id="AddWorkModal">
					<select onChange={this.handleChangeTask}>
						<option>Choose a task</option>
						{this.props.tasks.map(this.optionTasks)}
					</select>
					<br/>
					<input type="text"  onChange={ this.handleChangeHours } placeholder="Hours"></input>
					<input type="text"  onChange={ this.handleChangeDesc } placeholder="Description"></input>
					<button onClick={() => this.addWork()}>add</button><button onClick={() => this.props.hideModalFunction()}>cancel</button>
				</div>)
	}
});

module.exports = AddWorkModal;