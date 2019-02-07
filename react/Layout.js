import React, { Component } from 'react';
import Map from './map.js'
import RecordButton from './record_button.js'
import SubmitPersonForm from './submitPersonForm.js'


import {
  Layout, Tabs, Icon
} from 'antd';
const TabPane = Tabs.TabPane;

class App extends Component {
	render() {
		return (			
		<Layout>
			<Layout className="header">
        <img id="header_logo" />
			</Layout>
			<Tabs defaultActiveKey="record" tabPosition='left'>
    			<TabPane id = "record_tab" tab={<span><Icon type="message" /> Record </span>} key="record" >
					<RecordButton />
				  </TabPane>
    			<TabPane id="submit_tab" tab={<span ><Icon type="user-add" /> Add Person </span>} key="submit" >
    				<SubmitPersonForm />
    			</TabPane>
          		<TabPane id="map_tab" tab={<span ><Icon type="compass" /> Map </span>} key="map" >
          			<Map />
          		</TabPane>
  			</Tabs>,
		</Layout>
		);
	}
}

export default App;
