import React from 'react';
import marked from 'marked'
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import NewsCommentList from './pc_news_comment_list';
import { Layout, Menu, Breadcrumb,Card, Icon, Avatar,Rate,Tag,Divider,Popconfirm,message,Input,Modal,Button} from 'antd';
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { TextArea } = Input;


const InputGroup = Input.Group;
var commentList = [];
var newsTop;

var modalTitle = '';
var commentDefault = '';
var father_user_name = '';
var father_user_id = '';
var father_user_comment = '';
var submit_type = 'new_comment';
var comment_list = [];  //评论列表
var article_id = '';

export default class PCNewsDetails extends React.Component {

	constructor() {
		super();
		this.state = {
			newsID:'123456',
			newsTitle: '新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题',
			newsAuthor:'未知作者',
			newsID:'12344',
			newsDiscribe:'这是新闻概要就是觉得洛夫卡的撒娇的开发及分厘卡技术的拉法基拉萨酱豆腐了及独立董事咖啡机卢卡斯的经理反馈尽量扩大时间分厘卡机联发科老大就是浪费卡洛斯开发上的分厘卡机撒大反击大师傅大师傅航空基地建设',
			newsContent:'# 世界杯头球攻门占尽风头\n## 大脑会因此被破坏吗\n英格兰队在本届世界杯上取得了自1990年以来的最好成绩，**哈里·凯恩（Harry Kane，哈利·简尼）**和**哈里·马奎尔（Harry Maguire，麦佳亚/马古尼）**在不同比赛中的头球得分功不可没。' ,
			newsStar:4,
			newsType:'科技',
			newsTime:'2018-10-29',
			newsTagList:['计算机','人工智能','大数据'],
			newsHeat: 10000,
			editEnable:false,
			commentModalVisible:false,
			commentSubmitLoading:false,
		};
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);

