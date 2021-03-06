import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';
import SearchPage from './pc_news_search';
import PCUserCenter from './pc_usercenter';
import ManagePanel_publish from './pc_managepanel';
import ManagePanel_inform from './pc_managepanel_inform';
import ManagePanel_users from './pc_managepanel_users';

import { Layout, Menu, Breadcrumb, Icon,message } from 'antd';
const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;
const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;

var content;

export default class PCIndex extends React.Component {


	constructor() {
		super();
		this.state = {
        collapsed: false,
			newsType: "1",
			currentPage:'index_page',
			searchType:'title',
			manageType:'publish',
			isManager:false,
			userId: '',
    };
		this.onCollapse = this.onCollapse.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	//点击处理
	handleClick(e){
		if(e.key == 'index_page'){	//点击首页新闻
			this.setState({newsType:'1',currentPage:'index_page'});
		}else if(e.key == 'keji_news'){
			this.setState({newsType:'1',currentPage:'index_page'});
		}else if(e.key == 'guoji_news'){
			this.setState({newsType:'6',currentPage:'index_page'});
		}else if(e.key == 'yule_news'){
			this.setState({newsType: '3',currentPage:'index_page'});
		}else if(e.key == 'tiyu_news'){
			this.setState({newsType: '4',currentPage:'index_page'});
		}else if(e.key == 'zhengzhi_news'){
			this.setState({newsType: '2',currentPage:'index_page'});
		}else if(e.key == 'caijing_news'){
			this.setState({newsType: '5',currentPage:'index_page'});
		}else if(e.key == 'search_page'){
			this.setState({currentPage:'search_page',searchType:'title'});
		}else if(e.key == 'search_by_title'){
			this.setState({currentPage:'search_page',searchType:'title'});
		}else if(e.key == 'search_by_time'){
			this.setState({currentPage:'search_page',searchType:'time'});
		}else if(e.key == 'search_by_tag'){
			this.setState({currentPage:'search_page',searchType:'tag'});
		}
		else if(e.key == 'usercenter_page'){
		 	this.setState({currentPage:'usercenter_page',userId: localStorage.userid})
		}
		else if(e.key == 'news_management'){
			this.setState({isManager:!this.state.isManager});//isManager: localStorage.useradmin
			if(this.state.isManager){
				message.info('进入管理员模式');
				localStorage.managerEnable = 1;
			}else{
				localStorage.managerEnable = 0;
				message.info('关闭管理员模式');
			}
		}else if(e.key == 'publish_news'){
			console.log('发布新闻');
			this.setState({currentPage: 'manage_page',manageType:'publish'});
		}else if(e.key == 'inform_deal'){
			console.log('举报处理');
			this.setState({currentPage: 'manage_page',manageType:'inform'});
		}else if(e.key == 'manage_users'){
			console.log('用户管理');
			this.setState({currentPage: 'manage_page',manageType:'users'});
		}
  }

	//缩放测菜单
  onCollapse(collapsed){
    this.setState({ collapsed: !this.state.collapsed });
  }

	render() {

		console.log(this.state.currentPage);
		if(this.state.currentPage == 'index_page'){
			content = <PCNewsContainer newsType = {this.state.newsType}></PCNewsContainer>;
		}else if(this.state.currentPage == 'search_page'){
			content = <SearchPage searchType = {this.state.searchType}></SearchPage>;
		}else if(this.state.currentPage == 'usercenter_page'){
    	content = <PCUserCenter userId = {localStorage.userid}></PCUserCenter>;
		}else if(this.state.currentPage == 'manage_page'){
			if(this.state.manageType == 'publish'){
                content = <ManagePanel_publish manageType = {this.state.manageType}></ManagePanel_publish>;
			}
			else if (this.state.manageType == 'inform') {
                content = <ManagePanel_inform manageType = {this.state.manageType}></ManagePanel_inform>;
			}
			else {
                content = <ManagePanel_users manageType = {this.state.manageType}></ManagePanel_users>;
			}
		}

		return (
			<div>
			<PCHeader theme="dark"></PCHeader>
			<Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
	          <Menu theme="dark" defaultSelectedKeys={['index_news']} mode="inline" onClick={this.handleClick}>
							<Menu.Item key="index_page">
								<Icon type="desktop" />
								<span>新闻首页</span>
							</Menu.Item>
							<SubMenu key="search_page" title={<span><Icon type="search" /><span>新闻搜索</span></span>}>
								<Menu.Item key="search_by_title">标题搜索</Menu.Item>
								<Menu.Item key="search_by_tag">标签搜索</Menu.Item>
								<Menu.Item key="search_by_time">时间搜索</Menu.Item>
	                         </SubMenu>
							 <SubMenu key="sub1" title={<span><Icon type="book" /><span>新闻分类</span></span>}>
								 <Menu.Item key="keji_news">科技</Menu.Item>
								 <Menu.Item key="zhengzhi_news">政治</Menu.Item>
								 <Menu.Item key="yule_news">娱乐</Menu.Item>
								 <Menu.Item key="tiyu_news">体育</Menu.Item>
								 <Menu.Item key="caijing_news">财经</Menu.Item>
								 <Menu.Item key="guoji_news">国际</Menu.Item>
								</SubMenu>
				        <Menu.Item key="usercenter_page">
								  <Icon type="user" />
								  <span>用户中心</span>
	              </Menu.Item>
	              <Menu.Item key="news_management">
								  <Icon type="setting" />
	                <span>新闻管理</span>
	              </Menu.Item>
                  <SubMenu key="manage_page" title={<span><Icon type="appstore-o" /><span>管理员界面</span></span>}>
                      <Menu.Item key="publish_news">发布新闻</Menu.Item>
                      <Menu.Item key="inform_deal">举报处理</Menu.Item>
                      <Menu.Item key="manage_users">用户管理</Menu.Item>
                  </SubMenu>

			  		</Menu>
        </Sider>
        <Layout>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>

            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				        {content}
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
