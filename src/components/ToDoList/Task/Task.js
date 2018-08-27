import React, { Component } from 'react';
import './Task.css';

class Task extends Component {
	
		constructor(props) {
		super(props)
		this.state = {
			toDoItemExist: this.props.toDoItemExist
		}
	}

	render() {
		return(
			<li className="Task-item">
				<p className="title"><span>{this.props.numeration}. </span>{this.props.task.taskTitle}</p>
				<p>{this.props.task.taskDescription}</p>
				<button className="animated" onClick={this.props.clicked}>
					<span className="bar1"></span>
				 	<span className="bar2"></span>
				</button>
			</li>
		)
	}
}

export default Task;