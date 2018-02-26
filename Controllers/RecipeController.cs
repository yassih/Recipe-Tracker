using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; //IActionResult comes from here
using System.Diagnostics;
using App.Models;
using App.Services;
using Microsoft.AspNetCore.Http;

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
                _dataService.AddRecipe(recipe);

                return Ok(recipe);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("[action]")]
        public IActionResult GetRecipes()
        {
            try
            {
                return Ok(_dataService.GetRecipes());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }

        }

        public IActionResult UploadImage(IFormFile Image)
        {
            try
            {
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetRecipe(string id)
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
    }
}
