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
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IPostTagRepository _postTagRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;


        public PostController(IPostRepository postRepository, IPostTagRepository postTagRepository, ICategoryRepository categoryRepository, ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _postTagRepository = postTagRepository;
            _categoryRepository = categoryRepository;
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<PostController>
        [HttpGet]
        public IActionResult Index()
        {
            var posts = _postRepository.GetAllPublishedPosts();
            return Ok(posts);
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);
            return Ok(post);
        }


        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            post.PublishDateTime = DateTime.Now;
            _postRepository.Add(post);
            return NoContent();
        }

        [HttpGet("GetPostsByUserId/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var posts = _postRepository.GetPostsByUserId(id);
            return Ok(posts);
        }

        [HttpGet("GetPostByCategoryId/{id}")]
        public IActionResult GetPostsByCategoryId(int id)
        {
            var posts = _postRepository.GetPostsByCatId(id);
            return Ok(posts);
        }

        // POST api/<PostController>

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }



        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _postRepository.Delete(id);
        }
        [HttpGet("GetSubscribedPosts/{id}")]
        public IActionResult GetSubscribedPosts(int id)
        {
          var posts =  _postRepository.GetAllSubscribedPosts(id);
            return Ok(posts);
        }
    }
}
