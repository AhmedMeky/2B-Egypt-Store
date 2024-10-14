using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace _2B_Egypt.Application.DTOs.CategoryDTOs;
public class CreateCategoryDTO
{
    public Guid Id { get; set; }
    [Required(ErrorMessage = " Arabic  name is required.")]
    [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
    public required string NameAr { get; set; }
    [Required(ErrorMessage = " English  name is required.")]
    [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
    public required string NameEn { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid? ParentCategoryId { set; get; }
}
