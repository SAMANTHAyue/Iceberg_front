import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
export default class PCNewsBlock extends React.Component {

	constructor() {
		super();
		this.state = {
			news: ''
		};
	}
	//加载之前，请求新闻数据
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		//网络通信，获取新闻数据
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
		this.props.type + "&count=" + this.props.count, myFetchOptions)
		.then(response => response.json())
		.then(json => this.setState({news: json}));
	};

	//页面渲染
	render() {
		const {news} = this.state;
		const newsList = news.length
			? news.map((newsItem, index) => (
				<li key={index}>
					<Link to={`details/${newsItem.uniquekey}`} target="_blank">
						{newsItem.title}
					</Link>
				</li>
			))
			: '没有加载到任何新闻';

		return (
			<div class="topNewsList">
				<Card>
					<ul>
						{newsList}
					</ul>
				</Card>
			</div>
		);
	};
}
