import React, { Component } from 'react';

class RecordButton extends Component{
	render() {
		return (			
			<div>
			 	<ol style = {{ 'width': 400}}>
			 		<li>Press the Record button to start your recording</li>
			 		<li>Press it again to stop the recording and send it to the device.</li>
			 	</ol>			
				<div id="container">
					<input type="checkbox" id="btn"/>
					<label for="btn"></label>
				</div>
			</div>	
			);
	}
}

export default RecordButton

