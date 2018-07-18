import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import NewsCommentList from './pc_news_comment_list';
import { Layout, Menu, Breadcrumb,Card, Icon, Avatar,Rate,Tag,Divider,Popconfirm,message } from 'antd';
const { Header, Content, Footer } = Layout;
const { Meta } = Card;

var commentList = [];
var newsTop;
export default class PCNewsDetails extends React.Component {

	constructor() {
		super();
		this.state = {
			newsID:'123456',
			newsTitle: '新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题',
			newsAuthor:'未知作者',
			newsID:'12344',
			newsDiscribe:'这是新闻概要就是觉得洛夫卡的撒娇的开发及分厘卡技术的拉法基拉萨酱豆腐了及独立董事咖啡机卢卡斯的经理反馈尽量扩大时间分厘卡机联发科老大就是浪费卡洛斯开发上的分厘卡机撒大反击大师傅大师傅航空基地建设',
			newsContent:'新闻正文,Markdown',
			newsStar:4,
			newsType:'科技',
			newsTime:'2018-10-29',
			newsTagList:['计算机','人工智能','大数据'],
			newsBrowseCount: 10000
		};
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);


	};

	//取一条新闻
	componentDidMount() {
	//网络通信
	// 	var myFetchOptions = {
	// 		method: 'GET'
	// 	};
	// 	fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
	// 		this.setState({newsItem: json});
	// 		document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
	// 	});
	// };
	// createMarkup() {
	// 	return {__html: this.state.newsItem.pagecontent};
	};


	handleEditClick(e){
		console.log('点击新闻编辑',e);
		message.info('进入新闻编辑模式');
	}

	handleDeleteClick(e){
		console.log('点击新闻删除',e);
		message.info('新闻已从数据库中删除');
	}

	render() {

		console.log(localStorage.managerEnable);

		var temp = {};
		temp.article_id = '1234';
		temp.comment_id = '214324';
		temp.user_id = '123342';
		temp.user_name = 'Tom';
		temp.comment_timestamp = '2018-07-19 10:00';
		temp.comment_mod_timestamp = '2018-07-19 11:00';
		temp.comment_content = '这个新闻写得真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！';
		temp.comment_karma = 213123;
		temp.is_reply = false;
		temp.father_comment_id = '12333';
		temp.father_comment_content = '623445';
		temp.father_comment_user = 'Jack';
		commentList.push(temp);
		var temp1 = {};
		temp1.article_id = '1234';
		temp1.comment_id = '214324';
		temp1.user_id = '123342';
		temp1.user_name = 'Tom';
		temp1.comment_timestamp = '2018-07-19 10:00';
		temp1.comment_mod_timestamp = '2018-07-19 11:00';
		temp1.comment_content = '这个新闻写得真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！真赞呀！';
		temp1.comment_karma = 213123;
		temp1.father_comment_id = '12333';
		temp1.father_comment_content = '623445';
		temp1.father_comment_user = 'Jack';
		temp1.is_reply = true;
		commentList.push(temp1);

		if(localStorage.managerEnable == '1'){
			newsTop =
			<Card actions={
				[<Popconfirm placement="bottom" title='确认进入新闻编辑模式吗？' onConfirm={this.handleEditClick} okText="Yes" cancelText="No">
					<div><Icon type="edit" />&nbsp;&nbsp;&nbsp;新闻编辑</div>
				</Popconfirm>
				,
				<Popconfirm placement="bottom" title='确认删除本新闻?' onConfirm={this.handleDeleteClick} okText="Yes" cancelText="No">
					<div><Icon type="delete" />&nbsp;&nbsp;&nbsp;新闻删除</div>
				</Popconfirm>]
			}>
				<div class = 'news-detail-card'>
					<Avatar style={{ backgroundColor: '#1E90FF', verticalAlign: 'middle' }} size="large">
					{this.state.newsAuthor}
					</Avatar>
					&nbsp;{this.state.newsAuthor}
				</div>
				<div class = 'news-detail-description'>
					新闻概要:{this.state.newsDiscribe}
				</div>
				<div class = 'news-detail-info'>
					质量：<Rate allowHalf defaultValue={this.state.newsStar}/>	&nbsp;
					分类：{this.state.newsType}	&nbsp;
					浏览量：{this.state.newsBrowseCount}	&nbsp;
					标签：
					{this.state.newsTagList.map(tag => (
						<Tag key={tag}>
							{tag}
						</Tag>
		))}		&nbsp;
					时间：{this.state.newsTime}
				</div>
			</Card>
			;
		}else{
			newsTop=
			<Card>
				<div class = 'news-detail-card'>
					<Avatar style={{ backgroundColor: '#1E90FF', verticalAlign: 'middle' }} size="large">
					{this.state.newsAuthor}
					</Avatar>
					&nbsp;{this.state.newsAuthor}
				</div>
				<div class = 'news-detail-description'>
					新闻概要:{this.state.newsDiscribe}
				</div>
				<div class = 'news-detail-info'>
					质量：<Rate allowHalf defaultValue={this.state.newsStar}/>	&nbsp;
					分类：{this.state.newsType}	&nbsp;
					浏览量：{this.state.newsBrowseCount}	&nbsp;
					标签：
					{this.state.newsTagList.map(tag => (
						<Tag key={tag}>
							{tag}
						</Tag>
		))}		&nbsp;
					时间：{this.state.newsTime}
				</div>
			</Card>
			;
		}

		return (
			<div>
			<Layout className="layout">
				<PCHeader className="logo"></PCHeader>
				<br/><br/>
				<p class = 'news-detial-title'>{this.state.newsTitle}</p>
				<Row>
					<Col span={5}></Col>
					<Col span={14}>
						{newsTop}
					</Col>
					<Col span={5}></Col>
				</Row>

				<br/><br/>

		    <Content style={{ padding: '0 0px' }}>
					<Row>
						<Col span={5}></Col>
						<Col span={14}>
		      		<div style={{ background: '#fff',  padding: 44, minHeight: 580 }}>
								{this.state.newsContent}
							</div>
						</Col>
						<Col span={5}></Col>
					</Row>
					<br/><br/>
					<Row>
						<Col span={5}></Col>
						<Col span={14}>
		      		<div style={{ background: '#fff',  padding: 44, minHeight: 180 }}>
								<Divider class='comment_label'>热门评论</Divider>
								<br/>
								<NewsCommentList listData = {commentList}></NewsCommentList>
							</div>
						</Col>
						<Col span={5}></Col>
					</Row>
		    </Content>
				<PCFooter></PCFooter>
  		</Layout>

				<Row>
				{/*<CommonComments uniquekey={this.props.params.uniquekey}/>*/}
				</Row>
			</div>
		);
	};
}
