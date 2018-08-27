import React, { Component } from 'react';
import Example from './Example/Example';
import Task from './Task/Task';

class ToDoList extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			example: this.props.example,
			toDo: [],
			taskTitle: '',
			taskTitleError: '',
			taskDescription: '',
			taskDescriptionError: '',
			errors: '',
			dailyLimit : '',
			search: '',
			transformed: false,
			appearanceExample: true,
			appearanceForm: true,
			isButtonDisabled: false
		}
	}
	
	buttonDeleteHandler = (index) => {
		const example = [...this.state.example];
        example.splice(index, 1);
        this.setState({
            example: example
        });

        if(this.state.example.length === 0) {
        	this.setState({
        		appearanceExample: false
        	})
        }

		const toDo = [...this.state.toDo];
        toDo.splice(index, 1);
        this.setState({
            toDo: toDo
        });
		
		if(this.state.toDo.length < 4) {
			this.setState({
				dailyLimit: ''
			})
		}

	}

	validate = () =>  {

		let isError = false;
    	const errors = {};

    	if(this.state.taskTitle.length < 5 || this.state.taskTitle.length > 20) {
    		isError = true;
    		errors.taskTitleError = 'Task name needs to be at least 5 and max 20 characters long';
    	} else {
    		errors.taskTitleError = '';
    	}

    	if(this.state.taskDescription.length < 15 || this.state.taskDescription.length > 80) {
    		isError = true;
    		errors.taskDescriptionError = 
    		'Task description needs to be at least 15 and max 80 characters long';
    	} else {
    		errors.taskDescriptionError = '';
    	}

    	if(this.state.toDo.length >= 3) {
    		isError = true;
    		errors.dailyLimit = 'You have reached a daily limit of 10 tasks per day';
    	} 
    	
    	if(isError){
    		this.setState({
    			...errors
    		})
    	}	
    	return isError;
    }

	submitHandler = (event) => {

        event.preventDefault();

        let id = Math.floor((Math.random() * 100) + 1);
        let taskTitle = this.state.taskTitle;
        let taskDescription = this.state.taskDescription;

        const err = this.validate();
    	
		if(err === false) {
			this.setState({
	        	toDo: this.state.toDo.concat({id, taskTitle, taskDescription}),
	        	taskTitle: '',
				taskTitleError: '',
				taskDescription: '',
				taskDescriptionError: ''
	        })
		} else if(this.state.toDo.length > 3) {
			    this.setState({
    				isButtonDisabled: true
    		})
		}
    }

    updatedSearch = (event) => {
		this.setState({
			search: event.target.value.substr(0, 20)
		})
	}

	transformationMagnifier = () => {
		this.setState({
			transformed: !this.state.transformed,
			search: ''
		})
	}

	render() {

		let filteredTasks = this.state.toDo.filter( task => {
				return task.taskTitle.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; 
			}
		);

		return(
			<main>
			{/*** Example list ***/}
				<div className="Example container-fluid">
					<div className="container">
						<div><h3>TO-DO-LIST EXAMPLE:</h3></div>
						<ul className="ExampleList">
							<p className={(this.state.appearanceExample ? 'appearanceExample' : '')}>Example list:</p>
		
								{this.state.example.map(
									(example, index) => {
										return (
											<Example 
												numeration={index + 1}
												example={example}
												key={example.id}
												clicked={this.buttonDeleteHandler.bind(this, index)}
											/>
										)
									}
								)}
						</ul>
					</div>
				</div>

				<div className="Triangle">
					<svg id="Layer_1" viewBox="0 0 1280 28.1">
						<polyline fill="#A8A7A7" points="0.1,0 1278.6,28.1 0.1,28.1 "/>
					</svg>

				</div>

			{/*** ToDoList ***/}
				<div className="Task container-fluid">
					<div className="container">
						<div><h3>TO-DO-LIST:</h3></div>
						
						<ul>
							{filteredTasks.map(
								(task, index) => {
									return (
										<Task 
											numeration={index + 1}
											task={task}
											key={task.id}
											clicked={this.buttonDeleteHandler.bind(this, index)}
										/>
									)
								}
							)}
						</ul>	

						<p className="Caution">Search for the task: </p>

					{/*** Search ***/}
						<input
							className={"Search" + (this.state.transformed === true ?
								 	' transformed' : '')} 
							type="text"
							placeholder={(this.state.transformed === true ? 
								 	'Search...' : "")}
							maxLength="20"
							value={this.state.search}
							onChange={this.updatedSearch.bind(this)}
							onClick={this.transformationMagnifier}
						/>	
						
						<p className="Caution">Pls. enter today's list, max. 10 tasks:</p>

						<form>
						{/* Notification daily limit */}
							<div className="DailyLimit">
								<span 
									className={"tooltiptext" + (this.state.dailyLimit === "You have reached a daily limit of 10 tasks per day" ?
								 	' visible' : '')}>{this.state.dailyLimit}</span>
							</div>

							<input 
								className="TaskTitle"
		                    	placeholder="Task Title" 
		                    	type="text" 
		                    	value={this.state.taskTitle}
		                    	onChange={event => this.setState({taskTitle: event.target.value})}
		                    />

		                {/* Notification taskTitleError */}
		                    <div className="TaskTitleError">
			                    <span 
									className={"tooltiptext" + (this.state.taskTitleError === "Task name needs to be at least 5 and max 20 characters long" ?
								 	' visible' : '')}>{this.state.taskTitleError}</span>
							</div>

		                    <textarea 
		                    	className={(this.state.taskTitleError === "Task name needs to be at least 5 and max 20 characters long" ?
								'shiftDown' : '')}
		                    	placeholder="Description" 
		                    	value={this.state.taskDescription}
		                    	rows="4"
		                    	cols="50"
		                    	onChange={event => this.setState({taskDescription: event.target.value})}
		                    />

		                {/* Notification taskDescriptionError */}
		                    <div className="TaskDescriptionError">
			                    <span 
								className={"tooltiptext" + (this.state.taskDescriptionError === "Task description needs to be at least 15 and max 80 characters long" ?
								 	' visible' : '')}>{this.state.taskDescriptionError}</span>
							</div>

							<button className={"Submit" + (this.state.taskDescriptionError === "Task description needs to be at least 15 and max 80 characters long" ?
								' shiftDown' : '')} 
								type="submit"
								disabled={this.state.isButtonDisabled} 
								onClick={event => this.submitHandler(event)}>Add a new Task</button>
						</form>
					</div>
				</div>
			</main>
		)
	}
}

export default ToDoList;