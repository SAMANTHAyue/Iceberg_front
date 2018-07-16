import React from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin,Icon,Row,Col } from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import { Rate } from 'antd';
import { Tag } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


export default class NewsList extends React.Component {

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
        itemLayout="vertical"
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
      <List.Item key={item.title}
          actions={[
            <p>新闻指数：<Rate disabled allowHalf defaultValue={item.star}/></p>,
            <IconText text={item.type}/>,
            <p>标签：<Tag>{item.tag1}</Tag><Tag>{item.tag2}</Tag></p>
          ]}
          extra={<img width={120} alt="logo" src={item.image} />}>
          <Link to={`details/${item.uniquekey}`} target="_blank">
        <List.Item.Meta
          title={<a href={item.url}>{item.title}</a>}
          description = {item.title}/>
          </Link>

      </List.Item>

    )}
  />
    );
  }
}
