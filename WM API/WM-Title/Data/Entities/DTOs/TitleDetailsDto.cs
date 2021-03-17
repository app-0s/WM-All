using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WM_Title.Data.Entities.DTOs
{
    /// <summary>
    /// Data Transfer Object containing detailed information related to title
    /// </summary>
    public class TitleDetailsDto
    {
        public int TitleId { get; set; }
        public string TitleName { get; set; }
        public int? ReleaseYear { get; set; }
        public string BaseStoryLine { get; set; }
        public DateTime? ProcessedDateTimeUtc { get; set; }
        public ICollection<TitleAwardsDto> AwardsWon { get; set; }
        public ICollection<TitleAwardsDto> AwardsNominated { get; set; }
        public ICollection<string> AlternateNames { get; set; }
        public ICollection<TitleStoryLineDto> StoryLines { get; set; }
        public ICollection<TitleGenreDto> TitleGenres { get; set; }
        public ICollection<string> TitleParticipants { get; set; }
    }

}
