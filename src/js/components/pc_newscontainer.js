import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_products';
import {List, Card } from 'antd';
import LoadMoreList from './pc_news_list';
export default class PCNewsContainer extends React.Component {


	constructor() {
		super();
		this.state = {
			newsType:"top"
		};
	};

	render() {

		return (
			<div>
				<Row>
					<Col >
						<div>
							<Carousel autoplay>
						    <div>
									<h3>Attitude determines altitude</h3>
								</div>
						    <div><h3>Attitude determines altitude</h3></div>
						    <div><h3>Attitude determines altitude</h3></div>
						    <div><h3>Attitude determines altitude</h3></div>
  						</Carousel>
						</div>
					</Col>
				</Row>
				<Row>
					<Col span={1}></Col>
					<Col span={21}>
						<LoadMoreList count={30} type={this.props.newsType}></LoadMoreList>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		);
	};
}

// <Col span={13}>
// 	<PCNewsImageBlock count={6} type="guoji" width="790px" cartTitle="国际头条" imageWidth="100px"/>
// </Col>
// <Col span={2}></Col>

// <Tabs class="tabs_product">
// 	<TabPane tab="ReactNews 产品" key="1">
// 		<PCProduct/>
// 	</TabPane>
// </Tabs>
//
// <div>
// 	<PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
// 	<PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
// </div>

// <Carousel {...settings}>
// 	<div><img src="./src/images/carousel_1.jpg"/></div>
// 	<div><img src="./src/images/carousel_2.jpg"/></div>
// 	<div><img src="./src/images/carousel_3.jpg"/></div>
// 	<div><img src="./src/images/carousel_4.jpg"/></div>
// </Carousel>

// <Row>
// 	<Col>
// 		<Tabs>
// 			<TabPane tab="头条新闻" key="1">
// 				<PCNewsBlock count={22} type="top" width="700px" bordered="false"/>
// 			</TabPane>
// 			<TabPane tab="国际" key="2">
// 				<PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
// 			</TabPane>
// 		</Tabs>
// 	</Col>
// 	<Col span={2}></Col>
// </Row>
