import React, { Component } from 'react';
import HomePage from './home/HomePage'
import AboutPage from './about/AboutPage'
import CoursesPage from './courses/CoursesPage'
import Header from './common/Header'
import PageNotFound from './PageNotFound'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

const App = () => (
    <div className="container-fluid">
    <Header/>
    <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route path="/about" component={AboutPage}/>
    <Route path="/courses" component={CoursesPage}/>
    <Route component={PageNotFound}/>
    </Switch>
    </div>
)

export default App;