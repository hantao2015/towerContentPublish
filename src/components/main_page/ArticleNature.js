import React, { Component } from 'react';
import { Table, Form, Divider,Modal } from 'antd';

class ArticleNature extends Component{
    constructor(props) {
        super(props);
        console.log('props'+this.props.data.article_title);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Modal>
                
                </Modal>
            </div>
        );
    }
}

export default Form.create()(ArticleNature);