		this.showModal = this.showModal.bind(this);
		this.handleCommentSubmitOk = this.handleCommentSubmitOk.bind(this);
		this.handleCommentSubmitCancel = this.handleCommentSubmitCancel.bind(this);
		this.handleChange = this.handleChange.bind(this);

	};

	showModal(){
		console.log('新闻评论');
		modalTitle = '编辑新闻评论：';
		father_user_comment = '遵守互联网行为准则，维护良好网络氛围，评论时请注意您的言论！';
		father_user_id = '';
		father_user_comment = '';
		commentDefault = '';
    this.setState({commentModalVisible: true});
  }

  handleCommentSubmitOk(){
      if(localStorage.hasLogined =='') {
          message("您未登录，不能发表评论！");
          return;
      }
      this.setState({ commentSubmitLoading: true });
      var temp = {};
  		temp.article_id = '1234';
  		temp.comment_id = '214324';
  		temp.user_id = '123342';
  		temp.user_name = "TOM";
  		temp.comment_timestamp = '2018-07-19 10:00';
  		temp.comment_mod_timestamp = '2018-07-19 11:00';
  		temp.comment_content = '流失大量解放拉萨地方距离';
  		temp.comment_karma = 21;
  		temp.is_karmaed = false;
  		temp.is_reply = false;
  		temp.father_comment_id = '12333';
  		temp.father_comment_content = '623445';
  		temp.father_comment_user = 'Jack';
			commentList.push(temp);

  		/*
  		var formData = this.props.form.getFieldsValue();
        const myRequest = new Request('/article/<' + this.props.uniquekey + '>/comment',
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
        });*/


    //网络通信响应完成之后，关闭loading和窗口，这里用延时模拟

      this.setState({ commentSubmitLoading: false, commentModalVisible: false });
  }

  handleCommentSubmitCancel(){
    this.setState({ commentModalVisible: false });
  }

	//取一条新闻
	componentDidMount() {
	//网络通信
        /*const myRequest = new Request('/article/<' + this.props.uniquekey +'>',
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
        if(localStorage.hasLogined =='') {
            message("您未登录，不能编辑新闻！");
            return;
        }
		if(this.state.editEnable){
			console.log('点击保存新闻编辑');
			message.info('保存成功');
			this.setState({editEnable:false});
            /*  var formData = this.props.form.getFieldsValue();
      console.log('新闻更新点击', e.key.slice(2));
      const myRequest = new Request('/article/<' + this.props.uniquekey + '>/edit',
          {
              method: 'POST',
              headers: new Headers({"Content-Type": "application/json"}),
              body: JSON.stringify({
                  'title': formData.update_title,
                  'desc': formData.update_desc,
                  'content': formData.update_content,
                  'author': formData.update_author,
                  'time': formData.update_time,
                  'category_id': formData.update_categoryID,
                  'tags': formData.update_taglist
              })
          });
      fetch(myRequest).then(response => {
          if (response.status === "200") {
              return response.json();
          }
          else {
              throw new Error('Something went wrong');
          }
      })
          .then(json => {
              console.log(json);
              if (json.result === 0) {
                  message.success("修改新闻成功！");
              }
              else {
                  message.warn("修改新闻失败！");
              }
          }).catch(error => {
          console.error(error);
      });*/

		}else{
			console.log('点击新闻编辑',e);
			message.info('进入新闻编辑模式');
			this.setState({editEnable:true});
		}

	}

	handleDeleteClick(e){
		console.log('点击新闻删除',e);
        if(localStorage.hasLogined =='') {
            message("您未登录，不能删除新闻！");
            return;
        }
        /* const myRequest = new Request('/article/<' + this.props.uniquekey + '>/delete',
         {
             method: 'POST',
             headers: new Headers({"Content-Type": "application/json"})
         });
     fetch(myRequest).then(response => {
         if (response.status === "200") {
             return response.json();
         }
         else {
             throw new Error('Something went wrong');
         }
     }).then(json => {
         console.log(json);
         if (json.result === 0) {
             message.success("删除新闻成功！");
         }
         else {
             message.warn("删除新闻失败！");
         }
     }).catch(error => {
         console.error(error);
     });*/
	}

	handleChange(value){
    this.setState({ value });
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
		temp.comment_karma = 21;
		temp.is_commented = false;
		temp.is_reply = false;
		temp.father_comment_id = '12333';
		temp.father_comment_content = '623445';
		temp.father_comment_user = 'Jack';
		commentList.push(temp);
		var temp1 = {};
		temp1.article_id = '1234';
		temp1.comment_id = '214325';
		temp1.user_id = '123456';
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
				[<Popconfirm placement="bottom" title={this.state.editEnable?'确认保存修改后的内容吗?':'确认进入新闻编辑模式吗？'} onConfirm={this.handleEditClick} okText="Yes" cancelText="No">
					<div><Icon type="edit" />&nbsp;&nbsp;&nbsp;{this.state.editEnable?'保存修改':'新闻编辑'}</div>
				</Popconfirm>
				,
				<Popconfirm placement="bottom" title='确认删除本新闻?' onConfirm={this.handleDeleteClick} okText="Yes" cancelText="No">
					<div><Icon type="delete" />&nbsp;&nbsp;&nbsp;新闻删除</div>
				</Popconfirm>]
			}>
				{
					this.state.editEnable
				?
				<div class = 'news-detail-card'>
				<Input placeholder = "请输入文章作者" defaultValue = {this.state.newsAuthor} size = 'large' style={{ width: 150 }}/>
				</div>
				:
				<div class = 'news-detail-card'>
					<Avatar style={{ backgroundColor: '#1E90FF', verticalAlign: 'middle' }} size="large">
					{this.state.newsAuthor}
					</Avatar>
					&nbsp;{this.state.newsAuthor}
				</div>
			}
				{
					this.state.editEnable
					?
					<div class = 'news-detail-description'><TextArea value={this.state.newsDiscribe}  cols="95" rows="6"/></div>
					:
					<p class = 'news-detail-description'>新闻概要:{this.state.newsDiscribe}</p>
				}
				{/*通信这里不返回概要*/}
			{
				this.state.editEnable
				?
				<div class = 'news-detail-info'>
				质量：<Rate allowHalf defaultValue={this.state.newsStar}/>	&nbsp;
				<Input addonBefore = "分类" placeholder = "请输入分类" defaultValue = {this.state.newsType} size = 'default' style={{ width: 200 }}/> &nbsp;
				标签：{this.state.newsTagList.map(tag => (<Input defaultValue = {tag} size = 'default' style={{ width: 80 }}/>))} &nbsp;
				浏览量：{this.state.newsHeat}	&nbsp;
				</div>
				:
				<div class = 'news-detail-info'>
					质量：<Rate disabled  defaultValue={this.state.newsStar}/>	&nbsp;
					分类：{this.state.newsType}	&nbsp;
					标签：
					{this.state.newsTagList.map(tag => (
						<Tag key={tag}>
							{tag}
						</Tag>  ))
					}		&nbsp;
					浏览量：{this.state.newsHeat}	&nbsp;

				</div>
			}
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
				{
					<p class = 'news-detail-description'>新闻概要:{this.state.newsDiscribe}</p>
				}
				<div class = 'news-detail-info'>
					质量：<Rate disabled  defaultValue={this.state.newsStar}/>	&nbsp;
					分类：{this.state.newsType}	&nbsp;
					标签：
					{this.state.newsTagList.map(tag => (
						<Tag key={tag}>
							{tag}
						</Tag>  ))
					}		&nbsp;
					浏览量：{this.state.newsHeat}	&nbsp;
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
				{
					this.state.editEnable
					?
					<div class  = 'news-detail-title-edit'><Input placeholder="请输入文章标题" defaultValue = {this.state.newsTitle} size = 'large'/></div>
					:
					<p class = 'news-detail-title'>{this.state.newsTitle}</p>
				}
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
							<div style={{ background: '#fff',  padding: 44, minHeight: 200 }}>
							{
								this.state.editEnable
								?
								<TextArea placeholder="请输入文章内容" defaultValue = {this.state.newsContent} cols="95" rows="10"/>
								:
								<div class="news-content">
									<div dangerouslySetInnerHTML = {{ __html: marked(this.state.newsContent) }}></div>
								</div>
							}
							<Divider class='comment_label'></Divider>
							<div class = 'content_bottom'>
									给这篇新闻打个分吧！<Rate onChange = {this.handleChange} defaultValue={0}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<a class = 'a' onClick={() => {this.showModal()}}>评论 ({commentList.length})</a>
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
								<NewsCommentList listData = {commentList} article_id = {this.state.newsID}></NewsCommentList>
							</div>
						</Col>
						<Col span={5}></Col>
					</Row>
		    </Content>
				<PCFooter></PCFooter>
  		</Layout>
			<Modal
					wrapClassName="vertical-center-modal"
					visible={this.state.commentModalVisible}
					title={modalTitle}
					onOk={this.handleOk}
					onCancel={this.handleCommentSubmitCancel}
					footer={[
						<Button key="back" onClick={this.handleCommentSubmitCancel}>退出</Button>,
						<Button key="submit" type="primary" loading={this.state.commentSubmitLoading} onClick={this.handleCommentSubmitOk}>
							提交评论
						</Button>,
					]}
				>
				<p>{father_user_comment}</p>
				<div><TextArea placeholder="评论请遵守互联网行为准则!" defaultValue = {commentDefault} rows={5}/></div>
			</Modal>

	  </div>
		);
	};
}
