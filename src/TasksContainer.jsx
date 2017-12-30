var React = require('react');

var Task = require('./Task');

var TasksContainer = React.createClass({
	printTask(task) {
		var usedHours = parseInt(0);
		var foundWork = this.props.work.filter((work) => work.taskId == task.id)

		$.each(foundWork, function(i, item){
			usedHours += parseInt(item.hours);
		})
		return (<Task key={task.id}
					  id={task.id}
					  name={task.name}
					  totalHours={task.totalHours}
					  remHours={task.totalHours - usedHours}
					  color={task.color}
					  showRemoveModalFunction={this.props.showRemoveModalFunction}
					  showUpdateModalFunction={this.props.showUpdateModalFunction}>
		</Task>)
	},
	render() {
		return (<div className='taskContainer'>
					<button onClick={() => this.props.showAddModalFunction()}>+</button>
					<br/><br/><br/>

					<ul>{this.props.tasks.map(this.printTask)}</ul>
				</div>
		)
	}
});

module.exports = TasksContainer;