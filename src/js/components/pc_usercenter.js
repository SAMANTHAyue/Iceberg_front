import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {
    Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Card,
    notification,
    Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import SearchPage from "./pc_news_search";
export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            intro: '',
            credit: '',
            comments: '',
/*            previewImage: '',
            previewVisible: false*/
        };
    };
    componentDidMount() {
        /*		var myFetchOptions = {
                    method: 'GET'
                };*/
        const myRequest = new Request('/user/<'+this.props.userId+'>',
                                       {method: 'GET',
                                           headers: new Headers({"Content-Type":"application/json"})});
        fetch(myRequest)
            .then(response=>{
                if(response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error("Something went wrong");
                }
            })
            .then(json=>{
                console.log(json);
                this.setState({name: json.name, intro: json.intro, credit: json.credit, comments: json.comments});
            }).catch(error => {
            console.error(error);
        });

    };
    render() {
/*        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            onPreview: (file) => {
                this.setState({previewImage: file.url, previewVisible: true});
            }
        };*/

        const {username,userintro,usercredit,usercomments} = this.state;
        const usercommentsList = usercomments.length ?
            usercomments.map((comment,index)=>(
                <Card key={index} title={`于 ${comment.timestamp} 评论了文章 ${comment.article_id}`} extra={<a target="_blank" href={`/article/${comment.article_id}`}>查看</a>}>
                    <p>{comment.comment_content}</p>
                </Card>
            ))
            :
            '您还没有发表过任何评论。';

        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="个人信息" key="1">
                                <div class="comment">
                                    <Row>
                                        <Col span={24}>
                                            用户姓名：{username}
                                            用户简介：{userintro}
                                            用户信誉度：{usercredit}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="评论列表" key="2">
                                <div class="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div class="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="预览" src={this.state.previewImage}/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}

