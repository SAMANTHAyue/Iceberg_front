import React from 'react';
import ReactDOM from 'react-dom';
import {List, Avatar, Button, Spin, Icon, Row, Col, Popconfirm, message, Modal, Input} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import {Rate} from 'antd';
import {Tag} from 'antd';

const {TextArea} = Input;
const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 6, marginLeft: 4}}/>
        {text}
  </span>
);

var modalTitle = '';
var commentDefault = '';
var comment_user = '';
var comment_id = '';
var comment_content = '';
var submit_type = 'new_comment';
var article_id = '';

export default class NewsCommentList extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            commentModalVisible: false,
            commentSubmitLoading: false,
            can_comment: true
        };
        this.handleComplainClick = this.handleComplainClick.bind(this);
        this.handleKarmaClick = this.handleKarmaClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.showModal1 = this.showModal1.bind(this);
        this.handleCommentSubmitOk = this.handleCommentSubmitOk.bind(this);
        this.handleCommentSubmitCancel = this.handleCommentSubmitCancel.bind(this);
    }

    componentWillMount() {

    }

    showModal1(father_comment_id, father_comment_user, father_comment_content, type) {
        submit_type = type;
        if (type == 'reference_comment') {
            console.log('引用评论');
            modalTitle = '引用@' + father_comment_user + '的评论:';
            comment_user = father_comment_user;
            comment_id = father_comment_id;
            comment_content = father_comment_content;
            commentDefault = '';
        } else if (type == 'edit_comment') {
            modalTitle = '修改您的评论：';
            comment_content = '遵守互联网行为准则，维护良好网络氛围，评论时请注意您的言论！';
            comment_user = father_comment_user;
            comment_id = father_comment_id;
            commentDefault = father_comment_content;
        } else {
            return;
        }
        this.setState({commentModalVisible: true});
    }

    handleCommentSubmitOk(comment_id) {
        this.setState({commentSubmitLoading: true});

        if (localStorage.userid == '') {
            message.info("您未登录，不能发表评论！");
            return;
        }

        if (submit_type == 'edit_comment') {
            this.setState({loading: true});
            var formData = this.props.form.getFieldsValue();
            const myRequest = new Request('/',
                {
                    method: 'POST',
                    headers: new Headers({"Content-Type": "application/json"}),
                    body: JSON.stringify({
                        action: 'edit_article',
                        user_id: localStorage.userid,
                        article_id: this.props.article_id,
                        comment_id: comment_id,
                        content: formData.comment
                    })
                });
            console.log({
                action: 'edit_article',
                user_id: localStorage.userid,
                article_id: this.props.article_id,
                comment_id: comment_id,
                content: formData.comment
            });
            fetch(myRequest).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error("Something went wrong");
                }
            }).then(json => {
                console.log(json);
                commentList=[];
                for (var i = 0; i < json.comments.length; i++) {
                    var temp = {};
                    temp.article_id = json.comments[i].article_id;
                    temp.comment_id = json.comments[i].comment_id;
                    temp.user_id = json.comments[i].user_id;
                    temp.user_name = json.comments[i].user_name;
                    temp.comment_timestamp = json.comments[i].comment_timestamp;
                    temp.comment_mod_timestamp = json.comments[i].comment_mod_timestamp;
                    temp.comment_content = json.comments[i].comment_content;
                    temp.comment_karma = json.comments[i].comment_karma;
                    temp.is_reply = json.comments[i].is_reply;
                    temp.father_comment_id = json.comments[i].father_comment_id;
                    temp.father_comment_content = json.comments[i].father_comment_content;
                    temp.father_comment_user = json.comments[i].father_comment_user;
                    commentList.push(temp);
                }
                this.setState({loading: false});
            }).catch(error => {
                console.error(error);
            });

        } else if (submit_type == 'reference_comment') {
            var formData = this.props.form.getFieldsValue();
            this.setState({loading: true});
            const myRequest = new Request('',
                {
                    method: 'POST',
                    headers: new Headers({"Content-Type": "application/json"}),
                    body: JSON.stringify({action: "reply_comment" ,user_id: localStorage.userid, content: formData.add_reply_comment, reply_id:comment_content})
                });
            fetch(myRequest).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error("Something went wrong");
                }
            }).then(json => {
                console.log(json);
                commentList=[];
                for (var i = 0; i < json.comments.length; i++) {
                    var temp = {};
                    temp.article_id = json.comments[i].article_id;
                    temp.comment_id = json.comments[i].comment_id;
                    temp.user_id = json.comments[i].user_id;
                    temp.user_name = json.comments[i].user_name;
                    temp.comment_timestamp = json.comments[i].comment_timestamp;
                    temp.comment_mod_timestamp = json.comments[i].comment_mod_timestamp;
                    temp.comment_content = json.comments[i].comment_content;
                    temp.comment_karma = json.comments[i].comment_karma;
                    temp.is_reply = json.comments[i].is_reply;
                    temp.father_comment_id = json.comments[i].father_comment_id;
                    temp.father_comment_content = json.comments[i].father_comment_content;
                    temp.father_comment_user = json.comments[i].father_comment_user;
                    commentList.push(temp);
                }
                this.setState({loading: false});
                if(json.result == 1) {
                    this.setState({can_comment: false});
                }
            }).catch(error => {
                console.error(error);
            });
        }


        //网络通信响应完成之后，关闭loading和窗口，这里用延时模拟
        this.setState({commentSubmitLoading: false, commentModalVisible: false});
    }

    handleCommentSubmitCancel() {
        this.setState({commentModalVisible: false});
    }


    //更改新闻类别，重新加载
    componentWillReceiveProps() {
        this.setState({loading: false});
    }

    handleComplainClick(e, comment_id) {
        console.log('点击举报,id=', comment_id);
        if (localStorage.userid == '') {
            message.info("您未登录，不能举报！！");
            return;
        }

        const myRequest = new Request('/',
            {
                method: 'POST',
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({
                    action: "report_comment",
                    article_id: this.props.article_id,
                    comment_id: comment_id
                })
            });
        fetch(myRequest).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        }).then(json => {
            console.log(json);
            if (json.result === 0) {
                message.success("举报成功！");
            }
            else {
                message.info('举报失败！');
            }
        }).catch(error => {
            console.error(error);
        });
    }


    handleKarmaClick(e, comment_id, is_karmaed) {
        console.log('点击点赞,id=', comment_id);
        if (localStorage.userid === '') {
            message.info("您未登录，不能点赞！");
            return;
        }
        if (!is_karmaed) {
            this.setState({loading: true});    //开启loading,不能丢，否则无法更新界面

            const myRequest = new Request('/',
                {
                    method: 'POST',
                    headers: new Headers({"Content-Type": "application/json"}),
                    body: JSON.stringify({
                        action: "light_comment",
                        article_id: this.props.article_id,
                        user_id: localStorage.userid,
                        comment_id: comment_id
                    })
                });

            fetch(myRequest).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    message.info('点赞失败，请检查网络');
                    throw new Error("Something went wrong");
                }
            }).then(json => {
                console.log(json);
                this.setState({loading: false});
                if (json.result === 0) {
                    for (var i = 0; i < this.props.listData.length; i++) {
                        if (this.props.listData[i].comment_id == comment_id) {
                            this.props.listData[i].is_karmaed = true;
                            this.props.listData[i].comment_karma++;
                            message.info('点赞成功!');
                        }
                    }
                }
                else {
                    message.info('点赞失败！');
                }
            }).catch(error => {
                console.error(error);
            });
        } else {
            message.info('您已经点过赞啦');
        }
        this.setState({loading: false});    //开启loading,不能丢，否则无法更新界面


    }

    handleEditClick(e, comment_id, comment_content) {
        console.log('点击编辑,id=', comment_id);
    }

    handleDeleteClick(e, comment_id) {
        console.log('点击删除,id=', comment_id);
        if (localStorage.userid === '') {
            message.info("您未登录，不能删除！");
            return;
        }
        const myRequest = new Request('/',
            {
                method: 'POST',
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({action: "delete_comment", article_id:this.props.article_id,comment_id:comment_id})
            });

        fetch(myRequest).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        }).then(json => {
            console.log(json);
            if (json.result === 0) {
                message.success("删除成功！");
            }
            else {
                message.warn("删除失败！");
            }
        }).catch(error => {
            console.error(error);
        });
        message.info('删除成功');

    }

    render() {

        return (
            <List
                itemLayout="horizontal"
                size="middle"
                loading={this.state.loading}
                bordered="true"
                split="true"
                pagination={{
                    onChange: (page) => {
                        //console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={this.props.listData}
                footer={<div></div>}
                renderItem={item => (
                    <List.Item key={item.user_id}>

                        <div class='comment_layout'>
                            {item.is_reply ?
                                <div>
                                    <div class='news_comment_father'>
                                        <div>
                                            引用@{item.father_comment_user}的评论：
                                        </div>
                                        <br/>
                                        <div>
                                            <List.Item.Meta
                                                avatar={<Avatar style={{backgroundColor: '#f56a00'}}
                                                                size='{large}'>{item.father_comment_user.substring(0, 1)}</Avatar>}
                                                title={<a>{item.father_comment_user}</a>}
                                                description={item.father_comment_content}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div>
                                        <div>
                                            <List.Item.Meta
                                                avatar={<Avatar style={{backgroundColor: '#f56a00'}}
                                                                size='{large}'>{item.user_name.substring(0, 1)}</Avatar>}
                                                title={<a>{item.user_name}</a>}
                                                description={item.comment_content}/>
                                        </div>
                                        <div class='news_comment_bottom'>
                                            {
                                                localStorage.userid == item.user_id || localStorage.managerEnable == '1'
                                                    ?
                                                    <Popconfirm placement="bottom" title='确定删除本条评论？'
                                                                onConfirm={(e, comment_id, comment_content) => {
                                                                    this.handleDeleteClick(e, item.comment_id)
                                                                }} okText="Yes" cancelText="No">
                                                        <a class='a'><IconText text='删除'/></a>
                                                    </Popconfirm>
                                                    :
                                                    <font></font>
                                            }
                                            &nbsp;&nbsp;
                                            {item.is_karmaed == true
                                                ?
                                                <a class='a' onClick={(e, comment_id, is_karmaed) => {
                                                    this.handleKarmaClick(e, item.comment_id, item.is_karmaed)
                                                }}><IconText type="like" text={item.comment_karma}/></a>
                                                :
                                                <a class='a' onClick={(e, comment_id, is_karmaed) => {
                                                    this.handleKarmaClick(e, item.comment_id, item.is_karmaed)
                                                }}><IconText type="like-o" text={item.comment_karma}/></a>
                                            }
                                            &nbsp;&nbsp;
                                            {
                                                localStorage.userid == item.user_id
                                                    ?
                                                    <Popconfirm placement="bottom" title='确定编辑本条评论？'
                                                                onConfirm={(father_comment_id, father_comment_user, father_comment_content, type) => {
                                                                    this.showModal1(item.comment_id, item.user_name, item.comment_content, 'edit_comment')
                                                                }} okText="Yes" cancelText="No">
                                                        <a class='a'><IconText text='编辑'/></a>
                                                    </Popconfirm>
                                                    :
                                                    <Popconfirm placement="bottom" title='确定举报本条评论？'
                                                                onConfirm={(e, comment_id) => {
                                                                    this.handleComplainClick(e, item.comment_id)
                                                                }} okText="Yes" cancelText="No">
                                                        <a class='a'><IconText text='举报'/></a>
                                                    </Popconfirm>
                                            }
                                            &nbsp;&nbsp;
                                            <a class='a'
                                               onClick={(father_comment_id, father_comment_user, father_comment_content, type) => {
                                                   this.showModal1(item.comment_id, item.user_name, item.comment_content, 'reference_comment')
                                               }}>
                                                评论
                                            </a>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            {item.comment_timestamp == '' ? item.comment_mod_timestamp : item.comment_timestamp}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div>
                                        <List.Item.Meta
                                            avatar={<Avatar style={{backgroundColor: '#f56a00'}}
                                                            size='{large}'>{item.user_name.substring(0, 1)}</Avatar>}
                                            title={<a>{item.user_name}</a>}
                                            description={item.comment_content}/>
                                    </div>
                                    <div class='news_comment_bottom'>
                                        {
                                            localStorage.userid == item.user_id || localStorage.managerEnable == '1'
                                                ?
                                                <Popconfirm placement="bottom" title='确定删除本条评论？'
                                                            onConfirm={(e, comment_id, comment_content) => {
                                                                this.handleDeleteClick(e, item.comment_id)
                                                            }} okText="Yes" cancelText="No">
                                                    <a class='a'><IconText text='删除'/></a>
                                                </Popconfirm>
                                                :
                                                <font></font>
                                        }
                                        &nbsp;&nbsp;
                                        {item.is_karmaed == true
                                            ?
                                            <a class='a' onClick={(e, comment_id, is_karmaed) => {
                                                this.handleKarmaClick(e, item.comment_id, item.is_karmaed)
                                            }}><IconText type="like" text={item.comment_karma}/></a>
                                            :
                                            <a class='a' onClick={(e, comment_id, is_karmaed) => {
                                                this.handleKarmaClick(e, item.comment_id, item.is_karmaed)
                                            }}><IconText type="like-o" text={item.comment_karma}/></a>
                                        }
                                        &nbsp;&nbsp;
                                        {
                                            localStorage.userid == item.user_id
                                                ?
                                                <Popconfirm placement="bottom" title='确定编辑本条评论？'
                                                            onConfirm={(e, comment_id, comment_content) => {
                                                                this.handleEditClick(e, item.comment_id, item.comment_content)
                                                            }} okText="Yes" cancelText="No">
                                                    <a class='a'><IconText text='编辑'/></a>
                                                </Popconfirm>
                                                :
                                                <Popconfirm placement="bottom" title='确定举报本条评论？'
                                                            onConfirm={(e, comment_id) => {
                                                                this.handleComplainClick(e, item.comment_id)
                                                            }} okText="Yes" cancelText="No">
                                                    <a class='a'><IconText text='举报'/></a>
                                                </Popconfirm>
                                        }
                                        &nbsp;&nbsp;
                                        <a class='a' key='father_comment_click' onClick={this.showModal1}>回复</a>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        {item.comment_timestamp == '' ? item.comment_mod_timestamp : item.comment_timestamp}
                                    </div>
                                </div>}
                        </div>


                        <Modal
                            wrapClassName="vertical-center-modal"
                            visible={this.state.commentModalVisible}
                            title={modalTitle}
                            onOk={this.handleOk}
                            onCancel={this.handleCommentSubmitCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCommentSubmitCancel}>退出</Button>,
                                <Button key="submit" type="primary" loading={this.state.commentSubmitLoading}
                                        onClick={this.handleCommentSubmitOk(item.comment_id)}>
                                    提交评论
                                </Button>,
                            ]}
                        >
                            <p>{comment_content}</p>
                            <div><TextArea placeholder="评论请遵守互联网行为准则!" defaultValue={commentDefault} rows={5}/></div>
                        </Modal>
                    </List.Item>

                )}
            />
        );
    }
}

//Math.round(Math.random()*10)
