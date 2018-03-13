using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using App.Models;
using App.Repository;
using App.CustomExceptions;

namespace App.Services
{
    public class DataService : IDataService
    {
        internal readonly IDataRepository _dataRepository;
        public DataService(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }
        public void AddRecipe(Recipe recipe)
        {
            try
            {
                if (recipe.Title.Trim() == "")
                {
                    throw new Exception("Recipe title cannot be empty!");
                }

                List<Recipe> allRecipes = _dataRepository.GetAllRecipes();
                if (allRecipes != null)
                {
                    foreach (var item in allRecipes)
                    {
                        if (item.Title == recipe.Title)
                        {
                            throw new DuplicateNameException("duplicate name");
                        }
                    }
                }

                _dataRepository.CreateRecipe(recipe);
            }

            catch (DuplicateNameException ex)
            {
                throw ex;
            }

            catch (Exception ex)
            {
                if (ex.Message == "Recipe name cannot be empty!")
                {
                    throw ex;
                }
                else
                {
                    throw new Exception("Something went serriously wrong!");
                }
            }
        }

        public List<Recipe> GetRecipes()
        {
            try
            {
                return _dataRepository.GetAllRecipes();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public Recipe GetRecipeById(string id)
        {
            try
            {
                Guid recipeId;
                if (Guid.TryParse(id, out recipeId))
                {
                    return _dataRepository.GetRecipeById(recipeId);
                }
                else
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }
        }
    }
}