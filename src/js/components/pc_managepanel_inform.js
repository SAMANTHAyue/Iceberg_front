import React from 'react';
import ReactDOM from 'react-dom';
import { Input,Row,Col ,message,Spin,Calendar,Form,Button} from 'antd';
import NewsCommentList from './pc_news_comment_list';

const FormItem = Form.Item;
var informed_comments = [];

class ManagePanel_users extends React.Component {
    constructor(){
        super();
        this.state = {
            hasDeleted: 1
        }
        //this.deleteClicked = this.deleteClicked.bind(this);
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();

        const myRequest = new Request('/',
                                       {  method: 'POST',
                                          headers: new Headers({"Content-Type":"application/json"}),
                                          body: JSON.stringify({action:'get_report_comments'})
                                        });
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
                for (var i = 0; i < json.comments.length; i++) {
                    var temp = {};
                    temp.article_id = json.comments[i].article_id;
                    temp.comment_id = json.comments[i].comment_id;
                    temp.user_name = json.comments[i].user_name;
                    temp.comment_content = json.comments[i].comment_content;
                    temp.comment_timestamp = json.comments[i].comment_timestamp;
                    temp.comment_mod_timestamp = json.comments[i].comment_mod_timestamp;
                    temp.comment_karma = json.comments[i].comment_karma;
                    temp.is_reply = json.comments[i].is_reply;
                    temp.father_comment_id = json.comments[i].father_comment_id;
                    temp.father_comment_content = json.comments[i].father_comment_content;
                    temp.father_comment_user = json.comments[i].father_comment_user;
                    informed_comments.push(temp);
                }
            }).catch(error => {
            console.error(error);
        });
    }

    // deleteClicked(e) {
    //     e.preventDefault();
    //
    //     const myRequest = new Request('/admin/manage_comments',
    //                                   {method: 'POST',
    //                                    headers: new Headers({"Content-Type":"application/json"}),
    //                                    body: {action:'admin_delete_comment',article_id: e.article_id ,comment_id: e.comment_id}});
    //     fetch(myRequest)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 return response.json();
    //             }
    //             else {
    //                 throw new Error("Something went wrong");
    //             }
    //         })
    //         .then(json => {
    //             console.log(json);
    //             informed_commets.clear();
    //             for (var i = 0; i < json.comments.length; i++) {
    //                 var temp = {};
    //                 temp.article_id = json.comments[i].article_id;
    //                 temp.comment_id = json.comments[i].comment_id;
    //                 temp.user_name = json.comments[i].user_name;
    //                 temp.comment_content = json.comments[i].comment_content;
    //                 temp.comment_timestamp = json.comments[i].comment_timestamp;
    //                 temp.comment_mod_timestamp = json.comments[i].comment_mod_timestamp;
    //                 temp.comment_karma = json.comments[i].comment_karma;
    //                 temp.is_reply = json.comments[i].is_reply;
    //                 temp.father_comment_id = json.comments[i].father_comment_id;
    //                 temp.father_comment_content = json.comments[i].father_comment_content;
    //                 temp.father_comment_user = json.comments[i].father_comment_user;
    //                 informed_comments.push(temp);
    //             }
    //         }).catch(error => {
    //         console.error(error);
    //     });
    // }


    render() {
        let {getFieldProps} = this.props.form;

        var temp = {};
        temp.article_id = '1234';
        temp.comment_id = '123456';
        temp.user_name = 'Jack';
        temp.comment_content = '卢卡斯大家浪费空间的萨芬九零的萨芬就看到了';
        temp.comment_timestamp = '2018-09-08 10:00';
        temp.comment_mod_timestamp = '2018-09-08 10:00';
        temp.comment_karma = 100;
        temp.is_reply = false;
        temp.father_comment_id = '212332';
        temp.father_comment_content = 'jnsdaladslkf';
        temp.father_comment_user = 'sdafdsafddasf';
        informed_comments.push(temp);

        console.log('管理员界面');
        return (
            <div>
                <Row>
                    <Col span={7}></Col>
                    <Col span={12}>
                        <div>
                            <NewsCommentList listData={informed_comments}/>
                        </div>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
        );
    }
}

export default  ManagePanel_users = Form.create()(ManagePanel_users);
