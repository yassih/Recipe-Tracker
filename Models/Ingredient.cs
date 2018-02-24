using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace App.Models
{
    public class Ingridient
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Measurement { get; set;} 
        public Recipe Recipe { get; set; }

    }
}