using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace App.Models
{
    public class Recipe
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime CreateDateTime { get; set; }
        
    }
}