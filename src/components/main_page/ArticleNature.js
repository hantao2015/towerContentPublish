/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import { Table, Form, Divider, Modal, Icon, Button, Input, Upload, message } from 'antd';
import http from '../../util/api.js';

const { TextArea } = Input;
class ArticleNature extends Component {
    constructor(props) {
        super(props);
        console.log('props' + this.props.data.article_title);
        this.state = {
            visible: false,
            imageUrl: '',
            imagePath: '',
            data: {},
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data,
            imageUrl: nextProps.data.picture_address,
        })
        
    }

    submit = async () => {
        let record =this.state.data;
        // 修改接口
        let res;
        const resid = 616607832207;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const data = [{
                    REC_ID: record.REC_ID,
                    article_title: values.article_title,
                    author_name: values.author_name,
                    label_name:values.label_name,
                    picture_address:values.picture_address
                }]
                try {
                    res = await http().modifyRecords({
                        resid,
                        data,
                    });
                    console.log("res", res)
                    this.props.onCloseModal()
                    this.props.onSearch()
                } catch (error) {
                    console.log(error)
                    this.setState({
                        visible: false,
                    }, () => {
                        this.props.onSearch()
                    });
                }
            }
        });


    };

    //图片上传前验证
    beforeUpload = (file) => {
        const isImageType = file.type === 'image/png';
        if (!isImageType) {
          message.error('You can only upload PNG file!');
        }
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   message.error('Image must smaller than 2MB!');
        // }
        // return isImageType && isLt2M;
        return isImageType;
    }

    //图片上传功能
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.state.data.picture_address = info.file.response.data
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              imagePath: info.file.response.data,
              loading: false,
            }),
          );
        }
    };

    //获取图片
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12 },
            },
        };

        let { imageUrl, data } = this.state;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="修改信息"
                    visible={this.props.visible}
                    onOk={this.submit}
                    onCancel={this.props.onCloseModal}
                    width='600px'
                >
                    <Form {...formItemLayout} >
                        <Form.Item
                            label="文章标题"
                        >
                            {getFieldDecorator('article_title', {
                                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                                initialValue: data.article_title
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="附图地址"
                        >
                            {getFieldDecorator('picture_address', {
                                rules: [{ message: 'Please input your nickname!', whitespace: true }],
                                initialValue: data.picture_address
                            })(<TextArea rows={4} />)}
                        </Form.Item>
                        <Form.Item
                            label="附图(点击图片可编辑)"
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://tower.realsun.me/api/AliyunOss/PutOneImageObject?bucketname=nutritiontower&srctype=png"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img style={{width:'60px'}} src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="作者姓名"
                        >
                            {getFieldDecorator('author_name', {
                                rules: [{ message: 'Please input your nickname!', whitespace: true }],
                                initialValue: data.author_name
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="标签名"
                        >
                            {getFieldDecorator('label_name', {
                                rules: [{ message: 'Please input your nickname!', whitespace: true }],
                                initialValue: data.label_name
                            })(<Input />)}
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(ArticleNature);