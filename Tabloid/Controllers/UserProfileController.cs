using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var users = _userProfileRepository.GetAllUserProfiles();
            return Ok(users);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("GetUserProfileByUserId/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileByUserId(id));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("GetDeactivated")]
        public IActionResult getDeactivated()
        {
            return Ok(_userProfileRepository.GetAllDeactivatedUserProfiles());
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut("aOrD/{userId}")]
        public IActionResult ActivateOrDeactivate(int userId)
        {
            var userTypeId = 3;
           var user = _userProfileRepository.GetUserProfileByUserId(userId);

            if(user.UserTypeId == 3)
            {
                userTypeId = 2;
            }

            _userProfileRepository.UpdateUserTypeId(userTypeId, userId);

            return NoContent();
        }
    }
}
