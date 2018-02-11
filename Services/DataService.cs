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
        //here
        internal readonly IDataRepository _dataRepository;
        public DataService(IDataRepository dataRepository)
        {

            //i did this too
            _dataRepository = dataRepository;
        }// use same name
        //public DataService() { }
        //i have a hard coded dependency on data repository
        //IDataRepository dr = new DataRepository();
        public void AddTheDamnRecipe(Recipe recipe)
        {
            try
            {
                List<Recipe> allRecipes = _dataRepository.getAllRecipes();
                foreach (var item in allRecipes)
                {
                    if(item.Title == recipe.Title)
                    {
                        throw new DuplicateNameException("duplicate name");
                    }
                }
                _dataRepository.createRecipe(recipe);
            }

            catch (DuplicateNameException ex)
            {
                throw ex;
            }

            catch (Exception)
            {
                throw new Exception("something went serriously wrong");
            }
        }

        public List<Recipe> getRecipes()
        {
            try
            {
                return _dataRepository.getAllRecipes();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public Recipe GetRecipe(string id)
        {
            try 
            {
                Guid recipeId;
                if(Guid.TryParse(id,out recipeId))
                {
                    return _dataRepository.GetRecipe(recipeId);
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

//make an interface for repsitory 