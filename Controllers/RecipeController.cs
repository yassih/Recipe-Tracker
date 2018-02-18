using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; //IActonresult comes from here
using System.Diagnostics;
using App.Models;
using App.Services;

namespace App.Controllers
{
    [Route("api/[controller]")]
    public class RecipeController : Controller
    {
        internal readonly IDataService _dataService;
        public RecipeController(IDataService dataService)
        {
            _dataService = dataService;
        }
        //IDataService ds = new DataService();
        
        [HttpPost("[action]")]
        public IActionResult AddRecipe([FromBody]Recipe recipe)
        {
            try 
            {
                _dataService.AddTheDamnRecipe(recipe);
                return Ok(recipe);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }
            
        }
        [HttpGet("[action]")]
        public IActionResult getRecipes()
        //public List<Recipe> getRecipes()
        {
            try
            {
                return Ok(_dataService.getRecipes());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
            
        }
        [HttpGet("[action]")]
        public IActionResult getRecipe(string id)
        {
            try 
            {
                return Ok(_dataService.GetRecipe(id));
            }
            catch 
            {
                return BadRequest();
            }
        }

        public class RecipeDTO 
        {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Instructions {get; set;}
        public DateTime CreateDateTime { get; set; }
        public string Image { get; set; }
        public ICollection<IngridientDTO> Ingridients {get; set;}
        }

        public class IngridientDTO 
        {
            public string Name {get; set;}
        }


    }
}
