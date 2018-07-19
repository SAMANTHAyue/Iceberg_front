import React from 'react';
import ReactDOM from 'react-dom';
import { Input,Row,Col ,message,Spin,Calendar,Form,Button} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class ManagePanel_publish extends React.Component {
    constructor(){
        super();
        this.state = {
            category_id: 1,
        }
        this.categoryChanged = this.categoryChanged.bind(this);
        this.SubmitClicked = this.SubmitClicked.bind(this);
    };

    componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

    categoryChanged(e){
        if(e.key == 1){
            category_id = 1;
        }else if(e.key == 2){
            category_id = 2;
        }else if(e.key == 3){
            category_id = 3;
        }else if(e.key == 4){
            category_id = 4;
        }else if(e.key == 5){
            category_id = 5;
        }else if(e.key == 6){
            category_id = 6;
        }
    }

    SubmitClicked(e) {
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        //获取时间
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var hour = "00" + date.getHours();
        hour = hour.substr(hour.length - 2);
        var minute = "00" + date.getMinutes();
        minute = minute.substr(minute.length - 2);
        var second = "00" + date.getSeconds();
        second = second.substr(second.length - 2);
        const myRequest = new Request('/',
                                      {   method: 'POST',
                                          headers: new Headers({"Content-Type":"application/json"}),
                                          body: JSON.stringify({action:'publish', newstitle: formData.title,desc: formData.desc,newscontent: formData.content,
                                                                author: formData.author,time: year +'-'+month+'-'+day+' '+hour+':'+minute+':'+second,
                                                                category_id: this.state.category_id,tags: formData.tag_list})});
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
                if(json.result == 0){
                    message.success("发布新闻成功！");
                }
                else {
                    message.warn("发布新闻失败！");
                }
            }).catch(error => {
            console.error(error);
            });
    }


    render() {
      let {getFieldProps} = this.props.form;

      console.log('管理员界面');
        return (<div>
                <Row>
                    <Col span={7}></Col>
                    <Col span={12}>
                    <div class = 'news-commit-info'>
                            发布新闻
                            <br/><br/>
                            <Input addonBefore='新闻标题' placeholder='请输入新闻标题'
                            {...getFieldProps('newstitle',{rules: [{required: true, message: '标题不能为空！'}]})} size = 'large'/>
                            <br/><br/>
                            <Input addonBefore='新闻作者' placeholder='请输入新闻作者'
                            {...getFieldProps('author',{rules: [{required: true, message: '作者不能为空！'}]})} size = 'large'/>
                            <br/><br/>
                            <span>新闻简介</span>
                            <br/><br/>
                            <TextArea placeholder='请输入新闻简介' {...getFieldProps('desc')} style={{ height: 200 }}/>
                            <br/><br/>
                            <span>新闻内容</span>
                            <br/><br/>
                            <TextArea placeholder='请输入新闻内容'
                            {...getFieldProps('newscontent',{rules: [{required: true, message: '内容不能为空！'}]})} style={{height: 350 }}/>
                            <br/><br/>
                            <Button type="ghost" htmlType="button" onClick={this.SubmitClicked}>预览</Button>
                            <br/><br/>
                            <span>新闻分类</span>
                            <br/><br/>
                            <Button type="ghost" htmlType="button" key = "1" onClick={this.categoryChanged}>科技</Button>
                            <Button type="ghost" htmlType="button" key = "2" onClick={this.categoryChanged}>政治</Button>
                            <Button type="ghost" htmlType="button" key = "3" onClick={this.categoryChanged}>娱乐</Button>
                            <Button type="ghost" htmlType="button" key = "4" onClick={this.categoryChanged}>体育</Button>
                            <Button type="ghost" htmlType="button" key = "5" onClick={this.categoryChanged}>财经</Button>
                            <Button type="ghost" htmlType="button" key = "6" onClick={this.categoryChanged}>国际</Button>
                            <br/><br/>
                            <span>新闻标签</span>
                            <br/><br/>
                            <Input placeholder='请输入新闻标签' {...getFieldProps('tag_list')}/>
                            <br/><br/>

                            <Button type="ghost" htmlType="button" onClick={this.SubmitClicked}>提交</Button>
                    </div>
                    </Col>
                    <Col span={6}></Col>
                </Row>

                </div>
        );
    }
}

export default  ManagePanel_publish = Form.create()(ManagePanel_publish);
