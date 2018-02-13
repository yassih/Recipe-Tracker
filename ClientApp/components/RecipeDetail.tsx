import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

const DetailBox = styled.div`
border: 2px solid green;
margin: 20px;
padding: 20px;
`;

export class RecipeDetails extends React.Component<RouteComponentProps<{id: any}>,{recipe : any}>{

    constructor(){
       super(); 
       this.state = { recipe: {}}
       this.getRecipe = this.getRecipe.bind(this);
    }

    componentDidMount(){
        this.getRecipe(this.props.match.params.id);
    }

    public getRecipe(id: string){
        fetch('/api/Recipe/GetRecipe?id=' + id, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json()).then((data)=> {
            this.setState({recipe: data});
        });
    }

    public render(){
        const ingridientsList: any = ['just',' testing'];
        if(this.state.recipe.Ingridients){
            this.state.recipe.Ingridients.forEach((ingredient: any)=>{
                ingridientsList.push(<li>{ingredient.name}</li>);
            });
        }
        return(
            <div>
                <DetailBox>{this.state.recipe.title}</DetailBox>
                <DetailBox>{this.state.recipe.instructions}</DetailBox>
                <ul>
                    {ingridientsList}
                </ul>
            </div>
        );
    };
    
}