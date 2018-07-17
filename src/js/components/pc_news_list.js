import React from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin,Icon,Row,Col,Menu, Dropdown} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import { Rate } from 'antd';
import { Tag } from 'antd';

var listData =[];
var Managerment;
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
      loading:true,
      typeChange:true
		};
    this.newsDeleteClick = this.newsDeleteClick.bind(this);
    this.newsUpdateClick = this.newsUpdateClick.bind(this);
    this.newsLoadClick = this.newsLoadClick.bind(this);

	}

  //更改新闻类别，重新加载
  componentWillReceiveProps(){
    listData=[];
    this.setState({loading:true,typeChange:true});
  }

  newsDeleteClick(e){
    //e.key.slice(2)为新闻id
    console.log('新闻删除点击',e.key.slice(2));
  }

  newsUpdateClick(e){
    //e.key.slice(2)为新闻id
    console.log('新闻更新点击',e.key.slice(2));
  }

  newsLoadClick(e){
    //e.key.slice(2)为新闻id
    console.log('新闻查看点击',e.key.slice(2));
  }



  render() {
    if(this.state.typeChange==true){
      console.log('列表获取到的新闻类型',this.props.newsType);
      var myFetchOptions = {
        method: 'GET'
      };
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
      this.props.newsType + "&count=" + this.props.count, myFetchOptions)
      .then((response) =>{

        return response.json();

      })
      .then((json)=>{
        for (var i = 0; i < json.length; i++) {
          var name = json[i].title;
          var temp = {};
          temp.title = json[i].title;
          temp.author_name = '李白';
          temp.href = json[i].url;
          temp.type = '科技';
          temp.content = '我是简要介绍伺机待发的首府拉萨机砥砺风景啊上帝就发打算减肥啦就是大开可是大家阿凡达沙克范德萨激发了放进了口袋就是浪费科技撒赖咖啡碱阿斯弗送到家里都是卡就发了肯定就撒了开发深大路口设计的离开房间啊两款手机辐射拉到会计法刷卡机的风口浪尖开发了打算发的沙发了大家萨拉反抗军的撒的萨芬就打算昆仑剑法看来四大佛教按时灯笼裤飞机';
          temp.uniquekey = json[i].uniquekey;
          temp.newsID = '123244';
          temp.star = 4;
          temp.time = '2018-07-18 10:30';
          temp.tag1 = '科技';
          temp.tag2 = '艺术';
          temp.tag3 = '自媒体';
          //console.log(temp);
          listData.push(temp);
        }
        //console.log(listData);
        this.setState({loading:false, news: json, typeChange:false});
        //console.log('result',this.state.news);
      });
    }

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
          actions={[
            <p>新闻指数：<Rate disabled allowHalf defaultValue={item.star}/></p>,
            <p>分类:<IconText text={item.type}/></p>,
            <p>作者:<IconText text={item.author_name}/></p>,
            <p><IconText text={item.time}/></p>,
            <p>
              <div>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
                <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
              </div>
            </p>,
          ]}
          extra={<div>
                    <img width={110} alt="logo" src='./src/images/logo.png'/>
                    {
                      this.props.isManager?
                      <div ><Dropdown
                        overlay={ (
                        <Menu>
                          <Menu.Item key={'1#'+item.newsID}  onClick={this.newsLoadClick}>查看新闻</Menu.Item>
                          <Menu.Item key={'2#'+item.newsID} onClick={this.newsDeleteClick}>删除新闻</Menu.Item>
                          <Menu.Item key={'3#'+item.newsID} onClick={this.newsUpdateClick}>修改新闻</Menu.Item>
                        </Menu>
                      )}>
                              <Button style={{ marginTop: 3,marginLeft:8 }}>
                                新闻管理<Icon type="down" />
                              </Button>
                          </Dropdown>
                      </div>
                      :
                      <div></div>
                    }
                  </div>
                }>
                
          <Link to={`details/${item.uniquekey}`} target="_blank">
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href={item.url}>{item.title}</a>}
              description = {item.content}/>
          </Link>

      </List.Item>

    )}
  />
    );
  }
}
