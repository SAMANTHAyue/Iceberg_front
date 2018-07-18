import React from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin,Icon,Row,Col,Dropdown,Menu} from 'antd';
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
    this.newsDeleteClick = this.newsDeleteClick.bind(this);
    this.newsUpdateClick = this.newsUpdateClick.bind(this);
    this.newsLoadClick = this.newsLoadClick.bind(this);
	}

  //更改新闻类别，重新加载
  componentWillReceiveProps(){
    this.setState({loading:false});
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
        dataSource={this.props.listData}
        footer={<div></div>}
    renderItem={item => (
      <List.Item key={item.article_id}
          actions={[
            <p>质量:<Rate disabled allowHalf defaultValue={item.article_score}/></p>,
            <p>作者:{item.article_author}</p>,
            <p>分类:<IconText text={item.category}/></p>,
            <p>标签:{item.tag_list.map(tag => (
  						<Tag key={tag}>
  							{tag}
  						</Tag>))
           }
            </p>,

          <p>浏览量：{item.article_heat}</p>
          ]}
          extra={<div>
                    <img width={100} alt="logo" src='./src/images/logo.png'/>
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
                }
      >
          <Link to={`details/${item.article_id}`} target="_blank">
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
