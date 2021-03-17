using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WM_Title.Data.Entities.DTOs
{
    public class TitleAwardsDto
    {
        public int Id { get; set; }
        public string Award { get; set; }
        public int? AwardYear { get; set; }
        public bool? AwardWon { get; set; }
        public string AwardCompany { get; set; }
    }
}
