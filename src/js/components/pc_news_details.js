import React from 'react';
import marked from 'marked'
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import NewsCommentList from './pc_news_comment_list';
import { Layout, Menu, Breadcrumb,Card, Icon, Avatar,Rate,Tag } from 'antd';
const { Header, Content, Footer } = Layout;
const { Meta } = Card;

var commentList = [];
export default class PCNewsDetails extends React.Component {

	constructor() {
		super();
		this.state = {
			newsID:'123456',
			newsTitle: '新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题',
			newsAuthor:'未知作者',
			newsID:'12344',
			newsDiscribe:'这是新闻概要就是觉得洛夫卡的撒娇的开发及分厘卡技术的拉法基拉萨酱豆腐了及独立董事咖啡机卢卡斯的经理反馈尽量扩大时间分厘卡机联发科老大就是浪费卡洛斯开发上的分厘卡机撒大反击大师傅大师傅航空基地建设',
			newsContent:marked('# Damage done\n\nDoes Donald Trump believe in ominous metaphors? As he affirmed his support for US intelligence agencies, the lights went to black in the White House conference room.\nOnce order was restored, he said he had been in the dark as to why a storm had swirled around his presidency since his Helsinki summit with Vladimir Putin. It was, he said, because he had misspoken.\nThat is going to be hard for many of the president\'s critics to swallow, however. Even if he did mean to say, \"I don\'t see a reason why it wouldn\'t be Russia\", it is a pretty weak way to confront the head of a nation accused of targeting the heart of American democracy.\nWhat is more, the context of the president\'s comments make a simple slip of the tongue seem less likely.\nAt the very least, the president gave his supporters some material to rally around.\nThe damage, however, has been done. Mr Trump can give as many White House statements as he likes, but on the biggest stage \- standing beside the Russian president - he fumbled. All the explanations cannot change that.'),
			newsStar:4,
			newsType:'科技',
			newsTime:'2018-10-29',
			newsTagList:['计算机','人工智能','大数据'],
			newsBrowseCount: 10000
		};
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
	render() {

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


		return (
			<div>
			<Layout className="layout">
				<PCHeader className="logo"></PCHeader>
				<br/><br/>
				<p class = 'news-detial-title'>{this.state.newsTitle}</p>
				<Row>
					<Col span={5}></Col>
					<Col span={14}>
					<Card
						actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}>
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
							新闻指数：<Rate disabled allowHalf defaultValue={this.state.newsStar}/>	&nbsp;
							分类：<a>{this.state.newsType}</a>	&nbsp;
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
					</Col>
					<Col span={5}></Col>
				</Row>

				<br/><br/>

		    <Content style={{ padding: '0 0px' }}>
					<Row>
						<Col span={5}></Col>
						<Col span={14}>
		      		<div style={{ background: '#fff',  padding: 44, minHeight: 580 }}>

							<div class="news-content"><div dangerouslySetInnerHTML = {{ __html:this.state.newsContent }}>
							</div>
							</div>
							</div>
						</Col>
						<Col span={5}></Col>
					</Row>
					<br/><br/>
					<Row>
						<Col span={5}></Col>
						<Col span={14}>
		      		<div style={{ background: '#fff',  padding: 44, minHeight: 180 }}>
								<div class='comment_label'>热门评论</div>
								<br/><br/>
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
