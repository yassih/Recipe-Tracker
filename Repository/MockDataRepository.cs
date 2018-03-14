using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using App.Models;
using App.DataStore;

namespace App.Repository
{
    public class MockDataRepository : IDataRepository
    {
        internal readonly ApplicationDbContext _db;
        internal readonly RecipeStore _rs;
        //private static List<Recipe> _recipes;

        public MockDataRepository(RecipeStore rs)
        {
            _rs = rs;
        }
        public void CreateRecipe(Recipe recipe)
        {
           _rs.recipes.Add(recipe);
        }

        public List<Recipe> GetAllRecipes()
        {
            try
            {
                return _rs.recipes;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public Recipe GetRecipeById(Guid recipeId)
        {
             return _rs.recipes.FirstOrDefault(x => x.Id == recipeId);
            // try
            // {
            //     return _recipes.FirstOrDefault(x => x.Id == recipeId);
            // }
            // catch
            // {
            //     return null;
            // }
        }
    }
}

