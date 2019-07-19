import React, { Component } from 'react';
import { Table, Form, Divider, Modal, Icon, Button, Input } from 'antd';
import http from '../../util/api.js';

const { TextArea } = Input;
class ArticleNature extends Component {
    constructor(props) {
        super(props);
        console.log('props' + this.props.data.article_title);
        this.state = {
            visible: false,
        }
    }

    submit = async () => {
        // 修改接口
        let res;
        const resid = 616607832207;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const data = [{
                    article_title: values.article_title,
                    author_name: values.author_name,
                    label_name:values.label_name
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
                        this.onSearch()
                    });
                }
            }
        });


    };
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
                                initialValue: this.props.data.article_title
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="附图"
                        >
                            {getFieldDecorator('picture_address', {
                                rules: [{ message: 'Please input your nickname!', whitespace: true }],
                                initialValue: this.props.data.picture_address
                            })(<TextArea rows={4} />)}
                        </Form.Item>
                        <Form.Item
                            label="作者姓名"
                        >
                            {getFieldDecorator('author_name', {
                                rules: [{ message: 'Please input your nickname!', whitespace: true }],
                                initialValue: this.props.data.author_name
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="标签名"
                        >
                            {getFieldDecorator('label_name', {
                                rules: [{ message: 'Please input your nickname!', whitespace: true }],
                                initialValue: this.props.data.label_name
                            })(<Input />)}
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(ArticleNature);