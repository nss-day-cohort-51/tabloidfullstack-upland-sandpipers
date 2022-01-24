using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostReactionController : ControllerBase
    {

        private readonly IPostReactionRepository _postReactionRepository;
        public PostReactionController( IPostReactionRepository postReactionRepository)
        {
           
            _postReactionRepository = postReactionRepository;
          
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var postReaction = _postReactionRepository.GetById(id);
            return Ok(postReaction);
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var postReaction = _postReactionRepository.GetAll();
            return Ok(postReaction);
        }

        [HttpGet("PostReactionsBy/{id}")]
        public IActionResult GetByPostId(int id)
        {
            var postReactions = _postReactionRepository.GetPostReactionsByPostId(id);
            return Ok(postReactions);
        }

        // POST api/<PostReactionController>
        [HttpPost]
        public IActionResult Post(PostReaction postReaction)
        {
            _postReactionRepository.Add(postReaction);
            return NoContent();
        }

        // DELETE api/<PostReactionController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postReactionRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("ClearPostReactions/{id}")]
        public IActionResult ClearPostReactions(int id)
        {
            _postReactionRepository.clearPostReactionsForPost(id);
            return NoContent();
        }
    }
}
