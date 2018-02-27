using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using App.Models;

namespace App.Repository
{
    public class DataRepository : IDataRepository
    {
        internal readonly ApplicationDbContext _db;
        public DataRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public void CreateRecipe(Recipe recipe)
        {
            try
            {
                _db.Recipe.Add(recipe);
                var count = _db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public List<Recipe> GetAllRecipes()
        {
            try
            {
                List<Recipe> recipes = _db.Recipe.ToList();
                return recipes;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public Recipe GetRecipeById(Guid recipeId)
        {
            try
            {
                return _db.Recipe.FirstOrDefault(x => x.Id == recipeId);
            }
            catch
            {
                return null;
            }
        }
    }
}

