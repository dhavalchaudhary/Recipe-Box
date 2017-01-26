import React, {Component} from 'react';
import {Link} from 'react-router';
import uuid from 'uuid';
import {saveDataToStorage,getDataFromStorage} from '../utils/helper';

export default class EditBox extends Component{
  constructor(){
    super();
    this.state = {
      recipe : {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount(){
    this.allRecipes = getDataFromStorage(this.props);
    if (this.props.location.pathname.split('/')[1] === 'edit'){
      const {id} = this.props.params;
      this.setState({recipe:this.allRecipes.filter(i => i.id === id)[0]});
    }
    else{
      this.setState({recipe:{
          title:"",
          time:0,
          ingredients:[],
          instructions:[],
          id:uuid.v4()
        }
      });
    }
  }

  onDelete(type,text){
    let arr = this.state.recipe[type];
    this.setState({recipe:Object.assign(
      {},
      this.state.recipe,
      {[type] : arr.filter(i => i !== text)}
    )});
  }

  getList(arr=[],type){
    return arr.map((i,j) =>  <li key={j} onClick={this.onDelete.bind(this,type,i)}>{i}</li>
    );
  }

  onAdd(e){
    //detect mouse and keyboard events
    if(e.type === 'click' || e.charCode === 13){
      e.preventDefault();
      let {name} = e.target;
      const {value} = document.querySelector(`[name=${name}]`);
      name = name.toLowerCase();
      this.setState({recipe:Object.assign(
        {},
        this.state.recipe,
        {[name]: [...this.state.recipe[name],value]}
      )},() => this.refs.editForm.reset());
    }
  }

  handleChange(e){
    const {name ,value} = e.target;
    this.setState({recipe:Object.assign(
      {},
      this.state.recipe,
      {[name.toLowerCase()]: value}
    )});
  }

  onSave(){
    const getNewData = (data,page) => {
      let {recipe} = this.state;
      if(page === 'edit'){
        return data.map((item) => {
          if(item.id === this.props.params.id){
            return recipe;
          }
          return item;
        });
      }
      return [...data,recipe];
    };
    saveDataToStorage(getNewData(this.allRecipes,this.props.location.pathname.split('/')[1]));
  }

  render(){
    const {title="",time=0,ingredients=[],instructions=[],id} = this.state.recipe;
    const ingredientsList = this.getList(ingredients,'ingredients');
		const instructionsList = this.getList(instructions,'instructions');
    const currentPage = this.props.location.pathname.split('/')[1];
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="page-name text-center"><span>{currentPage === 'edit' ? 'Edit Recipe' : 'Add Recipe'}</span></h1>
            </div>
          </div>
        </div>
  			<div className="editBox">
  	    	<div className="container">
  	    		<div className="row no-gutter">
  	    			<div className="col-xs-12 col-md-8 col-md-offset-2">
  				    	<div className="box-wrapper">
  				    		<form className="form-horizontal" ref="editForm">
  								  <div className="form-group">
  								    <label className="col-xs-12 col-sm-2 control-label">Title</label>
  								    <div className="col-xs-10 col-sm-8">
  								      <input className="form-control" placeholder="Title" name='Title' value={title} onChange={this.handleChange} />
  								    </div>
  								  </div>
  								  <div className="row hidden-xs">
  								  	<div className="col-xs-0 col-sm-8 col-sm-offset-2">
  								  		<ul className="list-unstyled list-inline ">
  										  	{ingredientsList}
  										  </ul>
  								  	</div>
  								  </div>
  								  <div className="form-group">
  								    <label className="col-xs-12 col-sm-2 control-label">Ingredients</label>
  								    <div className="row hidden-sm">
  									  	<div className="col-xs-10 col-sm-0 form-control-wrapper">
  									  		<ul className="list-unstyled list-inline ">
  											  	{ingredientsList}
  											  </ul>
  									  	</div>
  									  </div>
  								    <div className="col-xs-10 col-sm-8 form-control-wrapper">
  								      <input className="form-control" placeholder="Ingredients" name='Ingredients' onKeyPress={this.onAdd} />
  								    </div>
  								    <div className="col-xs-2 col-sm-2 action-btn-wrapper">
  									    <button className="btn btn-primary action-btn" name='Ingredients' onClick={this.onAdd} >+</button>
  								    </div>
  								  </div>
  								  <div className="row hidden-xs">
  								  	<div className="col-xs-0 col-sm-8 col-sm-offset-2">
  								  		<ul className="list-unstyled">
  										  	{instructionsList}
  										  </ul>
  								  	</div>
  								  </div>
  							    <div className="form-group">
  								    <label className="col-xs-12 col-sm-2 control-label">Instructions</label>
  								    <div className="row hidden-sm">
  									  	<div className="col-xs-10 col-sm-0 form-control-wrapper">
  									  		<ul className="list-unstyled">
  											  	{instructionsList}
  											  </ul>
  									  	</div>
  									  </div>
  								    <div className="col-xs-10 col-sm-8 form-control-wrapper">
  								      <input className="form-control" placeholder="Instructions" name='Instructions' onKeyPress={this.onAdd} />
  								    </div>
  								    <div className="col-xs-2 col-sm-2 action-btn-wrapper">
  								      <button className="btn btn-primary action-btn" name='Instructions' onClick={this.onAdd}>+</button>
  								    </div>
  								  </div>
  								  <div className="form-group">
  								    <label className="col-xs-12 col-sm-2 control-label">Time (mins)</label>
  								    <div className="col-xs-10 col-sm-8">
  								      <input className="form-control" placeholder="Time in minutes" name='Time' value={time} onChange={this.handleChange} />
  								    </div>
  								  </div>
  								  <div className="row">
  								    <Link to="/"><button className="btn btn-primary action-btn editBox-action-btn" onClick={this.onSave}>Save</button></Link>
  						        <Link to="/"><button className="btn btn-primary action-btn editBox-action-btn">Cancel</button></Link>
  								  </div>
  								</form>
  				    	</div>
  	    			</div>
  	    		</div>
  	    	</div>
  	    </div>
      </div>
		);
  }
}
