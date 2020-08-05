import React, { Component } from "react";
import Button from "antd/es/button";
import Input from "antd/es/input";
import Icon from "antd/es/icon";
import "./LoginPage.css";
import { Form, message } from "antd";
// import Form from 'antd/es/form';
// import http from '../../util/api';
import http from "../../util/api.js";
import { removeItem, setItem, getItem } from "../../util/util";
import MainPage from "../main_page/MainPage";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordSet: {
        code: "",
        password: "",
      },
      action: "",
    };
  }

  // 返回login页面
  handBack = () => {
    this.setState({
      action: "",
    });
  };

  // 返回main页面
  onGoBack = () => {
    this.setState({ action: "mainPage" });
  };

  onSubmit = async () => {
    //登录之前清除userinfo
    removeItem("loginData");
    removeItem("userInfo");
    console.log(localStorage);

    this.props.form.validateFields((err, values) => {
      this.state.recordSet = values;
    });
    let { recordSet } = this.state;

    try {
      // let res =
      //     await http().addRecords({
      //         resid: 61010121212, // 表资源 id
      //         data: [], // 要添加的记录；如 [{ name: '1', age: 18 }, { name: '2', age: 19 }]
      //         isEditoRAdd: false // 添加记录的状态是否为 'editoradd'；默认为 false，即状态为 'added'
      //     })
      let res = await http().login({
        code: recordSet.code, // 用户名
        password: recordSet.password, // 密码
        useCookie: false, // 为 true 时，表示 accessToken 被存放在 cookie 中；为 false 时，表示 accessToken 被存放在返回值中
      });

      if (res.ErrorMsg === "") {
        // setItem('loginData',res);
        setItem("userInfo", JSON.stringify(res));
        this.props.history.push({
          pathname: "/home",
          state: {
            id: 3,
          },
        });
      }else{
      message.error(res.ErrorMsg);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  render() {
    let { recordSet } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{
          width: "100%",
          height: "99%",
          margin: "0 auto",
          background: "rgb(225, 231, 236)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "73%",
            background: "rgb(225, 231, 236)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "29%",
              height: "85%",
              background: "white",
              position: "absolute",
              top: "0",
              bottom: "0",
              marginTop: "auto",
              marginBottom: "auto",
              left: "0",
              right: "0",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p
              style={{
                marginTop: "23%",
                marginLeft: "23%",
                color: "rgb(27, 91, 212)",
                fontSize: "30pt",
                fontWeight: "bold",
              }}
            >
              文章发布系统
            </p>
            <Form>
              <Form.Item>
                {getFieldDecorator("code", {
                  recordSet: recordSet.code,
                  rules: [
                    { required: true, message: "Please input your username!" },
                  ],
                })(
                  <Input
                    style={{ marginLeft: "27%", width: "54%" }}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入你的用户名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  recordSet: recordSet.password,
                  rules: [
                    { required: true, message: "Please input your username!" },
                  ],
                })(
                  <Input
                    style={{ marginLeft: "27%", width: "54%", marginTop: "3%" }}
                    prefix={
                      <Icon
                        type="eye-invisible"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="请输入你的密码"
                    type="password"
                  />
                )}
              </Form.Item>
              <Button
                type="primary"
                style={{ marginLeft: "27%", width: "54%", marginTop: "5%" }}
                onClick={this.onSubmit}
              >
                登录
              </Button>
            </Form>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            hight: "20%",
            margin: "0 auto",
            position: "absolute",
            // overflowY:'hidden'
          }}
        >
          <img
            style={{
              height: "175px",
              width: "100%",
              margin: "0 auto",
              position: "absolute",
              marginTop: "450px",
            }}
            src={[require("../img/1.png")]}
          />
        </div>
      </div>
    );
  }
}
export default Form.create()(LoginPage);
