import { IIngredient } from '../interfaces/IIngredient';

export interface IRecipe {
    id: string,
    title: string,
    instructions: string
    image: string
    ingredients: IIngredient[]
}

