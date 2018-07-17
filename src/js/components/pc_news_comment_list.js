import React from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin,Icon,Row,Col } from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import { Rate } from 'antd';
import { Tag } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 ,marginLeft: 8}} />
    {text}
  </span>
);


export default class NewsCommentList extends React.Component {

  constructor() {
		super();
		this.state = {
      loading:false,
		};
	}

  //更改新闻类别，重新加载
  componentWillReceiveProps(){
    this.setState({loading:false});
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
                {}楼
                <IconText type="like-o" text="156" />&nbsp;&nbsp;
                <IconText type="message" text="2" />&nbsp;&nbsp;&nbsp;&nbsp;
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
            <div class = 'news_comment_bottom'>
              <IconText type="like-o" text="156" />&nbsp;&nbsp;
              <IconText type="message" text="2" />&nbsp;&nbsp;&nbsp;&nbsp;
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
