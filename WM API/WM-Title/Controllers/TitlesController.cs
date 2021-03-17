using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WM_Title.Data.Entities;
using WM_Title.Data.Entities.DTOs;
using WM_Title.Data.Repository;

namespace WM_Title.Controllers
{
    [Route("api/[Controller]")]
    public class TitlesController : ControllerBase
    {
        // readonly properties to prevent tampering
        private readonly ITitlesRepository _repository;
        private readonly ILogger<TitlesController> _logger;

        public TitlesController(ITitlesRepository repository, ILogger<TitlesController> logger)
        {
            _repository = repository;
            _logger = logger;

        }


        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Title>> GetTitle(int id)
        {
            try
            {
                var results = _repository.GetTitle(id);

                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving titles: {ex}");
                return BadRequest("Orders, bad request");
            }
        }


        [HttpGet("search/qtitle={titleSearchText}")]
        [HttpGet]
        public ActionResult<IEnumerable<Title>> GetTitles(string titleSearchText)
        {
            try
            {
                var results = _repository.GetTitles(titleSearchText);

                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving titles: {ex}");
                return BadRequest("Orders, bad request");
            }
        }

        [HttpGet("details/{id}")]
        public ActionResult<TitleDetailsDto> GetTitleDetails(int id)
        {
            try
            {
                var result = _repository.GetTitleDetails(id);

                if (result == null)
                    return BadRequest("Orders, bad request");

                // Create TitleDetailsDto 
                TitleDetailsDto titleDetails = new TitleDetailsDto();

                // Create collection of Dtos
                HashSet<TitleGenreDto> titleGenreDtos = new HashSet<TitleGenreDto>();
                HashSet<TitleStoryLineDto> titleStoryLineDtos = new HashSet<TitleStoryLineDto>();
                HashSet<TitleAwardsDto> titleAwardsWon = new HashSet<TitleAwardsDto>();
                HashSet<TitleAwardsDto> titleAwardsNominated = new HashSet<TitleAwardsDto>();

                // cycle through each title's genre, create DTO and add to collection
                foreach (var titleGenre in result.TitleGenres)
                {
                    titleGenreDtos.Add( new TitleGenreDto()
                    {
                        Id = titleGenre.Id,
                        GenreName = titleGenre.Genre.Name
                    });
                }

                // cycle through each title's storyline, create DTO and add to collection
                foreach (var storyLine in result.StoryLines)
                {
                    titleStoryLineDtos.Add(new TitleStoryLineDto()
                    {
                        Id = storyLine.Id,
                        Type = storyLine.Type,
                        Language = storyLine.Language,
                        Description = storyLine.Description
                    });
                }

                // cycle through each title's awards won and nominated, create DTO and add to collection
                foreach (var award in result.Awards.Where(x => x.AwardWon.Value).ToHashSet())
                {
                    titleAwardsWon.Add(new TitleAwardsDto()
                    {
                        Id = award.Id,
                        Award = award.Award1,
                        AwardYear = award.AwardYear,
                        AwardCompany = award.AwardCompany,
                        AwardWon = award.AwardWon
                    });
                }

                foreach (var award in result.Awards.Where(x => !x.AwardWon.Value).ToHashSet())
                {
                    titleAwardsNominated.Add(new TitleAwardsDto()
                    {
                        Id = award.Id,
                        Award = award.Award1,
                        AwardYear = award.AwardYear,
                        AwardCompany = award.AwardCompany,
                        AwardWon = award.AwardWon
                    });
                }

                // set properties
                titleDetails.TitleId = result.TitleId;
                titleDetails.TitleName = result.TitleName;
                titleDetails.ReleaseYear = result.ReleaseYear;
                titleDetails.AwardsWon = titleAwardsWon;
                titleDetails.AwardsNominated = titleAwardsNominated;
                titleDetails.BaseStoryLine = result.StoryLines.FirstOrDefault().Description;    // fill with first storyline
                titleDetails.AlternateNames = result.OtherNames.Select(x => x.TitleName).ToHashSet();
                titleDetails.StoryLines = titleStoryLineDtos;
                titleDetails.TitleGenres = titleGenreDtos;
                titleDetails.TitleParticipants = result.TitleParticipants.Select(x => x.Participant.Name).ToHashSet();


                return Ok(titleDetails);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving titles: {ex}");
                return BadRequest("Orders, bad request");
            }
        }
    }
    
}
