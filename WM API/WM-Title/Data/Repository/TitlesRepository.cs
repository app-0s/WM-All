using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WM_Title.Data.Entities;

namespace WM_Title.Data.Repository
{
    public class TitlesRepository : ITitlesRepository
    {
        private readonly TitlesContext _ctx;
        private readonly ILogger<TitlesRepository> _logger;

        public TitlesRepository(TitlesContext ctx, ILogger<TitlesRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        /// <summary>
        /// Retrieves result based on title id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Title GetTitle(int id)
        {
            return _ctx.Titles.FirstOrDefault(p => p.TitleId == id);
        }

        /// <summary>
        /// Retrieves collection of titles which contain title text
        /// </summary>
        /// <param name="titleSearchText"></param>
        /// <returns></returns>
        public IEnumerable<Title> GetTitles(string titleSearchText)
        {
            return _ctx.Titles.Where(p => p.TitleName.Contains(titleSearchText)).OrderBy(x => x.TitleNameSortable).ToList();
        }

        /// <summary>
        /// Retrieves title and related details
        /// </summary>
        /// <param name="titleId"></param>
        /// <returns></returns>
        public Title GetTitleDetails(int titleId)
        { 
            return _ctx.Titles.Include(p => p.TitleParticipants).ThenInclude(o => o.Participant)
                                         .Include(a => a.Awards)
                                         .Include(p => p.OtherNames)
                                         .Include(p => p.TitleGenres).ThenInclude(g => g.Genre)
                                         .Include(p => p.StoryLines)
                                         .FirstOrDefault(p => p.TitleId == titleId);
        }

    }
}
