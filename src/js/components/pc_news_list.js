import React from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin,Icon,Row,Col,Menu, Dropdown,message} from 'antd';
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
      loading:false,
      typeChange:true
		};
    this.newsDeleteClick = this.newsDeleteClick.bind(this);
    this.newsUpdateClick = this.newsUpdateClick.bind(this);
    this.newsLoadClick = this.newsLoadClick.bind(this);

	}

  componentWillMount(){


  }

  //更改新闻类别，重新加载
  componentWillReceiveProps(){
    listData=[];
    //this.setState({loading:false,typeChange:!this.state.typeChange});
      console.log('列表获取到的新闻类型',this.props.newsType);
      const myRequest = new Request('/',
          {   method: 'POST',
              headers: new Headers({"Content-Type": "application/json"}),
              body: JSON.stringify({action:'category',category_id:this.props.newsType})}
      );
      console.log({action:'category',category_id:this.props.newsType});
      fetch(myRequest)
          .then((response) => {
              if (response.status === 200) {
                  return response.json();
                  message.info('加载成功');
              }
              else {
                  message.info('加载失败');
                  throw new Error("Something went wrong");
              }
          })
          .then((json) => {
              console.log(json);
              listData=[];
              for (var i = 0; i < json.articles.length; i++) {
                  var temp = {};
                  temp.article_title = json.articles[i].article_title;
                  temp.article_author = json.articles[i].article_author;
                  temp.article_timestamp = json.articles[i].article_timestamp;
                  temp.href = json.articles[i].url;
                  temp.article_desc = json.articles[i].article_desc;
                  temp.article_id = json.articles[i].article_id;
                  temp.article_heat = json.articles[i].article_heat;
                  temp.article_score = json.articles[i].article_score;
                  temp.tag_list = json.articles[i].tag_list;
                  var category_id = json.articles[i].category_id;
                  if(category_id == 1){
                      temp.category = '科技';
                  }else if(category_id == 2){
                      temp.category = '政治';
                  }else if(category_id == 3){
                      temp.category = '娱乐';
                  }else if(category_id == 4){
                      temp.category = '体育';
                  }else if(category_id == 5){
                      temp.category = '财经';
                  }else if(category_id == 6){
                      temp.category = '国际';
                  }else {
                      temp.category = '未知';
                  }
                  listData.push(temp);
                  this.setState({typeChange:!this.state.typeChange});
              }
          }).catch(error => {
          console.error(error);
      });

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
      <List.Item key={item.article_id}
          actions={[
            <p>质量：<Rate disabled allowHalf defaultValue={item.article_score}/></p>,
            <p>作者：{item.article_author}</p>,
            <p>分类:<IconText text={item.category}/></p>,
            <p>标签：{item.tag_list.map(tag => (
  						<Tag key={tag}>
  							{tag}
  						</Tag>))
           }
            </p>,

          <p>浏览量：{item.article_heat}</p>,
          <p>时间：{item.article_timestamp}</p>
          ]}
          extra={<div>
                    <img width={110} alt="logo" src='./static/src/images/logo.png'/>
                    {
                      localStorage.managerEnable==1?
                      <div >
                        <Dropdown overlay={ (
                          <Menu>
                            <Menu.Item key={'1#'+item.article_id}  onClick={this.newsLoadClick}>查看新闻</Menu.Item>
                            <Menu.Item key={'2#'+item.article_id} onClick={this.newsDeleteClick}>删除新闻</Menu.Item>
                            <Menu.Item key={'3#'+item.article_id} onClick={this.newsUpdateClick}>修改新闻</Menu.Item>
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

          <Link to={`details/${item.article_id}`} article_id='1234' target="_blank">
          <List.Item.Meta
            title={item.article_title}
            description = {item.article_desc}/>
          </Link>

      </List.Item>

    )}
  />
    );
  }
}
