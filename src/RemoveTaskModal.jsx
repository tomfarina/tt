var React = require('react');

var RemoveTaskModal = React.createClass({
	printModal(){
		var foundWork = this.props.work.filter((work) => work.taskId == this.props.task.id);
		var showWork = foundWork.length > 0 ? {} : {display: 'none'};

		return (<div id="RemoveTaskModal">
				Are you sure you want to remove this task?<br/>
				<p>task: {this.props.task.name} | hours: {this.props.task.hours}</p>
				<div style={showWork}>
					<p>You will also delete the following work:</p>
					{foundWork.length > 0 ? foundWork.map(this.printWork) : null}
				</div>
				<button onClick={() => this.props.removeFunction(this.props.task.id)}>yes</button><button onClick={() => this.props.hideModalFunction()}>cancel</button>
			</div>)
	},
	printWork(work){
		var day = this.props.days.filter((day) => day.id == work.dayId);
		var dayName = '';
		if (day.length > 0){
			dayName = day[0].name;
		}

		return (<p key={work.id}>day: {dayName} | hours: {work.hours}</p>)
	},
	render() {
		return (<div>
				  {this.printModal()}
				</div>
		)

	}
});

module.exports = RemoveTaskModal;