import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { AddRecipe } from './components/AddRecipe';
import { ListRecipes } from './components/ListRecipes';
import { RecipeDetails } from './components/RecipeDetail';

export const routes = <Layout>
    <Route exact path='/' component={AddRecipe} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/home' component={FetchData} />
    <Route path='/addrecipe/:id?' component={AddRecipe} />
    <Route path='/listrecipes' component={ListRecipes} />
    <Route path='/recipedetails/:id' component={RecipeDetails} />

</Layout>;
