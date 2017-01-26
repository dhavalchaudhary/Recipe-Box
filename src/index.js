import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Main from './components/Main';
import RecipeList from './components/RecipeList';
import EditBox from './components/EditBox';
import sampleData from './data/sample';

const routes = (
  <Route path="/" component={Main}>
    <IndexRoute component={RecipeList} data={sampleData} />
    <Route path="/edit/:id" component={EditBox} data={sampleData}/>
    <Route path="/new" component={EditBox} />
  </Route>
)
render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    {routes}
  </Router>
  ,document.getElementById('app'));
