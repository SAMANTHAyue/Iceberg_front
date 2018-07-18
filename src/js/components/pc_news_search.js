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
    //fetch().......
    console.log(value);
    this.setState({loading:true});

    listData = [];
    if(value == '计算机'){
      var temp = {};
      temp.article_id = '12434';
      temp.category = '科技';
      temp.article_title = '这是新闻标题';
      temp.article_desc = '新闻的简介数据库大家分厘卡即使的看法垃圾啊士大夫接受了的看法距离喀什角动量飞机侃大山就爱上了的咖啡机拉克丝解放了喀什的就ask两地分居垃圾十分宽大金克拉撒旦解放了喀什建立饭卡将离开洒家对方离开洒家灯笼裤飞机就立刻多久啊是芬兰空军分类的凯撒就建立可是大家分厘卡即使代理费';
      temp.article_author = '名字';
      temp.article_timestamp = '2018-07-16 10:00';
      temp.article_heat = 43423;
      temp.article_score = 3.5;
      temp.tag_list = ['计算机','科学','大数据'];
      listData.push(temp);
    }
     const myRequest = new Request('/search',
                                    {method: 'POST',
                                        headers: new Headers({"Content-Type":"application/json"}),
                                        body: JSON.stringify({search_type: this.props.searchType,keyword: value})});
     fetch(myRequest).then(response => {
       if(response.status === 200) {
         return response.json();
       }
       else {
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
