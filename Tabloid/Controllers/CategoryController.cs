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
            public ActionResult Get(int id)
            {
            var category = _categoryRepository.GetCategoryById(id);
            return Ok(category);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.CreateCategory(category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
            public IActionResult Put(int id, [FromBody] Category category)
            {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(category);
            return NoContent();
        }
            
        }
    }
