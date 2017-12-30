var React = require('react');

var TasksContainer = require('./TasksContainer');
var DaysContainer = require('./DaysContainer');
var AddTaskModal = require('./AddTaskModal');
var AddWorkModal = require('./AddWorKModal');
var RemoveTaskModal = require('./RemoveTaskModal');
var UpdateTaskModal = require('./UpdateTaskModal');


var App = React.createClass({
	getInitialState() {
		return {
			tasks: [],
			days: [{id: 1, name: 'monday'}, {id: 2, name: 'tuesday'}, {id: 3, name: 'wednesday'}, {id: 4, name: 'thursday'}, {id: 5, name: 'friday'}],
			work: []
		}
	},
    nextTaskId() {
        var usedIDs = this.state.tasks.map((task) => task.id);
        var num = 0;
		do{
			num = Math.floor(Math.random() * 1000)
		}
		while (usedIDs.indexOf(num) > -1);

		return num;
	},
	nextWorkId() {
        var usedIDs = this.state.work.map((work) => work.id);
        var num = 0;
        do{
            num = Math.floor(Math.random() * 1000)
        }
        while (usedIDs.indexOf(num) > -1);

        return num;
	},
	addTask(inpName, inpHours) {
		var taskNameExists = this.state.tasks.filter((task) => task.name == inpName);

		var color = '';
		if (taskNameExists.length > 0){
			color = taskNameExists[0].color;
		}
		else{
			color = this.randomColor(7);
		}

		var tasks = [
			...this.state.tasks,
			{
				id: this.nextTaskId(),
				name: inpName,
				totalHours: inpHours,
				color: color
			}
		];

		this.setState({tasks: tasks, addingTask: undefined}, this.save);
	},
	randomColor(num){
		var usedColors = this.state.tasks.map((task) => task.color);
        var uniqueRandoms = [];

        // refill the array, minus used ones
		for (var i = 0; i < num; i++) {
            if (usedColors.indexOf(i) < 0) {
                uniqueRandoms.push(i);
            }
        }

        var index = Math.floor(Math.random() * uniqueRandoms.length);
        var val = uniqueRandoms[index];

		// assign num to actual color here
		return val;
	},
	updateTask(taskId, inpName, inpHours){
		var tasks = this.state.tasks.map(
			task => (task.id !== taskId) ?
			  task :
				{
				  ...task,
				  name: inpName,
				  totalHours: inpHours
				}
		);

		this.setState({tasks: tasks, taskToUpdate: undefined}, this.save);
	},
	addWork(taskId, dayId, inpHours, desc) {
		var work = [
			  ...this.state.work,
			  {
				id: this.nextWorkId(),
				taskId: parseInt(taskId),
				dayId: dayId,
				hours: parseInt(inpHours),
				desc: desc
			  }
		];

		this.setState({work: work, dayToAddTo: undefined}, this.save);
	},
	removeWork(workId){
		var works = this.state.work.filter((work) => work.id != workId);
		this.setState({work: works}, this.save);
	},
	removeTask(taskId){
		// remove task from task lists
		var tasks = this.state.tasks.filter((task) => task.id != taskId);

		// remove task-related work
		var newWork = this.state.work.filter((work) => work.taskId != taskId);

		this.setState({tasks: tasks, work: newWork, taskToRemove: undefined}, this.save);
	},
	//Add Task Modal handlers
	showAddTaskModal(){
		this.setState({addingTask: true});
	},
	hideAddTaskModal(){
		this.setState({addingTask: undefined});
	},

	//Remove Task Modal handlers
	showRemoveTaskModal(task){
		this.setState({taskToRemove: task});
	},
	hideRemoveTaskModal(){
		this.setState({taskToRemove: undefined});
	},

	//Add Work Modal handlers
	showAddWorkModal(dayId){
		this.setState({dayToAddTo: dayId});
	},
	hideAddWorkModal(){
		this.setState({dayToAddTo: undefined});
	},

	//Update Task Modal handlers
	showUpdateTaskModal(task){
		this.setState({taskToUpdate: task});
	},
	hideUpdateTaskModal(){
		this.setState({taskToUpdate: undefined});
	},

	loadData: function() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({tasks: data.tasks, work: data.work, days: data.days});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	  save: function() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: {tasks: this.state.tasks, work: this.state.work, days: this.state.days},
	      success: function(data) {
	        //this.setState({tasks: data.tasks, work: data.work, days: data.days});
					console.log('saved');
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	  componentDidMount: function() {
		console.log("loaded");
	    this.loadData();
	    //setInterval(this.loadData, this.props.pollInterval);
	  },

	render() {
		return (<div>
			<TasksContainer tasks={this.state.tasks} days={this.state.days} work={this.state.work} showAddModalFunction={this.showAddTaskModal} showUpdateModalFunction={this.showUpdateTaskModal} showRemoveModalFunction={this.showRemoveTaskModal} removeFunction={this.removeTask}/>
			<DaysContainer tasks={this.state.tasks} days={this.state.days} work={this.state.work} removeFunction={this.removeWork} showAddModalFunction={this.showAddWorkModal}/>

			{this.state.addingTask ? <AddTaskModal clickFunction={this.addTask} hideModalFunction={this.hideAddTaskModal}/> : null }
			{this.state.taskToRemove ? <RemoveTaskModal tasks={this.state.tasks} days={this.state.days} work={this.state.work} task={this.state.taskToRemove} removeFunction={this.removeTask} hideModalFunction={this.hideRemoveTaskModal}/> : null}
			{this.state.dayToAddTo ? <AddWorkModal day={this.state.dayToAddTo} tasks={this.state.tasks} clickFunction={this.addWork} hideModalFunction={this.hideAddWorkModal}/> : null}
			{this.state.taskToUpdate ? <UpdateTaskModal task={this.state.taskToUpdate} clickFunction={this.updateTask} hideModalFunction={this.hideUpdateTaskModal}/> : null}
		</div>)
	}
});

module.exports = App;
