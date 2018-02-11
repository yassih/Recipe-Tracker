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
        public void createRecipe(Recipe recipe)
        {
            try
            {
               recipe.Id = Guid.NewGuid();

             _db.Recipe.Add(recipe);
            var count = _db.SaveChanges();
            Console.WriteLine("{0} records saved to database", count);

            var a = _db.Recipe.FirstOrDefault(x => x.Id == new Guid("bc3634c1-aa2b-4ebc-9f8e-1e63c98a9a87"));
            List<Recipe> ap = _db.Recipe.ToList();
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public List<Recipe> getAllRecipes()
        {
            try
            {
                //return _db.Recipes.Where(image => image.IsCarouselImage == true).ToList();
                List<Recipe> ap = _db.Recipe.ToList();
                return ap;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public Recipe GetRecipe(Guid id)
        {
            try
            {
                return _db.Recipe.FirstOrDefault( x => x.Id == id);
            }
            catch
            {
                return null;
            }
        }

    }
}

