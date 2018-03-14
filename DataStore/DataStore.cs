using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using App.Models;

namespace App.DataStore
{
    public class RecipeStore
    {
        public List<Recipe> recipes;
        public RecipeStore()
        {
            recipes =  new List<Recipe>()
            {
                new Recipe()
                {
                    Id = Guid.NewGuid(),
                    Title = "Cake",
                    ImageBase64String = "data:image/jpeg;base64,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",
                    Ingredients = new List<Ingridient>()
                    {
                        new Ingridient()
                        {
                            Id = Guid.NewGuid(),
                            Name = "Flour",
                            Measurement = "5 cups"
                        }
                    },
                    Instructions = "Please Mix All"
                }
            };
        }

        // public static List<Recipe> Instance
        // {
        //     get
        //     {
        //         if(_recipes == null)
        //         {
        //             _recipes = new List<Recipe>();
        //         }
        //         return _recipes;
        //     }

        //     private set { }
        // }
    }
}
