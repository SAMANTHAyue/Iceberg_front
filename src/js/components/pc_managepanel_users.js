import React from 'react';
import ReactDOM from 'react-dom';
import { Input,Row,Col ,message,Spin,Calendar,Form,Button} from 'antd';

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

    deleteClicked(e) {
        e.preventDefault();

        const myRequest = new Request('/user/<' + e.key + '>/delete',
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

        console.log('管理员界面');
        return (
            <div>
                <Row>
                    <Col span={7}></Col>
                    <Col span={12}>
                        <div>
                            {userList}
                        </div>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
        );
    }
}

export default  ManagePanel_users = Form.create()(ManagePanel_users);
