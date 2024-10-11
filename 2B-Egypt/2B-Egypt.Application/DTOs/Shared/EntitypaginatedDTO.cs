using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Egypt.Application.DTOs.Shared
{
    public class EntitypaginatedDTO<T>
    {
        public List<T> Data { get; set; }
        public int Count { get; set; }
    }
}
