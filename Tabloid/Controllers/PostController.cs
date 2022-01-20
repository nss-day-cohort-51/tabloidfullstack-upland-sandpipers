using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Authorize]
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
            if (!IsAllowedAuthorPermissions())
            {
                return Unauthorized();
            }

            var posts = _postRepository.GetAllPublishedPosts();
            return Ok(posts);
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (!IsAllowedAuthorPermissions())
            {
                return Unauthorized();
            }

            var post = _postRepository.GetPublishedPostById(id);
            return Ok(post);
        }


        [HttpPost]
        public IActionResult Post(Post post)
        {
            if (!IsAllowedAuthorPermissions())
            {
                return Unauthorized();
            }

            post.CreateDateTime = DateTime.Now;
            post.PublishDateTime = DateTime.Now;
            _postRepository.Add(post);
            return NoContent();
        }

        [HttpGet("GetPostsByUserId/{id}")]
        public IActionResult GetByUserId(int id)
        {
            if (!IsAllowedAuthorPermissions())
            {
                return Unauthorized();
            }

            var posts = _postRepository.GetPostsByUserId(id);
            return Ok(posts);
        }

        // POST api/<PostController>

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (!IsAllowedAuthorPermissions() && IsUserWithThisId(id))
            {
                return Unauthorized();
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!(IsUserWithThisId(id) && IsAllowedAuthorPermissions()) && !IsAllowedAdminPermissions())
            {
                return Unauthorized();
            }
            _postRepository.Delete(id);
            return NoContent();
        }

        public bool IsAllowedAuthorPermissions()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var currentUserProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            string currentUserType = currentUserProfile.UserType.Name;

            var globalPermissions = new List<string>()
            {
                "admin", "author", "proposed_deactivate", "proposed_demote"
            };

            return globalPermissions.Contains(currentUserType);
        }

        public bool IsAllowedAdminPermissions()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var currentUserProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            string currentUserType = currentUserProfile.UserType.Name;

            var adminPermissions = new List<string>()
            {
                "admin", "proposed_demote"
            };

            return adminPermissions.Contains(currentUserType);
        }

        public bool IsUserWithThisId(int id)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var currentUserProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            return currentUserProfile.Id == id;
        }

    }
}
