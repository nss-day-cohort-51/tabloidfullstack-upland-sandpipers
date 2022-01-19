using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : Controller
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;

        }
        [HttpGet]
        public ActionResult Index()
        {
            var tags = _tagRepository.GetAllTags();
            return Ok(tags);
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagRepository.CreateTag(tag);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Video video)
        {
            if (id != video.Id)
            {
                return BadRequest();
            }

            _videoRepository.Update(video);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _videoRepository.Delete(id);
            return NoContent();
        }
    }
}
