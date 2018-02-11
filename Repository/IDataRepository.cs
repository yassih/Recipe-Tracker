using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using App.Models;

namespace App.Repository
{
    public interface IDataRepository
    {
        void createRecipe(Recipe recipe);
        List<Recipe> getAllRecipes();
        Recipe GetRecipe(Guid id);

    }
}

