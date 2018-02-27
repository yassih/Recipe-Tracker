import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { AddRecipe } from './components/AddRecipe';
import { ListRecipes } from './components/ListRecipes';

export const routes = <Layout>
    <Route exact path='/' component={AddRecipe} />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/home' component={FetchData} />
    <Route path='/addrecipe/:id?' component={AddRecipe} />
    <Route path='/listrecipes' component={ListRecipes} />
</Layout>;
