import React, { Component } from "react";
import { Table, Form, Divider, message } from "antd";
import http from "../../util/api.js";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import { ContentUtils } from "braft-utils";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import ArticleNature from "./ArticleNature";
// import { logout } from 'Util/auth';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editorState: BraftEditor.createEditorState(null),
      recordSet: {},
      content: null,
      uContent: {},
      visible: false,
      size: "small",
      action: "",
    };
  }
  // state = { visible: false };

  handleGotoBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.onSearch();
  }

  // 修改的弹出框
  showModal = (recordSet) => {
    console.log("recordSet", recordSet);
    this.setState({
      visible: true,
      recordSet,
      content: BraftEditor.createEditorState(
        this.unescapeHTML(recordSet.articl_content)
      ),
      uContent: recordSet.articl_content,
      action: "nature",
    });
  };

  // 编辑文章属性
  showModalTwo = (recordSet) => {
    console.log("recordSet", recordSet);
    this.setState({
      articelNatureVisible: true,
      recordSet,
    });
  };

  // 关闭modal
  closeModal = () => {
    this.setState({ articelNatureVisible: false });
  };

  //html字符串转义
  unescapeHTML = (a) => {
    a = "" + a;
    return a
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
  };

  //文本转义为带有html标签
  escapeHTML = (a) => {
    console.log("a", a);
    a = "" + a;
    return a
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  // 保存修改信息
  handleOk = async (a) => {
    console.log(a);
    let content = this.escapeHTML(this.state.content.toHTML());
    console.log("content", content);
    // 修改信息
    // eslint-disable-next-line no-unreachable
    let res;
    const resid = 616607832207;
    const data = [
      { REC_ID: this.state.recordSet.REC_ID, articl_content: content },
    ];
    try {
      res = await http().modifyRecords({
        resid,
        data,
      });
      console.log("res", res);
      this.setState({ visible: false }, () => {
        this.onSearch();
      });
    } catch (error) {
      console.log(error);
      this.setState(
        {
          visible: false,
        },
        () => {
          this.onSearch();
        }
      );
    }
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChange = (editorState) => {
    // let recordSet ={...this.state.recordSet}
    console.log("editorState", editorState);
    this.setState({
      content: editorState,
    });
  };

  onSearch = async () => {
    console.log("COME IN ");
    let res;
    try {
      res = await http().getTable({
        resid: 616607832207,
      });
      console.log("res", res);
      this.setState({ data: res.data });
      // if(res.ErrorMsg === ""){
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // 点击退出
  handBack = () => {
    Modal.confirm({
      title: "提示",
      content: "您确定要退出登录吗？",
      onOk: () => {
        // logout();
        this.props.history.push("/");
      },
    });
  };

  // 编辑文章属性组件向父组件传递它本身
  onRefNature = (data) => {
    this.onSearch();
    this.setState({ articelNatureVisible: false });
  };

  // 点击编辑属性显示信息
  clickNature = () => {
    // this.natureModal.showModal();
  };

  // 点击发布
  publishClick = (recordSet) => {
    console.log("recordSet", recordSet);
    Modal.confirm({
      title: "提示",
      content: "您确定要发布这篇文章吗？",
      onOk: async () => {
        try {
          let res = await http().modifyRecords({
            resid: "616607832207",
            data: [{ ...recordSet, C3_616258130674: "Y" }],
          });
          message.success(res.message);
          this.onSearch();
        } catch (error) {
          message.error(error.message);
        }
      },
    });
    this.setState(() => {
      this.onSearch();
    });
  };

  render() {
    const { size } = this.state;
    let { recordSet } = this.state;
    const columns = [
      {
        title: "标题",
        dataIndex: "article_title",
        key: "article_title",
      },
      {
        title: "作者",
        dataIndex: "author_name",
        key: "author_name",
      },
      {
        title: "文章类型",
        dataIndex: "diease_type",
        key: "diease_type",
      },
      {
        title: "操作",
        dataIndex: "active",
        key: "active",
        render: (text, record) => (
          <div>
            <Button size={size} onClick={() => this.showModal(record)}>
              编辑文章内容
            </Button>
            <Divider type="vertical" />
            <Button size={size} onClick={() => this.showModalTwo(record)}>
              编辑文章属性
            </Button>
            <Divider type="vertical" />
            <Button size={size} onClick={() => this.publishClick(record)}>
              发布
            </Button>
          </div>
        ),
      },
    ];
    return (
      <div
        style={{
          margin: "0 auto",
          marginBottom: "40px",
          lineHeight: "50px",
          marginTop: "40px",
        }}
      >
        <span
          style={{
            fontWeight: "650",
            fontStyle: "normal",
            textAlign: "center",
            paddingLeft: "8px",
            color: "grey",
            fontSize: "30px",
            marginBottom: "40px",
            marginTop: "40px",
            marginLeft: "505px",
          }}
        >
          待发布文章
        </span>

        <span style={{ float: "left", marginLeft: "60px" }}>
          <Button onClick={this.handleGotoBack}>返回</Button>
        </span>
        <span style={{ float: "right", marginRight: "60px" }}>
          <Button onClick={this.handBack}>退出</Button>
        </span>
        <span style={{ clear: "both" }}></span>
        <Table columns={columns} dataSource={this.state.data} size="middle" />
        <Modal
          title="修改信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="900px"
        >
          <BraftEditor
            contentStyle={{
              height: 210,
              boxShadow: "inset 0 1px 3px rgba(0,0,0,.1)",
            }}
            value={this.state.content}
            onChange={this.onChange}
          />
        </Modal>
        <ArticleNature
          onSearch={this.onSearch}
          onCloseModal={this.closeModal}
          data={this.state.recordSet}
          visible={this.state.articelNatureVisible}
          onRef={this.onRefNature}
        />
      </div>
    );
  }
}
export default Form.create()(MainPage);
