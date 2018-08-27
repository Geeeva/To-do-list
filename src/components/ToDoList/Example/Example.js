import React, { Component } from 'react';
import './Example.css';

class Example extends Component {

	render() {
		return(
			<li className="Example-item">
				<p className='title'><span>{this.props.numeration}. </span>{this.props.example.name}</p>
				<p>{this.props.example.description}</p>
				<button className="animated" onClick={this.props.clicked}>
					<span className="bar1"></span>
				 	<span className="bar2"></span>
				</button>
			</li>
		)
	}
}

export default Example;