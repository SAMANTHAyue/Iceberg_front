import React from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin,Icon,Row,Col,Popconfirm} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import { Rate } from 'antd';
import { Tag } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 6 ,marginLeft: 4}} />
    {text}
  </span>
);


export default class NewsCommentList extends React.Component {

  constructor() {
		super();
		this.state = {
      loading:false,
		};
    this.handleComplainClick = this.handleComplainClick.bind(this);
    this.handleKarmaClick = this.handleKarmaClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
	}

  //更改新闻类别，重新加载
  componentWillReceiveProps(){
    this.setState({loading:false});
  }

  handleComplainClick(e,comment_id){
    console.log('点击举报,id=',comment_id);

  }

  handleKarmaClick(e, comment_id){
    console.log('点击点赞,id=',comment_id);

  }
  handleEditClick(e,comment_id,comment_content){
    console.log('点击编辑,id=',comment_id);
  }
  handleDeleteClick(e,comment_id){
    console.log('点击删除,id=',comment_id);

  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        size="middle"
        loading={this.state.loading}
        bordered = "true"
        split="true"
        pagination={{
          onChange: (page) => {
            //console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={this.props.listData}
        footer={<div></div>}
    renderItem={item => (
      <List.Item key={item.user_id}>

        <div>
          {item.is_reply?
          <div>
            <div class='news_comment_father'>
            <div >
              引用@{item.father_comment_user}的评论：
            </div>
            <br/>
              <div >
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: '#f56a00'}} size = '{large}' >{item.father_comment_user.substring(0,1)}</Avatar>}
                  title={<a>{item.father_comment_user}</a>}
                  description={item.father_comment_content}/>
              </div>
            </div>
            <br/>
            <div>
              <div>
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: '#f56a00'}} size = '{large}' >{item.user_name.substring(0,1)}</Avatar>}
                  title={<a>{item.user_name}</a>}
                  description={item.comment_content}/>
              </div>
              <div class = 'news_comment_bottom'>
                <IconText type="like-o" text={item.comment_karma} />&nbsp;&nbsp;
                <IconText text='举报' />&nbsp;&nbsp;&nbsp;&nbsp;
                {item.comment_timestamp==''?item.comment_mod_timestamp:item.comment_timestamp}
              </div>
            </div>
          </div>
          :
          <div>
            <div>
              <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: '#f56a00'}} size = '{large}' >{item.user_name.substring(0,1)}</Avatar>}
                title={<a>{item.user_name}</a>}
                description={item.comment_content}/>
            </div>
            <div class = 'news_comment_bottom' >
              <a class = 'a' onClick={(e,comment_id) => {this.handleKarmaClick(e, item.comment_id)}}><IconText type="like-o" text={item.comment_karma} /></a>&nbsp;&nbsp;
              {
                localStorage.userid == item.user_id
                ?
                <Popconfirm placement="bottom" title='确定编辑本条评论？'
                  onConfirm={(e,comment_id,comment_content) => {this.handleEditClick(e, item.comment_id,item.comment_content)}} okText="Yes" cancelText="No">
                  <a class = 'a'><IconText text='编辑'/></a>
                </Popconfirm>
                :
                <Popconfirm placement="bottom" title='确定举报本条评论？'
                  onConfirm={(e,comment_id) => {this.handleComplainClick(e, item.comment_id)}} okText="Yes" cancelText="No">
                  <a class = 'a'><IconText text='举报'/></a>
                </Popconfirm>
              }
              {localStorage.userid == item.user_id || localStorage.managerEnable == '1'
                ?
                <Popconfirm placement="bottom" title='确定删除本条评论？'
                  onConfirm={(e,comment_id,comment_content) => {this.handleDeleteClick(e, item.comment_id)}} okText="Yes" cancelText="No">
                  <a class = 'a'><IconText text='删除'/></a>
                </Popconfirm>
                :
                <font></font>
              }
              &nbsp;&nbsp;&nbsp;&nbsp;
              {item.comment_timestamp==''?item.comment_mod_timestamp:item.comment_timestamp}
            </div>
          </div>}

        </div>
      </List.Item>

    )}
  />
    );
  }
}

//Math.round(Math.random()*10)
