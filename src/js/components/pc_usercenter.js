import {
    Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Card,
    notification,
    Upload,
    Avatar
} from 'antd';
import React from 'react';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import NewsCommentList from './pc_news_comment_list';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


var commentList = [];
export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            intro: '',
            credit: '100',
            comments: '',
/*            previewImage: '',
            previewVisible: false*/
        };
    };

    componentDidMount() {
        const myRequest = new Request('/user/<'+this.props.userId+'>',
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
                this.setState({name: json.name, intro: json.intro, credit: json.credit, comments: json.comment_list});
                for (var i = 0; i < json.comment_list.length; i++) {
                    var temp = {};
                    temp.article_id = json.comment_list[i].article_id;
                    temp.comment_id = json.comment_list[i].comment_id;
                    temp.user_id = json.comment_list[i].user_id;
                    temp.user_name = json.comment_list[i].user_name;
                    temp.comment_timestamp = json.comment_list[i].comment_timestamp;
                    temp.comment_mod_timestamp = json.comment_list[i].comment_mod_timestamp;
                    temp.comment_content = json.comment_list[i].comment_content;
                    temp.comment_karma = json.comment_list[i].comment_karma;
                    temp.is_reply = json.comment_list[i].is_reply;
                    temp.father_comment_id = json.comment_list[i].father_comment_id;
                    temp.father_comment_content = json.comment_list[i].father_comment_content;
                    temp.father_comment_user = json.comment_list[i].father_comment_user;
                    commentList.push(temp);
                }
            }).catch(error => {
            console.error(error);
        });

    };
    render() {

        const {username,user_intro,user_credit} = this.state;

        return (
            <div>
                <Row>
                    <Col span={5}/>
                    <Col span={14}>
                        <Card>
                            {/* actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}>*/}
                            <div class='user-detail-card'>
                                <Avatar style={{backgroundColor: '#1E90FF', verticalAlign: 'middle'}} size="large">
                                    {/*{username.substring(0,1)}*/}
                                    Karl
                                </Avatar>
                                &nbsp;&nbsp;
                                {/*{username}*/}
                                Karl
                            </div>
                            <div class='user-detail-description'>
                                <br/>
                                信誉度
                                {/*{user_credit}*/}
                                <br/>
                                100
                                <br/><br/>
                                个人介绍
                                <br/>
                                {/*{user_intro}*/}
                                啦啦啦啦
                                <br/>
                            </div>
                        </Card>
                    </Col>
                    <Col span={5}/>
                </Row>
                <br/><br/><br/><br/>
                <Row>
                    <Col span={5}/>
                    <Col span={14}>
                        <div style={{background: '#fff', minHeight: 180}}>
                            <div class='comment_label'>全部评论</div>
                            <br/>
                            <NewsCommentList listData={commentList}/>
                        </div>
                    </Col>
                    <Col span={5}/>
                </Row>
            </div>
        );
    };
}

