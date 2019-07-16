import React, { Component } from 'react';
import { Table, Form } from 'antd';
import http from '../../util/api.js';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import { ContentUtils } from 'braft-utils'
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editorState: BraftEditor.createEditorState(null),
      recordSet: {},
      content: null,
      uContent: {},
      visible: false 
    }
  }
  // state = { visible: false };

  componentDidMount() {
    this.onSearch()
  }

  // 修改弹出框
  showModal = (recordSet) => {
    console.log(recordSet.articl_content)
    this.setState({
      visible: true,
      recordSet,
      content: BraftEditor.createEditorState(this.unescapeHTML(recordSet.articl_content)),
      uContent: recordSet.articl_content
    });
  };

  //html字符串转义
  unescapeHTML = (a) => {
    a = "" + a;
    console.log("a", a);
    return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  }

  //文本转义为带有html标签 
  escapeHTML = (a) => {
    console.log("a", a)
    a = "" + a;
    return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");;
  }

  // 保存修改信息 
  handleOk = async (a) => {
    console.log(a);
    let content = this.escapeHTML(this.state.content.toHTML())
    console.log("content", content)
    // 修改信息
    // eslint-disable-next-line no-unreachable
    let res;
    const resid = 616607832207;
    const data = [{REC_ID: this.state.recordSet.REC_ID , articl_content: content,}]
    try {
      res = await http().modifyRecords({
        resid,
        data,
      });
      console.log("res", res)
      this.setState({ visible: false, })
    } catch (error) {
      console.log(error)
      this.setState({
        visible: false,
      });
    }
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChange = (editorState) => {
    // let recordSet ={...this.state.recordSet}
    console.log('editorState', editorState)
    this.setState({
      content: editorState
    });
  }

  onSearch = async () => {
    console.log("COME IN ")
    let res;
    try {
      res = await http().getTable({
        resid: 616607832207
      });
      console.log("res", res)
      this.setState({ data: res.data })
      // if(res.ErrorMsg === ""){               
      // }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let { recordSet } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'author_name',
        key: 'author_name',
      },
      {
        title: 'type',
        dataIndex: 'diease_type',
        key: 'diease_type'
      },
      {
        title: '操作',
        dataIndex: 'active',
        key: 'active',
        render: (text, record) => (
          <div>
            <Button
              onClick={() => this.showModal(record)}
            >修改</Button>
          </div>
        ),
      },
    ];
    return (
      <div style={{ margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>数据信息</div>
        <Table columns={columns} dataSource={this.state.data} size="middle" />
        <Modal
          title="修改信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width='900px'
        >
          <BraftEditor
            contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
            value={this.state.content}
            onChange={this.onChange}
          />
        </Modal>
      </div>
    );
  }
}
export default Form.create()(MainPage);