/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var App = __webpack_require__(2);

	React.render(React.createElement(App, { url: 'tasks.json', pollInterval: 2000 }), document.getElementById('app'));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var React = __webpack_require__(1);

	var TasksContainer = __webpack_require__(3);
	var DaysContainer = __webpack_require__(5);
	var AddTaskModal = __webpack_require__(7);
	var AddWorkModal = __webpack_require__(8);
	var RemoveTaskModal = __webpack_require__(9);
	var UpdateTaskModal = __webpack_require__(10);

	var App = React.createClass({
		displayName: 'App',

		getInitialState: function getInitialState() {
			return {
				tasks: [],
				days: [{ id: 1, name: 'monday' }, { id: 2, name: 'tuesday' }, { id: 3, name: 'wednesday' }, { id: 4, name: 'thursday' }, { id: 5, name: 'friday' }],
				work: []
			};
		},
		nextTaskId: function nextTaskId() {
			var usedIDs = this.state.tasks.map(function (task) {
				return task.id;
			});
			var num = 0;
			do {
				num = Math.floor(Math.random() * 1000);
			} while (usedIDs.indexOf(num) > -1);

			return num;
		},
		nextWorkId: function nextWorkId() {
			var usedIDs = this.state.work.map(function (work) {
				return work.id;
			});
			var num = 0;
			do {
				num = Math.floor(Math.random() * 1000);
			} while (usedIDs.indexOf(num) > -1);

			return num;
		},
		addTask: function addTask(inpName, inpHours) {
			var taskNameExists = this.state.tasks.filter(function (task) {
				return task.name == inpName;
			});

			var color = '';
			if (taskNameExists.length > 0) {
				color = taskNameExists[0].color;
			} else {
				color = this.randomColor(7);
			}

			var tasks = [].concat(_toConsumableArray(this.state.tasks), [{
				id: this.nextTaskId(),
				name: inpName,
				totalHours: inpHours,
				color: color
			}]);

			this.setState({ tasks: tasks, addingTask: undefined }, this.save);
		},
		randomColor: function randomColor(num) {
			var usedColors = this.state.tasks.map(function (task) {
				return task.color;
			});
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
		updateTask: function updateTask(taskId, inpName, inpHours) {
			var tasks = this.state.tasks.map(function (task) {
				return task.id !== taskId ? task : _extends({}, task, {
					name: inpName,
					totalHours: inpHours
				});
			});

			this.setState({ tasks: tasks, taskToUpdate: undefined }, this.save);
		},
		addWork: function addWork(taskId, dayId, inpHours, desc) {
			var work = [].concat(_toConsumableArray(this.state.work), [{
				id: this.nextWorkId(),
				taskId: parseInt(taskId),
				dayId: dayId,
				hours: parseInt(inpHours),
				desc: desc
			}]);

			this.setState({ work: work, dayToAddTo: undefined }, this.save);
		},
		removeWork: function removeWork(workId) {
			var works = this.state.work.filter(function (work) {
				return work.id != workId;
			});
			this.setState({ work: works }, this.save);
		},
		removeTask: function removeTask(taskId) {
			// remove task from task lists
			var tasks = this.state.tasks.filter(function (task) {
				return task.id != taskId;
			});

			// remove task-related work
			var newWork = this.state.work.filter(function (work) {
				return work.taskId != taskId;
			});

			this.setState({ tasks: tasks, work: newWork, taskToRemove: undefined }, this.save);
		},
		//Add Task Modal handlers
		showAddTaskModal: function showAddTaskModal() {
			this.setState({ addingTask: true });
		},
		hideAddTaskModal: function hideAddTaskModal() {
			this.setState({ addingTask: undefined });
		},

		//Remove Task Modal handlers
		showRemoveTaskModal: function showRemoveTaskModal(task) {
			this.setState({ taskToRemove: task });
		},
		hideRemoveTaskModal: function hideRemoveTaskModal() {
			this.setState({ taskToRemove: undefined });
		},

		//Add Work Modal handlers
		showAddWorkModal: function showAddWorkModal(dayId) {
			this.setState({ dayToAddTo: dayId });
		},
		hideAddWorkModal: function hideAddWorkModal() {
			this.setState({ dayToAddTo: undefined });
		},

		//Update Task Modal handlers
		showUpdateTaskModal: function showUpdateTaskModal(task) {
			this.setState({ taskToUpdate: task });
		},
		hideUpdateTaskModal: function hideUpdateTaskModal() {
			this.setState({ taskToUpdate: undefined });
		},

		loadData: function loadData() {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: (function (data) {
					this.setState({ tasks: data.tasks, work: data.work, days: data.days });
				}).bind(this),
				error: (function (xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		save: function save() {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				type: 'POST',
				data: { tasks: this.state.tasks, work: this.state.work, days: this.state.days },
				success: (function (data) {
					//this.setState({tasks: data.tasks, work: data.work, days: data.days});
					console.log('saved');
				}).bind(this),
				error: (function (xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		componentDidMount: function componentDidMount() {
			console.log("loaded");
			this.loadData();
			//setInterval(this.loadData, this.props.pollInterval);
		},

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(TasksContainer, { tasks: this.state.tasks, days: this.state.days, work: this.state.work, showAddModalFunction: this.showAddTaskModal, showUpdateModalFunction: this.showUpdateTaskModal, showRemoveModalFunction: this.showRemoveTaskModal, removeFunction: this.removeTask }),
				React.createElement(DaysContainer, { tasks: this.state.tasks, days: this.state.days, work: this.state.work, removeFunction: this.removeWork, showAddModalFunction: this.showAddWorkModal }),
				this.state.addingTask ? React.createElement(AddTaskModal, { clickFunction: this.addTask, hideModalFunction: this.hideAddTaskModal }) : null,
				this.state.taskToRemove ? React.createElement(RemoveTaskModal, { tasks: this.state.tasks, days: this.state.days, work: this.state.work, task: this.state.taskToRemove, removeFunction: this.removeTask, hideModalFunction: this.hideRemoveTaskModal }) : null,
				this.state.dayToAddTo ? React.createElement(AddWorkModal, { day: this.state.dayToAddTo, tasks: this.state.tasks, clickFunction: this.addWork, hideModalFunction: this.hideAddWorkModal }) : null,
				this.state.taskToUpdate ? React.createElement(UpdateTaskModal, { task: this.state.taskToUpdate, clickFunction: this.updateTask, hideModalFunction: this.hideUpdateTaskModal }) : null
			);
		}
	});

	module.exports = App;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var Task = __webpack_require__(4);

	var TasksContainer = React.createClass({
		displayName: 'TasksContainer',

		printTask: function printTask(task) {
			var usedHours = parseInt(0);
			var foundWork = this.props.work.filter(function (work) {
				return work.taskId == task.id;
			});

			$.each(foundWork, function (i, item) {
				usedHours += parseInt(item.hours);
			});
			return React.createElement(Task, { key: task.id,
				id: task.id,
				name: task.name,
				totalHours: task.totalHours,
				remHours: task.totalHours - usedHours,
				color: task.color,
				showRemoveModalFunction: this.props.showRemoveModalFunction,
				showUpdateModalFunction: this.props.showUpdateModalFunction });
		},
		render: function render() {
			var _this = this;

			return React.createElement(
				'div',
				{ className: 'taskContainer' },
				React.createElement(
					'button',
					{ onClick: function () {
							return _this.props.showAddModalFunction();
						} },
					'+'
				),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement(
					'ul',
					null,
					this.props.tasks.map(this.printTask)
				)
			);
		}
	});

	module.exports = TasksContainer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var Task = React.createClass({
		displayName: "Task",

		render: function render() {
			var _this = this;

			var cname = "taskName color" + this.props.color;
			return React.createElement(
				"li",
				{ className: cname },
				React.createElement(
					"span",
					null,
					this.props.name
				),
				React.createElement("br", null),
				React.createElement(
					"div",
					{ className: "buttons" },
					React.createElement(
						"button",
						{ onClick: function () {
								return _this.props.showUpdateModalFunction({ id: _this.props.id, name: _this.props.name, hours: _this.props.totalHours });
							} },
						"update"
					),
					React.createElement(
						"button",
						{ onClick: function () {
								return _this.props.showRemoveModalFunction({ id: _this.props.id, name: _this.props.name, hours: _this.props.totalHours });
							} },
						"-"
					)
				)
			);
		}
	});

	module.exports = Task;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var Day = __webpack_require__(6);

	var DaysContainer = React.createClass({
		displayName: 'DaysContainer',

		printDay: function printDay(day) {
			return React.createElement(Day, { key: day.id,
				id: day.id,
				name: day.name,
				tasks: this.props.tasks,
				work: this.props.work,
				showAddModalFunction: this.props.showAddModalFunction,
				removeFunction: this.props.removeFunction });
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'weekContainer' },
				React.createElement(
					'ul',
					{ className: 'weekList' },
					this.props.days.map(this.printDay)
				)
			);
		}
	});

	module.exports = DaysContainer;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var Day = React.createClass({
		displayName: "Day",

		getInitialState: function getInitialState() {
			return {
				liId: "test" + this.props.id
			};
		},
		groupWork: function groupWork(task) {
			var _this = this;

			var work = this.props.work.filter(function (w) {
				return w.taskId == task.id && w.dayId == _this.props.id;
			});
			if (work != null && work.length > 0) {
				var workSum = parseInt("0");
				$.each(work, function (i, item) {
					workSum += parseInt(item.hours);
				});

				var cname = "task color" + task.color + " hours" + workSum;
				return React.createElement(
					"li",
					{ key: task.id, className: cname },
					React.createElement(
						"h3",
						null,
						task.name,
						" | total: ",
						workSum
					),
					React.createElement(
						"ul",
						{ className: "workGroup", style: { display: 'none' } },
						work.map(this.printWork)
					)
				);
			} else {
				return null;
			}
		},
		printWork: function printWork(work) {
			var _this2 = this;

			return React.createElement(
				"li",
				{ key: work.id, className: "work" },
				work.desc,
				": ",
				work.hours,
				"h",
				React.createElement(
					"button",
					{ onClick: function () {
							return _this2.props.removeFunction(work.id);
						} },
					"-"
				)
			);
		},
		render: function render() {
			var _this3 = this;

			return React.createElement(
				"li",
				{ className: "day", id: this.state.liId },
				React.createElement(
					"h4",
					null,
					this.props.name
				),
				React.createElement(
					"button",
					{ onClick: function () {
							return _this3.props.showAddModalFunction(_this3.props.id);
						} },
					"add work"
				),
				React.createElement(
					"ul",
					{ className: "taskGroup" },
					this.props.tasks.map(this.groupWork)
				)
			);
		}
	});

	module.exports = Day;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var AddTaskModal = React.createClass({
		displayName: "AddTaskModal",

		handleChangeName: function handleChangeName(e) {
			this.setState({ inpName: e.target.value });
		},
		handleChangeHours: function handleChangeHours(e) {
			this.setState({ inpHours: e.target.value });
		},
		render: function render() {
			var _this = this;

			return React.createElement(
				"div",
				{ id: "AddTaskModal" },
				"name: ",
				React.createElement("input", { type: "text", onChange: this.handleChangeName }),
				"hours: ",
				React.createElement("input", { type: "text", onChange: this.handleChangeHours }),
				React.createElement(
					"button",
					{ onClick: function () {
							return _this.props.clickFunction(_this.state.inpName, _this.state.inpHours);
						} },
					"add"
				),
				React.createElement(
					"button",
					{ onClick: function () {
							return _this.props.hideModalFunction();
						} },
					"cancel"
				)
			);
		}
	});

	module.exports = AddTaskModal;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var AddWorkModal = React.createClass({
		displayName: "AddWorkModal",

		handleChangeTask: function handleChangeTask(e) {
			this.setState({ selectedTask: e.target.value });
		},
		handleChangeHours: function handleChangeHours(e) {
			this.setState({ inpHours: e.target.value });
		},
		handleChangeDesc: function handleChangeDesc(e) {
			this.setState({ inpDesc: e.target.value });
		},
		optionTasks: function optionTasks(task) {
			return React.createElement(
				"option",
				{ key: task.id, value: task.id },
				task.name
			);
		},
		addWork: function addWork() {
			this.props.clickFunction(this.state.selectedTask, this.props.day, this.state.inpHours, this.state.inpDesc);
		},
		render: function render() {
			var _this = this;

			return React.createElement(
				"div",
				{ id: "AddWorkModal" },
				React.createElement(
					"select",
					{ onChange: this.handleChangeTask },
					React.createElement(
						"option",
						null,
						"Choose a task"
					),
					this.props.tasks.map(this.optionTasks)
				),
				React.createElement("br", null),
				React.createElement("input", { type: "text", onChange: this.handleChangeHours, placeholder: "Hours" }),
				React.createElement("input", { type: "text", onChange: this.handleChangeDesc, placeholder: "Description" }),
				React.createElement(
					"button",
					{ onClick: function () {
							return _this.addWork();
						} },
					"add"
				),
				React.createElement(
					"button",
					{ onClick: function () {
							return _this.props.hideModalFunction();
						} },
					"cancel"
				)
			);
		}
	});

	module.exports = AddWorkModal;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var RemoveTaskModal = React.createClass({
		displayName: 'RemoveTaskModal',

		printModal: function printModal() {
			var _this = this;

			var foundWork = this.props.work.filter(function (work) {
				return work.taskId == _this.props.task.id;
			});
			var showWork = foundWork.length > 0 ? {} : { display: 'none' };

			return React.createElement(
				'div',
				{ id: 'RemoveTaskModal' },
				'Are you sure you want to remove this task?',
				React.createElement('br', null),
				React.createElement(
					'p',
					null,
					'task: ',
					this.props.task.name,
					' | hours: ',
					this.props.task.hours
				),
				React.createElement(
					'div',
					{ style: showWork },
					React.createElement(
						'p',
						null,
						'You will also delete the following work:'
					),
					foundWork.length > 0 ? foundWork.map(this.printWork) : null
				),
				React.createElement(
					'button',
					{ onClick: function () {
							return _this.props.removeFunction(_this.props.task.id);
						} },
					'yes'
				),
				React.createElement(
					'button',
					{ onClick: function () {
							return _this.props.hideModalFunction();
						} },
					'cancel'
				)
			);
		},
		printWork: function printWork(work) {
			var day = this.props.days.filter(function (day) {
				return day.id == work.dayId;
			});
			var dayName = '';
			if (day.length > 0) {
				dayName = day[0].name;
			}

			return React.createElement(
				'p',
				{ key: work.id },
				'day: ',
				dayName,
				' | hours: ',
				work.hours
			);
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				this.printModal()
			);
		}
	});

	module.exports = RemoveTaskModal;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var UpdateTaskModal = React.createClass({
		displayName: "UpdateTaskModal",

		componentWillMount: function componentWillMount() {
			this.setState({ name: this.props.task.name, hours: this.props.task.hours });
		},
		handleChangeName: function handleChangeName(e) {
			this.setState({ name: e.target.value });
		},
		handleChangeHours: function handleChangeHours(e) {
			this.setState({ hours: e.target.value });
		},
		render: function render() {
			var _this = this;

			return React.createElement(
				"div",
				{ id: "UpdateTaskModal" },
				"name: ",
				React.createElement("input", { type: "text", onChange: this.handleChangeName, defaultValue: this.state.name }),
				"hours: ",
				React.createElement("input", { type: "text", onChange: this.handleChangeHours, defaultValue: this.state.hours }),
				React.createElement(
					"button",
					{ onClick: function () {
							return _this.props.clickFunction(_this.props.task.id, _this.state.name, _this.state.hours);
						} },
					"update"
				),
				React.createElement(
					"button",
					{ onClick: function () {
							return _this.props.hideModalFunction();
						} },
					"cancel"
				)
			);
		}
	});

	module.exports = UpdateTaskModal;

/***/ })
/******/ ]);