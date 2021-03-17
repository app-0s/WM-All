using System.Collections.Generic;
using WM_Title.Data.Entities;

namespace WM_Title.Data.Repository
{
    public interface ITitlesRepository
    {
        /// <summary>
        /// Retrieves result based on title id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Title GetTitle(int id);

        /// <summary>
        /// Retrieves collection of titles which contain title text
        /// </summary>
        /// <param name="titleSearchText"></param>
        /// <returns></returns>
        IEnumerable<Title> GetTitles(string titleSearchText);

        /// <summary>
        /// Retrieves title and related details
        /// </summary>
        /// <param name="titleId"></param>
        /// <returns></returns>
        Title GetTitleDetails(int titleId);
    }
}