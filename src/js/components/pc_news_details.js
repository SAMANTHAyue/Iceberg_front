import React from 'react';
import marked from 'marked'
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
			newsContent:marked('# Damage done\n\nDoes Donald Trump believe in ominous metaphors? As he affirmed his support for US intelligence agencies, the lights went to black in the White House conference room.\nOnce order was restored, he said he had been in the dark as to why a storm had swirled around his presidency since his Helsinki summit with Vladimir Putin. It was, he said, because he had misspoken.\nThat is going to be hard for many of the president\'s critics to swallow, however. Even if he did mean to say, \"I don\'t see a reason why it wouldn\'t be Russia\", it is a pretty weak way to confront the head of a nation accused of targeting the heart of American democracy.\nWhat is more, the context of the president\'s comments make a simple slip of the tongue seem less likely.\nAt the very least, the president gave his supporters some material to rally around.\nThe damage, however, has been done. Mr Trump can give as many White House statements as he likes, but on the biggest stage \- standing beside the Russian president - he fumbled. All the explanations cannot change that.'),
			newsStar:4,
			newsType:'科技',
			newsTime:'2018-10-29',
			newsTagList:['计算机','人工智能','大数据'],
			newsHeat: 10000
		};
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);

       /* this.commentAddClick = this.commentAddClick.bind(this);
        this.replyAddClick = this.replyAddClick.bind(this);
        this.updateCommentClick = this.updateCommentClick.bind(this);
        this.daleteCommentClick = this.deleteCommentClick.bind(this);*/


	};

	//取一条新闻
	componentDidMount() {
	//网络通信
        /*const myRequest = new Request('/article/<' + this.props.uniquekey,
            {
                method: 'GET',
                headers: new Headers({"Content-Type": "application/json"})
            });
        fetch(myRequest).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        }).then(json => {
            console.log(json);
            this.setState({
                newsID: json.article.article_id,
                newsType: json.article.category_id,
                newsTitle: json.article.article_title,
                newsContent: json.article.article_content,
                newsAuthor: json.article.article_author,
                newsTime: json.article.article_timestamp,
                newsStar: json.article.article_score,
                newsHeat: json.article.article_heat,
                newsTagList: json.article.tag_list,
                newsComments: json.article.comment_list
            })
            for (var i = 0; i < json.article.comment_list.length; i++) {
                var temp = {};
                temp.article_id = json.article.comment_list[i].article_id;
                temp.comment_id = json.article.comment_list[i].comment_id;
                temp.user_id = json.article.comment_list[i].user_id;
                temp.user_name = json.article.comment_list[i].user_name;
                temp.comment_timestamp = json.article.comment_list[i].comment_timestamp;
                temp.comment_mod_timestamp = json.article.comment_list[i].comment_mod_timestamp;
                temp.comment_content = json.article.comment_list[i].comment_content;
                temp.comment_karma = json.article.comment_list[i].comment_karma;
                temp.is_reply = json.article.comment_list[i].is_reply;
                temp.father_comment_id = json.article.comment_list[i].father_comment_id;
                temp.father_comment_content = json.article.comment_list[i].father_comment_content;
                temp.father_comment_user = json.article.comment_list[i].father_comment_user;
                commentList.push(temp);
            }
        }).catch(error => {
            console.error(error);
        });*/
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

    /*commentAddClick(e) {//添加评论
        //需要添加评论界面
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        const myRequest = new Request('/article/<' + this.props.uniquekey + '/comment',
            {
                method: 'POST',
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({'user_id': localStorage.userid, 'content': formData.add_comment})
            });
        fetch(myRequest).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        }).then(json => {
            console.log(json);
            commentList.clear();
            for (var i = 0; i < json.comments.length; i++) {
                var temp = {};
                temp.article_id = json.comments[i].article_id;
                temp.comment_id = json.comments[i].comment_id;
                temp.user_id = json.comments[i].user_id;
                temp.user_name = json.comments[i].user_name;
                temp.comment_timestamp = json.comments[i].comment_timestamp;
                temp.comment_mod_timestamp = json.comments[i].comment_mod_timestamp;
                temp.comment_content = json.comments[i].comment_content;
                temp.comment_karma = json.comments[i].comment_karma;
                temp.is_reply = json.comments[i].is_reply;
                temp.father_comment_id = json.comments[i].father_comment_id;
                temp.father_comment_content = json.comments[i].father_comment_content;
                temp.father_comment_user = json.comments[i].father_comment_user;
                commentList.push(temp);
            }
        }).catch(error => {
            console.error(error);
        });
    }
    replyAddClick(e) {//回复评论
        //需回复评论界面
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        const myRequest = new Request('/article/<' + this.props.uniquekey + key + '/comment',
            {
                method: 'POST',
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({'user_id': localStorage.userid, 'content': formData.add_reply_comment})
            });
        fetch(myRequest).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        }).then(json => {
            console.log(json);
            commentList.clear();
            for (var i = 0; i < json.comments.length; i++) {
                var temp = {};
                temp.article_id = json.comments[i].article_id;
                temp.comment_id = json.comments[i].comment_id;
                temp.user_id = json.comments[i].user_id;
                temp.user_name = json.comments[i].user_name;
                temp.comment_timestamp = json.comments[i].comment_timestamp;
                temp.comment_mod_timestamp = json.comments[i].comment_mod_timestamp;
                temp.comment_content = json.comments[i].comment_content;
                temp.comment_karma = json.comments[i].comment_karma;
                temp.is_reply = json.comments[i].is_reply;
                temp.father_comment_id = json.comments[i].father_comment_id;
                temp.father_comment_content = json.comments[i].father_comment_content;
                temp.father_comment_user = json.comments[i].father_comment_user;
                commentList.push(temp);
            }
        }).catch(error => {
            console.error(error);
        });
    }
    updateCommentClick(e) {//修改评论
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        const myRequest = new Request('/article/<' + this.props.uniquekey + key + '/edit',
            {
                method: 'POST',
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({'user_id': localStorage.userid, 'content': formData.update_comment})
            });
        fetch(myRequest).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        }).then(json => {
            console.log(json)
            var temp = {};
            temp.article_id = json.comments.article_id;
            temp.comment_id = json.comments.comment_id;
            temp.user_id = json.comments.user_id;
            temp.user_name = json.comments.user_name;
            temp.comment_timestamp = json.comments.comment_timestamp;
            temp.comment_mod_timestamp = json.comments.comment_mod_timestamp;
            temp.comment_content = json.comments.comment_content;
            temp.comment_karma = json.comments.comment_karma;
            temp.is_reply = json.comments.is_reply;
            temp.father_comment_id = json.comments.father_comment_id;
            temp.father_comment_content = json.comments.father_comment_content;
            temp.father_comment_user = json.comments.father_comment_user;
            for(var i=0;i<commentList.length;i++) {
                if(commentList[i].comment_id === temp.comment_id) {
                    commentList[i] = temp;
                }
            }
        }).catch(error => {
            console.error(error);
        });
    }
    daleteCommentClick(e){
        e.preventDefault();
        const myRequest = new Request('/article/<' + this.props.uniquekey + key + '/delete',
            {
                method: 'POST',
                headers: new Headers({"Content-Type": "application/json"})});
        fetch(myRequest).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        }).then(json => {
            console.log(json);
            if(json.result === 0) {
                message.success("删除成功！");
            }
            else {
                message.warn("删除失败！");
            }
        }).catch(error => {
            console.error(error);
        });
    }*/

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
		temp.comment_karma = 21;
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
		temp1.comment_karma = 23;
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
				{/*通信这里不返回概要*/}
				<div class = 'news-detail-info'>
					质量：<Rate allowHalf defaultValue={this.state.newsStar}/>	&nbsp;
					分类：{this.state.newsType}	&nbsp;
					浏览量：{this.state.newsHeat}	&nbsp;
					标签：
					{this.state.newsTagList.map(tag => (
						<Tag key={tag}>
							{tag}
						</Tag>  ))
					}		&nbsp;
					浏览量：{this.state.newsBrowseCount}	&nbsp;

				</div>
				<div class='news-detail-time'>时间：{this.state.newsTime}</div>
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
				</div> {/*通信这里不返回概要*/}
				<div class = 'news-detail-info'>
					质量：<Rate allowHalf defaultValue={this.state.newsStar}/>	&nbsp;
					分类：{this.state.newsType}	&nbsp;
					浏览量：{this.state.newsHeat}	&nbsp;
					标签：
					{this.state.newsTagList.map(tag => (
						<Tag key={tag}>
							{tag}
						</Tag>  ))
					}		&nbsp;
					浏览量：{this.state.newsBrowseCount}	&nbsp;
				</div>
				<div class='news-detail-time'>时间：{this.state.newsTime}</div>
			</Card>
			;
		}

		return (
			<div>
			<Layout className="layout">
				<PCHeader className="logo"></PCHeader>
				<br/><br/>
				<p class = 'news-detail-title'>{this.state.newsTitle}</p>
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
