import React, { Component } from 'react';
import {
  Form, Input, Button, Row, Col
} from 'antd';

class SubmitPersonForm extends Component{
render() {
	return (
		<Row>
			<Col span = {12}>
		 		<Form className="submit-form" id="register">
		    		<Form.Item>
		        		<Input placeholder="Name and Surname" id ='submit_name' style={{'width': 500}}/>
		    		</Form.Item>
		     		<Form.Item>
		        		<Input placeholder="Relationship" id="submit_relationship" style={{'width': 500}}/>
		       		</Form.Item>
		    		<Form.Item> 
		    			<input id="picture" type="file" class="login-input" placeholder="Upload a picture of you"/>
		   			</Form.Item>
		   			<Form.Item>
		               <button id="register_submit">Submit Person</button>   						
		   			</Form.Item>
		  		</Form>
  			</Col>
  			<Col span = {12}>
  				<div id = "submit_preview"></div>
  			</Col>
  		</Row>
    );
  }
}

export default SubmitPersonForm
