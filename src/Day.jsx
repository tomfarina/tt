var React = require('react');

var Day = React.createClass({
	getInitialState() {
		return {
			liId: "test" + this.props.id
		}
	},
	groupWork(task){
		var work = this.props.work.filter((w) => ((w.taskId == task.id) && (w.dayId == this.props.id)));
		if (work != null && work.length > 0){
			var workSum = parseInt("0");
			$.each(work, function(i, item){
				workSum += parseInt(item.hours);
			});

			var cname = "task color" + task.color + " hours" + workSum;
			return (<li key={task.id} className={cname}>
						<h3>{task.name} | total: {workSum}</h3>
						<ul className="workGroup" style={{display: 'none'}}>
							{work.map(this.printWork)}
						</ul>
					</li>)
		}
		else{
			return (null);
		}
	},
	printWork(work){
		return (<li key={work.id} className="work">
            	{work.desc}: {work.hours}h
					<button onClick={() => this.props.removeFunction(work.id)}>-</button>
				</li>)
	},
	render() {
		return (<li className="day" id={this.state.liId}>
					<h4>{this.props.name}</h4>
					<button onClick={() => this.props.showAddModalFunction(this.props.id)}>add work</button>

					<ul className="taskGroup">
						{this.props.tasks.map(this.groupWork)}
					</ul>
				</li>)
	}
});

module.exports = Day;