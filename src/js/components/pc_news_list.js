import React from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin,Icon,Row,Col } from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

var listData =[];

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


export default class LoadMoreList extends React.Component {

  constructor() {
		super();
		this.state = {
			news: [],
      loading:true
		};
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		};

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
		this.props.type + "&count=" + this.props.count, myFetchOptions)
		.then((response) =>{
      return response.json();
    })
		.then((json)=>{
      for (var i = 1; i < json.length; i++) {
        var name = json[i].title;
        var temp = {};
        temp.title = json[i].title;
        temp.author_name = json[i].author_name;
        temp.href = json[i].url;
        temp.image = json[i].thumbnail_pic_s;
        temp.description = json[i].realtype;
        temp.content = '';
        temp.uniquekey = json[i].uniquekey;

        //console.log(temp);
        listData.push(temp);
      }
      //console.log(listData);
      this.setState({loading:false, news: json})
      //console.log('result',this.state.news);
    });

	};



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
        dataSource={listData}
        footer={<div></div>}
    renderItem={item => (
      <List.Item key={item.title}
          actions={[<IconText text={item.description} />, <IconText  text={item.author_name} />, <IconText  text="2" />]}
          extra={<img width={120} alt="logo" src={item.image} />}>
          <Link to={`details/${item.uniquekey}`} target="_blank">
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href={item.url}>{item.title}</a>}
          description = {item.title}/>
          </Link>
      </List.Item>
    )}
  />
    );
  }
}
