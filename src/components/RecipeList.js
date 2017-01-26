import React, {Component} from 'react';
import {Link} from 'react-router';
import Recipe from './Recipe';
import {saveDataToStorage,getDataFromStorage} from '../utils/helper';

export default class RecipeList extends Component {
  constructor(){
    super();
    this.state = {
      allRecipes:[]
    }
  }

  componentDidMount(){
    this.setState(
      {allRecipes: getDataFromStorage(this.props)},
      () => saveDataToStorage(this.state.allRecipes)
    );
  }

  onDelete(id){
    this.setState(
      {allRecipes:this.state.allRecipes.filter(recipe => recipe.id !== id)},
      () => saveDataToStorage(this.state.allRecipes)
    );
  }

  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="page-name text-center"><span>Recipe List</span></h1>
          </div>
        </div>
        <div className="recipeDisplayList">
        	<div className="row">
            {this.state.allRecipes.map((recipe,i) => <Recipe data={recipe} key={i} onDelete={this.onDelete.bind(this,recipe.id)} />)}
        	</div>
        </div>
        <div className="row text-center">
          <Link to="/new"><button className="btn btn-lg btn-primary action-btn add-btn">Add</button></Link>
        </div>
      </div>
    );
  }

}
