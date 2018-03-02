import { IIngredient } from '../interfaces/IIngredient';

export interface IRecipe {
    id: string;
    title: string;
    instructions: string;
    imageBase64String: string;
    ingredients: IIngredient[];
    isEditing: boolean;
}
