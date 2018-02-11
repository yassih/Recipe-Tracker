import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

const Divo = styled.div`
border: 2px solid green;
margin: 20px;
padding: 20px;
`;

export class RecipeDetails extends React.Component<RouteComponentProps<{id: string}>,{details : any}>{

    constructor(){
       super(); 
       this.state = { details: {}}
       this.getRecipe = this.getRecipe.bind(this);
    }

    componentDidMount(){
        this.getRecipe('84c5debf-97a2-4781-82ba-bf93dca8ae79');
    }

    public getRecipe(id: string){
        fetch('/api/Recipe/GetRecipe?id=' + id, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json()).then((data)=> {
            this.setState({details: data});
        });
    }

    public render(){
        return(
            <Divo>{this.state.details.title}</Divo>
        );
    };
    
}