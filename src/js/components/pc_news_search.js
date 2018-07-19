import React from 'react';
import ReactDOM from 'react-dom';
import { Input,Row,Col ,message,Spin,Calendar} from 'antd';
import NewsList from './pc_news_list_component'

const Search = Input.Search;

var hintMessage;
var resultList;
const defaultProps = {searchType:'title'}
var listData = [];
export default class SearchPage extends React.Component {

  constructor(){
    super();
		this.state = {
      hasResult:false,
      loading:false
		};
    this.searchRequest = this.searchRequest.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);

  }

  //通信部分，value为输入框内容，搜索类型为props.searchType
  searchRequest(value){

    console.log(value);
    this.setState({loading:true});

    listData = [];
    var searchtype=0;
    if(this.props.searchType == 'title'){
      searchtype = '0';
    }else if(this.props.searchType == 'tag'){
      searchtype = '1';
    }else if(this.props.searchType == 'time'){
      searchtype = '2';
    }else if(this.props.searchType == 'author'){
      searchtype = '3';
    }

    const myRequest = new Request('/',
                                  {   method: 'POST',
                                      headers: new Headers({"Content-Type":"application/json"}),
                                      body: JSON.stringify({action:'search', search_type: searchtype,keyword: value})});
    console.log({action:'search', search_type: searchtype,keyword: value});
     fetch(myRequest).then(response => {
       this.setState({loading:false});
       if(response.status === 200) {
         return response.json();
       }
       else {
         message.info('搜索失败');
         throw new Error("Somehthing went wrong");
       }
       }).then(json => {
          console.log(json);
          for (var i = 0; i < json.articles.length; i++) {
              var temp = {};
              temp.article_id = json.articles[i].article_id;
              temp.article_title = json.articles[i].article_title;
              temp.article_author = json.articles[i].article_author;
              temp.article_timestamp = json.articles[i].article_timestamp;
              temp.href = '/article/<'+json.articles[i].article_id+'>';
              temp.article_desc = json.articles[i].article_desc;
              temp.article_heat = json.articles[i].article_heat;
              temp.article_score = json.articles[i].article_score;
              temp.taglist = json.articles[i].tag_list;
              var category_id = json.articles[i].category_id;
              if(category_id == 1){
                temp.category = '科技';
              }else if(category_id == 2){
                temp.category = '政治';
              }else if(category_id == 3){
                temp.category = '娱乐';
              }else if(category_id == 4){
                temp.category = '体育';
              }else if(category_id == 5){
                temp.category = '财经';
              }else if(category_id == 6){
                temp.category = '国际';
              }else {
                temp.category = '未知';
              }
              listData.push(temp);
          }
       }).catch(error => {
          console.error(error);
       });


    //获得新闻列表到listData
    this.setState({hasResult:true,loading:false});
    if(listData.length < 1){
      message.info("搜索结果为空，请修改您的关键字,或采用其他搜索方式。");
    }else{
      message.success("为您搜索到"+listData.length+"个结果！");
    }

  }

  onPanelChange(value, mode) {
  console.log(value, mode);
}

  render(){

    if(this.props.searchType == 'title'){
      hintMessage = '请输入新闻标题';
    }else if(this.props.searchType == 'tag'){
      hintMessage = '请输入新闻标签';
    }else if(this.props.searchType == 'time'){
      hintMessage = '时间格式例：2018-07-17';
    }

    if(this.state.hasResult == true){ //有结果就展示
      resultList = <div><br /><br/><br/><br/><NewsList listData = {listData}></NewsList><br/><br/><br/><br/><br/></div>;
    }else{
      resultList = <div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>;
    }



    return(
      <div>
        <Row >
          <Col span={7}></Col>
          <Col span={12} >
            <div>
              <br/><br/><br/>
              <a href="/" class="logo_middle">
                <img src="./src/images/logo.png" alt="logo"/>
                <span>ICEBERGNews</span>
              </a>
            </div>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row>
          <Col span={7}></Col>
          <Col span={10}>
            <div>
              <br /><br /><br/><br/><br/>
              <Search placeholder={hintMessage} enterButton="搜索" size="large" onSearch={value => {this.searchRequest(value)}}/>
            </div>
          </Col>
          <Col span={7}></Col>
        </Row>
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <Spin spinning={this.state.loading} tip='搜索中'>
              {resultList}
            </Spin>
          </Col>
          <Col span={4}></Col>

        </Row>
      </div>
    );
  }

}

SearchPage.defaultProps = defaultProps;

//<NewsList listData = {listData}></NewsList>

//onSearch={value => console.log(value)}
