using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Egypt.Application.DTOs.CategoryDTOs
{
    public class SubCategoryDTO
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
      
    }
}
