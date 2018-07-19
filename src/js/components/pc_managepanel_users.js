import React from 'react';
import ReactDOM from 'react-dom';
import { Input,Row,Col ,message,Spin,Calendar,Form,Button,Divider,Dropdown,Menu,Icon} from 'antd';
import { List, Avatar } from 'antd';


const FormItem = Form.Item;
var userList = [];

class ManagePanel_users extends React.Component {
    constructor(){
        super();
        this.state = {
            hasDeleted: 1
        }
        this.deleteClicked = this.deleteClicked.bind(this);
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();

        const myRequest = new Request('/user/',
                                      {method: 'GET',
                                       headers: new Headers({"Content-Type":"application/json"})});
        fetch(myRequest)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error("Something went wrong");
                }
            })
            .then(json => {
                console.log(json);
                for (var i = 0; i < json.user_list.length; i++) {
                    var temp = {};
                    temp.user_id = json.user_list.user_id;
                    temp.user_name = json.user_list.user_name;
                    temp.user_intro = json.user_list.user_intro;
                    temp.user_credit = json.user_list.user_credit;
                    userList.push(temp);
                }
            }).catch(error => {
            console.error(error);
        });
    }

    deleteClicked(e, user_id) {
        message.info('删除用户成功');
        let {getFieldProps} = this.props.form;


        const myRequest = new Request('/user/<' + {user_id} + '>/delete',
                                      {method: 'GET',
                                       headers: new Headers({"Content-Type":"application/json"})});
        fetch(myRequest)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error("Something went wrong");
                }
            })
            .then(json => {
                console.log(json);
                userList.clear();
                for (var i = 0; i < json.user_list.length; i++) {
                    var temp = {};
                    temp.user_id = json.user_list.user_id;
                    temp.user_name = json.user_list.user_name;
                    temp.user_intro = json.user_list.user_intro;
                    temp.user_credit = json.user_list.user_credit;
                    userList.push(temp);
                }
            }).catch(error => {
            console.error(error);
        });
    }


    render() {
        let {getFieldProps} = this.props.form;
        var temp = {};
        temp.user_id = '123456';
        temp.user_name = 'Jack';
        temp.user_intro = '这是用户';
        temp.user_credit = 10;
        userList.push(temp);
        userList.push(temp);
        userList.push(temp);

        console.log('管理员界面');
        return (
            <div>
                <Row>
                    <Divider>用户管理</Divider>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <div>
                        <List
                          itemLayout="horizontal"
                          dataSource={userList}
                          renderItem={item => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: '#1E90FF', verticalAlign: 'middle' }} size="large">
                      					         {item.user_name}</Avatar>}
                                title={item.user_name}
                                description={item.user_intro}
                              />
                              <div>信誉度：{item.user_credit}</div>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              <div>
                                <div>
                                  <Dropdown overlay={ (
                                    <Menu>
                                      <Menu.Item key = 'delete_user' onClick={(e,user_id) => {this.deleteClicked(e, item.user_id)}}>删除用户</Menu.Item>
                                    </Menu>)}>
                                        <Button style={{ marginTop: 3,marginLeft:8 }}>
                                          用户管理<Icon type="down" />
                                        </Button>
                                  </Dropdown>
                                </div>
                              </div>

                            </List.Item>
                          )}/>
                        </div>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        );
    }
}

export default  ManagePanel_users = Form.create()(ManagePanel_users);
