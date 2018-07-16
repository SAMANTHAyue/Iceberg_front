import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;
const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;

export default class PCIndex extends React.Component {


	constructor() {
		super();
		this.state = {
      collapsed: false,
			newsType: "top"
    };
		this.onCollapse = this.onCollapse.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	//点击处理
	handleClick(e){
    console.log('click ', e);
		if(e.key == 'index_news'){	//点击首页新闻
			this.setState({newsType:'top'});
		}else if(e.key == 'guoji_news'){
			this.setState({newsType:'guoji'});
		}else if(e.key == 'yule_news'){
			this.setState({newsType: 'yule'});
		}else if(e.key == 'tiyu_news'){
			this.setState({newsType: 'tiyu'});
		}else if(e.key == 'zhengzhi_news'){
			this.setState({newsType: 'guonei'});
		}

		console.log(this.state.newsType);

  }

	//缩放测菜单
  onCollapse(collapsed){
    this.setState({ collapsed: !this.state.collapsed });
  }

	render() {
		return (
			<div>
			<PCHeader theme="dark"></PCHeader>
			<Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['index_news']} mode="inline" onClick={this.handleClick}>
						<Menu.Item key="index_news">
							<Icon type="desktop" />
							<span>新闻首页</span>
						</Menu.Item>
						<Menu.Item key="hot_news">
              <Icon type="pie-chart" />
              <span>热点新闻</span>
            </Menu.Item>
            <Menu.Item key="search_news">
              <Icon type="search" />
              <span>搜索新闻</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="book" /><span>新闻分类</span></span>}
            >
              <Menu.Item key="keji_news">科技</Menu.Item>
              <Menu.Item key="zhengzhi_news">政治</Menu.Item>
              <Menu.Item key="yule_news">娱乐</Menu.Item>
							<Menu.Item key="tiyu_news">体育</Menu.Item>
							<Menu.Item key="caijing_news">财经</Menu.Item>
							<Menu.Item key="guoji_news">国际</Menu.Item>

            </SubMenu>
            <Menu.Item key="sub2">
							<Icon type="user" />
							<span>用户中心</span>
            </Menu.Item>
            <Menu.Item key="11">
              <Icon type="setting" />
              <span>新闻管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>

            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <PCNewsContainer newsType = {this.state.newsType}></PCNewsContainer>
            </div>
          </Content>
          <PCFooter></PCFooter>
        </Layout>
      </Layout>
			</div>


		);
	};
}

// ReactDOM.render(
// 	<PCIndex/>, document.getElementById('mainContainer'));

// <div>
//
// 			<PCHeader></PCHeader>
// 			<PCNewsContainer></PCNewsContainer>
// 			<PCFooter></PCFooter>
//
// </div>

// <Menu
// 	theme="dark"
// 	mode="horizontal"
// 	defaultSelectedKeys={['2']}
// 	style={{ lineHeight: '64px' }}
// >
// 	<Menu.Item key="1">nav 1</Menu.Item>
// 	<Menu.Item key="2">nav 2</Menu.Item>
// 	<Menu.Item key="3">nav 3</Menu.Item>
// </Menu>
