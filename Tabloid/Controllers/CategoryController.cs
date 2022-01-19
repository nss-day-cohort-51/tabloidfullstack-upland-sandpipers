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
    public class CategoryController : ControllerBase
    {
            private readonly IPostRepository _postRepository;
            private readonly IPostTagRepository _postTagRepository;
            private readonly ICategoryRepository _categoryRepository;
            private readonly ICommentRepository _commentRepository;
            private readonly IUserProfileRepository _userProfileRepository;


            public CategoryController(IPostRepository postRepository, IPostTagRepository postTagRepository, ICategoryRepository categoryRepository, ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
            {
                _postRepository = postRepository;
                _postTagRepository = postTagRepository;
                _categoryRepository = categoryRepository;
                _commentRepository = commentRepository;
                _userProfileRepository = userProfileRepository;
            }

            // GET: api/<CategoryController>
            [HttpGet]
            public IActionResult Index()
            {
                var posts = _categoryRepository.GetAllCategories();
                return Ok(posts);
            }

            // GET api/<CategoryController>/5
            [HttpGet("{id}")]
            public string Get(int id)
            {
                return "value";
            }

        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.CreateCategory(category);
            return NoContent();
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
            public void Put(int id, [FromBody] string value)
            {
            }

            // DELETE api/<CategoryController>/5
            [HttpDelete("{id}")]
            public void Delete(int id)
            {
            }
        }
    }
