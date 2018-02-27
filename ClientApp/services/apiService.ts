import { IRecipe } from '../interfaces/IRecipe';

interface IApiService {
    addRecipe(recipe: IRecipe);
    //editRecipe
    //getRecipe
    //deleteRecipe
    //listRecipes
}

class ApiService implements IApiService {

    public addRecipe(recipe: IRecipe) {
        if (recipe.title === '') {
            return;
        }
        return fetch('/api/Recipe/AddRecipe', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        })
            //.then( (response) => response.json() as Promise<IRecipe>)
            .then((response) => {
                if (response.status === 200) {
                    return response.json().then((data) => {
                        return data;//as Promise<IRecipe>;
                    });
                } else {
                    return null;
                }
            });
    }

    public getRecipeById(recipeId: string) {
        return fetch(`/api/Recipe/GetRecipeById?recipeId=${recipeId}`, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            if (response.status === 200) {
                return response.json().then((data) => {
                    return data;//as Promise<IRecipe>;
                });
            } else {
                return null;
            }
        });
    }

}

export default new ApiService();
