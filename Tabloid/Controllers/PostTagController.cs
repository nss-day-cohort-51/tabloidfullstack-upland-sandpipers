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
    public class PostTagController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IPostTagRepository _postTagRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;


        public PostTagController(IPostRepository postRepository, IPostTagRepository postTagRepository, ICategoryRepository categoryRepository, ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _postTagRepository = postTagRepository;
            _categoryRepository = categoryRepository;
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<PostTagController>
        //[HttpGet]
        //public IActionResult Index()
        //{
        //    var posts = _postTagRepository.GetAll();
        //    return Ok(posts);
        //}

        // GET api/<PostTagController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var postTag = _postTagRepository.GetById(id);
            return Ok(postTag);
        }

        [HttpGet("GetPostTags/{id}")]
        public IActionResult GetByPostId(int id)
        {
            var postTags = _postTagRepository.GetPostTagsByPostId(id);
            return Ok(postTags);
        }

        // POST api/<PostTagController>
        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.Add(postTag);
            return NoContent();
        }

        // DELETE api/<PostTagController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postTagRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("ClearPostTags/{id}")]
        public IActionResult ClearPostTags(int id)
        {
            _postTagRepository.clearPostTagsForPost(id);
            return NoContent();
        }
    }
}
