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
      temp.title = '这个是新闻标题';
      temp.author_name = '名字';
      temp.href = '';
      temp.image = './src/images/logo.png';
      temp.description = 'sdfdsfa';
      temp.content = '';
      temp.uniquekey = '';
      temp.star = 4;
      temp.tag1 = '科技';
      temp.tag2 = '计算机';
      temp.tag3 = '人工智能'
      listData.push(temp);
    }

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
