using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Egypt.Application.DTOs
{
    public class ProductDTO
    { 
        public Guid Id { get; set; }
        [Required(ErrorMessage = "Arabic name is required.")]
        [MaxLength(100, ErrorMessage = "Arabic name cannot exceed 100 characters.")]
        public string NameAr { get; set; }

        [Required(ErrorMessage = "English name is required.")]
        [MaxLength(100, ErrorMessage = "English name cannot exceed 100 characters.")]
        public string NameEn { get; set; }

        [Required(ErrorMessage = "Arabic description is required.")]
        public string DescriptionAr { get; set; }
        [Required(ErrorMessage = "English description is required.")]
        public string DescriptionEn { get; set; }
        [Required(ErrorMessage = "Arabic color is required.")]
        public string ColorAr { get; set; }
        [Required(ErrorMessage = "English color is required.")]
        public string ColorEn { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive number.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Stock quantity is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Stock quantity must be a non-negative number.")]
        public int UnitInStock { get; set; }

        [Range(0, 99, ErrorMessage = "Discount must be a non negative number less than 100")]
        public int Discount { get; set; }

    }
}
