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
			var workSum = 0;
			$.each(work, function(i, item){
				workSum += item.hours;
			});

			return (<div key={task.id}>
						<h3>{task.name} | total: {workSum}</h3>
						<ul>
							{work.map(this.printWork)}
						</ul>
					</div>)
		}
		else{
			return (null);
		}
	},
	printWork(work){
		return (<li key={work.id}>
					<p>id: {work.id} | hours: {work.hours} | desc: {work.desc}</p>
					<button onClick={() => this.props.removeFunction(work.id)}>-</button>
				</li>)
	},
	render() {
		return (<li id={this.state.liId} style={{display:'inline-block', padding: 10}}>
					<h4>{this.props.name}</h4>
					<button onClick={() => this.props.showAddModalFunction(this.props.id)}>add work</button>

					{this.props.tasks.map(this.groupWork)}
				</li>)
	}
});

module.exports = Day;