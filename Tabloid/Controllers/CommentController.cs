using Microsoft.AspNetCore.Http;
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
    public class CommentController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IPostTagRepository _postTagRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;


        public CommentController(IPostRepository postRepository, IPostTagRepository postTagRepository, ICategoryRepository categoryRepository, ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postReposi    tory;
            _postTagRepository = postTagRepository;
            _categoryRepository = categoryRepository;
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<CommentController>
        //[HttpGet]
        //public IActionResult Index()
        //{
        //    var posts = _commentRepository.GetAll();
        //    return Ok(posts);
        //}

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public IActionResult Index(int id)
        {
            var posts = _commentRepository.GetAllCommentsByPostId(id);
            return Ok(posts);
        }

        [HttpGet("GetCommentsByPostId/{id}")]
        public IActionResult GetCommentsByPostId(int id)
        {
            var comments = _commentRepository.GetAllCommentsByPostId(id);
            return Ok(comments);
        }

        // POST api/Comment
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.CreateDateTime = DateTime.Now;

            _commentRepository.Add(comment);

            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _commentRepository.Delete(id);
        }
    }
}
