using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Egypt.Application.DTOs.CategoryDTOs
{
    public class CategoryWithRelatedProducts
    {
        public Guid Id { get; set; }
        [Required(ErrorMessage = " Arabic  name is required.")]
        [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public required string NameAr { get; set; }
        [Required(ErrorMessage = " English  name is required.")]
        [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public required string NameEn { get; set; } 
        public string Email { get; set; } 
        public IEnumerable<ProductDTO> RelatedProducts { set; get; }
    }
}
