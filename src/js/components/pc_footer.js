import React from 'react';
import {Row, Col} from 'antd';
export default class PCFooter extends React.Component {

	render() {
		return (
			<footer>
			<Row>
			<Col span={10}></Col>
			<Col >
				<a href="/" class="footer">
					<img src="./static/src/images/logo.png" alt="logo"/>
					<span>ICEBERGNews</span>
				</a>
			</Col>
			<Col span={8}></Col>
			</Row>
				<Row>
					<Col span={2}></Col>
					<Col span={20} class="footer">
            &copy;&nbsp;2018 ICEBERG News. All Rights Reserved.
					</Col>
					<Col span={2}></Col>
				</Row>

			</footer>
		);
	};
}
