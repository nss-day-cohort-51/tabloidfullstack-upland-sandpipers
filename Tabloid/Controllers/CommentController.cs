using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
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
            _postRepository = postRepository;
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
            if (!IsAllowedAuthorPermissions())
            {
                return Unauthorized();
            }
            var posts = _commentRepository.GetAllCommentsByPostId(id);
            return Ok(posts);
        }

        [HttpGet("GetCommentsByPostId/{id}")]
        public IActionResult GetCommentsByPostId(int id)
        {
            if (!IsAllowedAuthorPermissions())
            {
                return Unauthorized();
            }

            var comments = _commentRepository.GetAllCommentsByPostId(id);
            return Ok(comments);
        }

        // POST api/Comment
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            if (!(IsAllowedAuthorPermissions()))
            {
                return Unauthorized();
            }
            var posts = _commentRepository.GetAllCommentsByPostId(id);
            return Ok(posts);

            comment.CreateDateTime = DateTime.Now;

            _commentRepository.Add(comment);

            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            if (!(IsAllowedAuthorPermissions() && IsCurrentUsersComment(id)))
            {
                return Unauthorized();
            }
            return Ok("Not Implemented");
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!(IsAllowedAuthorPermissions() && IsCurrentUsersComment(id)) && !IsAllowedAdminPermissions())
            {
                return Unauthorized();
            }
            return Ok("Not Implemented");
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

        public bool IsCurrentUsersComment(int commentId)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var currentUserProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            int currentUserId = currentUserProfile.Id;

            Comment comment = _commentRepository.GetCommentById(commentId);

            return comment.UserProfileId == currentUserId;
        }
    }
}
