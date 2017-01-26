import React,{Component} from 'react';
import { Link } from 'react-router';

export default class Recipe extends Component{
  constructor(){
    super();
    this.state = {
      viewMore:false
    }
    this.toggleState = this.toggleState.bind(this);
  }

  getList(arr){
    return arr.map((i,j) => {
      return(
        <div className="col-md-6" key={j}>
					<p className="card-category-list">{i}</p>
				</div>
      );
    });
  }

  toggleState(){
    this.setState({viewMore:!this.state.viewMore});
  }

  render(){
    const {title='',time=0,ingredients=[],instructions=[],id} = this.props.data;
    const ingredientsList = this.getList(ingredients);
		const instructionsList = this.getList(instructions);
    return(
      <div className="col-xs-12 col-md-8 col-md-offset-2 card-wrapper">
        <div className="card">
          <div className="card-block">
            <h2 className="card-title" onClick={this.toggleState}><span className="text-left">{title}</span><span className="pull-right">{`${time} mins`}</span></h2>
            <hr />
            {this.state.viewMore ?
              (<div className="more-info">
                <h3 className="card-category-title">Ingredients</h3>
                <div className="row">
                  {ingredientsList}
                </div>
                <hr />
                <h3 className="card-category-title">Instructions</h3>
                <div className="row">
                  {instructionsList}
                </div>
                <hr />
              </div> ) : ""
            }
            <Link to={`/edit/${id}`} className="btn btn-primary action-btn">Edit</Link>
            <button className="btn btn-primary action-btn" onClick={this.props.onDelete}>Delete</button>
            <button className="btn btn-primary action-btn pull-right" onClick={this.toggleState}>{this.state.viewMore ? "Less" : "More" } </button>
          </div>
        </div>
      </div>
    );
  }
}
