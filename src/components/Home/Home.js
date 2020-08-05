import React from "react";
import { Table, Tag, message } from "antd";
import http from "../../util/api";
import Button from "antd/es/button";
import "./Home.less";

class Home extends React.Component {
  handleGotoPublish = () => {
    this.props.history.push("/mainPage");
  };

  handleGotoPrint = () => {
    this.props.history.push("/printList");
  };

  render() {
    return (
      <div className="home">
        <Button onClick={this.handleGotoPublish}>文章发布</Button>
        <Button type="primary" onClick={this.handleGotoPrint}>
          签名打印
        </Button>
      </div>
    );
  }
}
export default Home;
