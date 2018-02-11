using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using App.Models;
using App.Repository;

namespace App.Services
{
    public interface IDataService
    {
        void AddTheDamnRecipe(Recipe recipe);
        List<Recipe> getRecipes();
        Recipe GetRecipe(string id);
    }
}

