import React from 'react';
import {Row, Col} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'
class PCHeader extends React.Component {

    //初始化
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userName: '',
            password: '',
            userid: 0
        };
    };

    componentWillMount(){
        if (localStorage.userName!=='') {
            this.setState({hasLogined: true});
            this.setState({userName: localStorage.userName, password: localStorage.password});
        }
    };

    //更改登录注册框是否展示
    setModalVisible(value)
    {
        this.setState({modalVisible: value});
    };

    //点击注册登录按钮
    handleClick(e) {
        if (e.key === "register") {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            {
                this.setState({current: e.key});
            }
        }
    };

    //提交数据
    handleSubmit(e)
    {
        //页面开始向 API 进行提交数据
        e.preventDefault();
        /*       var myFetchOptions = {
                   method: 'GET'
               };*/

        //获取页面参数
        var formData = this.props.form.getFieldsValue();
        console.log(this.state.action);


        //网络通信
        if(this.state.action =='login') { //登录页面
            const myRequest = new Request('/login',
                                           {method: 'POST',
                                               headers: new Headers({"Content-Type":"application/json"}),
                                               body: JSON.stringify({name: formData.userName,password: formData.password})});
            fetch(myRequest)
                .then(response => {
                    if(response.status === "200") {
                        return response.json();
                    }
                    else {
                        throw new Error('Something went wrong');
                    }
                })	//对返回json进行格式化
                .then(json => {
                    console.log(json);
                    if(json.result === 0) {
                        //获取用户id
                        this.setState({userid: json.user.user_id});
                        localStorage.userid = this.state.userid;

                        this.setState({hasLogined:true});
                        message.success("登录成功！");
                        localStorage.userName = formData.userName;
                        localStorage.password = formData.password;
                    }
                    else if(json.result === 1) {
                        this.setState({userName: formData.userName});
                        message.warn("密码错误！");
                    }
                    else {
                        message.warn("用户名不存在！");
                    }
                }).catch(error => {
                console.error(error);
            });
        }
        else { //注册页面
          console.log('密码1',formData.r_password);
          console.log('密码2',formData.r_confirmPassword);r_confirmPassword
            if (formData.r_password == formData.r_confirmPassword) {
                const myRequest = new Request('/register',
                                               {method: 'POST',
                                                   headers: new Headers({"Content-Type":"application/json"}),
                                                   body: JSON.stringify({name: formData.r_userName,password: formData.r_password})});
                fetch(myRequest)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        }
                        else {
                            throw new Error("Something went wrong");
                        }
                    })	//对返回json进行格式化
                    .then(json => {
                        console.log(json);
                        if(json.result === 0) {
                            message.success("注册成功！");
                            localStorage.userName = formData.r_userName;
                            localStorage.password = formData.r_password;
                        }
                        else  {
                            this.setState({userName: formData.userName});
                            message.warn("用户名已存在！");
                        }
                    }).catch(error => {
                    console.error(error);
                });
            }
            else {
                message.warn("请重新确认你的密码。");
            }
        }

        this.setModalVisible(false);
    };


    callback(key) {
        if (key == "1") {
            this.setState({action: 'login'});
        } else if (key == "2") {
            this.setState({action: 'register'});
        }
    };

    //注销登录
    logout(){
        localStorage.userid= '';
        localStorage.userNickName = '';
        this.setState({hasLogined:false});
    };

    //渲染
    render() {
        //接收界面参数
        let {getFieldProps} = this.props.form;

        const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;


        //是否登录的的三元表达式
        const userShow = this.state.hasLogined
            ?<Menu.Item key="logout" class="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank" to={`/usercenter`}>
                    <Button type="dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :<Menu.Item key="register" class="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>;
        return (
            <header>
                <Row >
                    <Col span={16}>
                        <a href="/" class="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <div>
                                <span>ICEBERGNews</span>
                                <p>只服务于独立思考的人群</p>
                            </div>

                        </a>
                    </Col>
                    <Col>

                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)}>
                            {userShow}
                        </Menu>
                    </Col>
                </Row>


                <Modal title="登录/注册" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('userName',{rules: [{required: true, message: '账号不能为空！'}]})}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password',{rules: [{required: true, message: '密码不能为空！'}]})}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('r_userName',{rules: [{required: true, message: '账号不能为空！'}]})}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password',{rules: [{required: true, message: '密码不能为空！'}]})}/>
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword',{rules: [{required: true, message: '确认密码不能为空！'}]})}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </header>
        );
    };
}
export default PCHeader = Form.create({})(PCHeader);

// <Row>
// 	<Col span = {2}></Col>
// 	<Col span={20}>
// 		<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
// 			<Menu.Item key="top">
// 				<Icon type="appstore"/>头条
// 			</Menu.Item>
// 			<Menu.Item key="shehui">
// 				<Icon type="appstore"/>社会
// 			</Menu.Item>
// 			<Menu.Item key="guonei">
// 				<Icon type="appstore"/>国内
// 			</Menu.Item>
// 			<Menu.Item key="guoji">
// 				<Icon type="appstore"/>国际
// 			</Menu.Item>
// 			<Menu.Item key="yule">
// 				<Icon type="appstore"/>娱乐
// 			</Menu.Item>
// 			<Menu.Item key="tiyu">
// 				<Icon type="appstore"/>体育
// 			</Menu.Item>
// 			<Menu.Item key="keji">
// 				<Icon type="appstore"/>科技
// 			</Menu.Item>
// 			<Menu.Item key="shishang">
// 				<Icon type="appstore"/>时尚
// 			</Menu.Item>
// 		</Menu>
// 		</Col>
// 	<Col span={2}></Col>
// </Row>
