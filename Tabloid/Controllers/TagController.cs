using Microsoft.AspNetCore.Authorization;
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
    public class TagController : Controller
    {
        private readonly ITagRepository _tagRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public TagController(ITagRepository tagRepository, IUserProfileRepository userProfileRepository)
        {
            _tagRepository = tagRepository;
            _userProfileRepository = userProfileRepository
        }

        [HttpGet]
        public ActionResult Index()
        {
            if (!IsAllowedAuthorPermissions())
            {
                return Unauthorized();
            }

            var tags = _tagRepository.GetAllTags();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public ActionResult Index(int id)
        {
            if (!IsAllowedAuthorPermissions())
            {
                return Unauthorized();
            }

            var tag = _tagRepository.GetTagById(id);
            return Ok(tag);
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            if (!IsAllowedAdminPermissions())
            {
                return Unauthorized();
            }

            _tagRepository.CreateTag(tag);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (!IsAllowedAdminPermissions())
            {
                return Unauthorized();
            }

            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepository.Update(tag);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!IsAllowedAdminPermissions())
            {
                return Unauthorized();
            }

            _tagRepository.Delete(id);
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

    }
}
