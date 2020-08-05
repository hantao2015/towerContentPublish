import React from "react";
import { Table, Tag, message, Spin, Button } from "antd";
import http from "../../util/api";
import "./PrintList.less";
import logo1 from "../../assets/imgs/logo1.jpg";
import SHVO from "../../assets/imgs/SHVO.png";
import doctor from "../../assets/imgs/doctor.png";
const doctorSignID = 644680281104;

class PrintList extends React.Component {
  state = {
    data: [],
    loading: false,
  };
  handleGotoBack = () => {
    this.props.history.goBack();
  };

  handlePrint = (record) => {
    const img = new Image();
    img.src = record.base64Picture;
    const newWin = window.open(
      "http://ivf.dybhealth.com:9999/PatientShowContent?name=21&telephone=222",
      "_blank"
    );
    const a = document.getElementsByTagName("html")[0].innerHTML;
    const html = record.words;
    const logoHtml = `<div class="imgLine" style="padding: 1.5rem 1.5rem 0rem;
    overflow: hidden;
    text-align: center"><img style="height: 5rem" src="${logo1}"><img  style="height: 5rem"  src="${SHVO}"><img  style="height: 5rem"  src="${doctor}"></div>`;
    newWin.document.write(html + img.outerHTML + logoHtml);
    newWin.document.close();
    newWin.window.location.reload();
    setTimeout(() => {
      newWin.window.print();
    }, 50);
  };
  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    let res;
    this.setState({
      loading: true,
    });
    try {
      res = await http().getTable({
        resid: doctorSignID,
      });
      this.setState({
        data: res.data,
        loading: false,
      });
    } catch (error) {
      message.error(error.message);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { data, loading } = this.state;
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "手机号",
        dataIndex: "telephone",
        key: "telephone",
      },
      {
        title: "签名时间",
        dataIndex: "signature_time",
        key: "signature_time",
      },
      {
        title: "插入数据的模板ID",
        dataIndex: "insertID",
        key: "insertID",
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <a
            onClick={() => {
              this.handlePrint(record);
            }}
          >
            打印
          </a>
        ),
      },
    ];
    return (
      <Spin spinning={loading}>
        <div className="printList">
          <Button onClick={this.handleGotoBack}>返回</Button>
          <Table columns={columns} dataSource={data} />
        </div>
      </Spin>
    );
  }
}
export default PrintList;
