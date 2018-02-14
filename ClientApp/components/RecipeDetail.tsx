import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

const DetailCard = styled.div`
    height: 600px;
    width: 800px;
    margin: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    display: flex;
`;
const Image = styled.div`
    width: 400px;
`;
const Details = styled.div`
    width: 400px;
`;

const Title = styled.div`
    color: #c9d0d4; 
    font-family: 'Helvetica Neue', sans-serif; 
    font-size: 46px; 
    font-weight: 100; 
    line-height: 50px; 
    letter-spacing: 1px; 
    padding: 0 0 40px; 
    border-bottom: double #555; 
    padding-top: 20px;
`;

const Ingredients = styled.div``;

const Instructions = styled.div`
    font-family: 'Helvetica Neue', sans-serif; 
    font-size: 12px;
`;

export class RecipeDetails extends React.Component<RouteComponentProps<{id: any}>,{recipe : any}>{

    constructor(){
       super(); 
       this.state = { recipe: {}}
       this.getRecipe = this.getRecipe.bind(this);
    }

    componentDidMount(){
        console.log('props:');
        console.log(this.props);
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
            <DetailCard>
                <Image>
                <img 
                    src={this.state.recipe.image}
                    height= {600}
                    width = {400}
                />
                </Image>
                <Details>
                    <Title>{this.state.recipe.title}</Title>
                    <Ingredients></Ingredients>
                    <Instructions>{this.state.recipe.instructions}</Instructions>
                    <ul>
                        {ingridientsList}
                    </ul>
                </Details>
            </DetailCard>
        );
    };
    
}