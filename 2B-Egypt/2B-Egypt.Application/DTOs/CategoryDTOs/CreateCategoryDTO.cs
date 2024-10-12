using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Egypt.Application.DTOs.CategoryDTOs
{
    public class CreateCategoryDTO
    {
        public Guid Id { get; set; }
        [Required(ErrorMessage = " Arabic  name is required.")]
        [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public required string NameAr { get; set; }
        [Required(ErrorMessage = " English  name is required.")]
        [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public required string NameEn { get; set; }
        public string Email { get; set; }
        [ForeignKey("ParentCategory")]
        public bool IsDeleted { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? ParentId { set; get; }
        public Category? ParentCategory { set; get; }
    }
}
