using System;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using App.Models;

namespace App.Models
{
    public class Recipe
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Instructions {get; set;}
        public string Image { get; set; }
        public ICollection<Ingridient> Ingridients {get; set;}
    }
}