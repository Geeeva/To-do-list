import React, { Component } from 'react';
import './ScrollToTop.css';

class ScrollToTop extends Component {
    
    state = {
        intervalId: 0
    }

	scrollStep = () => {
        if (window.pageYOffset === 0) {
                clearInterval(this.state.intervalId);
            }
        window.scroll(0, window.pageYOffset - 50);
    }
  
    scrollToTop = () => {
        let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
            this.setState({ intervalId: intervalId });
    }

	render() {
		return(
			<button type="button" id="frame-wrapper" onClick={() => {this.scrollToTop()}}>
	            <span className="centered">Top</span>
	            <svg id="frame" viewBox="0 0 100 100">
					<path fill="#003547" d="M50-0.1c-27.6,0-50,22.4-50,50s22.4,50,50,50s50-22.4,50-50S77.6-0.1,50-0.1z M50,91.4
					c-22.9,0-41.5-18.6-41.5-41.5C8.5,26.9,27.1,8.4,50,8.4c22.9,0,41.5,18.6,41.5,41.5C91.5,72.8,72.9,91.4,50,91.4z"/>
				</svg>
	        </button>
		)
	}	
}

export default ScrollToTop;