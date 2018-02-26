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
        void AddRecipe(Recipe recipe);
        List<Recipe> GetRecipes();
        Recipe GetRecipe(string id);
    }
}

