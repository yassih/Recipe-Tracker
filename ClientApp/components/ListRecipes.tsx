import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';

const Container = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
`;

export class ListRecipes extends React.Component<RouteComponentProps<{}>, { recipesSource: any, loading: boolean }> {
    constructor() {
        super();
        this.listRecipes = this.listRecipes.bind(this);

        this.state = {
            recipesSource: [], loading: true
        };
    }

     public componentDidMount() {
        this.listRecipes();
    }

    private listRecipes(): void {
        console.log(' clicked');
        fetch('/api/Recipe/getRecipes', {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            this.setState({ recipesSource: data, loading: false });
        });
    }

    public render() {
        let recipeList: any = [];
        if (this.state.recipesSource.length > 0) {
            this.state.recipesSource.forEach((recipe: any) => {
                console.log('printing id');
                console.log(recipe.id);
                recipeList.push(<RecipeCard key={recipe.id} title={recipe.title} recipeId={recipe.id} image={recipe.imageBase64String}></RecipeCard>);
            });
        } else {
            recipeList.push(<li>No Recipe Available</li>);
        }

        return (
            <Container>
                {recipeList}
            </Container>

        );
    }
}
