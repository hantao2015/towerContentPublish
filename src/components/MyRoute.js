import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LoginPage from './login/LoginPage'

import MainPage from './main_page/MainPage'

//路由跳转和传值方法
// this.props.history.push({
//     pathname: '/mainPage',
//     state: {
//         id: 0
//     }
// })

// 通过路由取值的方法
//this.props.history.location.state

export default class MyRoute extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={LoginPage}/>
                    <Route path="/mainPage" component={MainPage}/>
                </div>
            </Router>
        )
    }  
}