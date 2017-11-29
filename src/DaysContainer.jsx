var React = require('react');

var Day = require('./Day');

var DaysContainer = React.createClass({
	printDay(day) {
		return (<Day key={day.id}
					 id={day.id}
					 name={day.name}
					 tasks={this.props.tasks}
					 work={this.props.work}
					 showAddModalFunction={this.props.showAddModalFunction}
					 removeFunction={this.props.removeFunction}>
		</Day>)
	},
	render() {
		return (<div id='weekList'>
					<ul>
						{this.props.days.map(this.printDay)}
					</ul>
			  </div>
		)
	}
});

module.exports = DaysContainer;