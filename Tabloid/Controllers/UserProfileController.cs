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

        [HttpGet("GetDeactivatedIds")]
        public IActionResult getDeactivatedIds()
        {
            return Ok(_userProfileRepository.GetAllDeactivatedUserIds());
        }

        [HttpGet("GetDeactivatedUserEmails")]
        public IActionResult getDeactivatedEmails()
        {
            return Ok(_userProfileRepository.GetAllDeactivatedUserEmails());
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

        [HttpPut("ActivateOrDeactivate/{userId}")]
        public IActionResult ActivateOrDeactivate(int userId)
        {
            var userTypeId = 3;
            var user = _userProfileRepository.GetUserProfileByUserId(userId);
            var adminCount = _userProfileRepository.CountAdmins();
            
            if(user.UserTypeId == 1 && adminCount < 2)
            {
                return BadRequest();
            }
            else if(user.UserTypeId == 3)
            {
                userTypeId = 2;

                _userProfileRepository.UpdateUserTypeId(userTypeId, userId);

                return NoContent();
            }
            else
            {
                _userProfileRepository.UpdateUserTypeId(userTypeId, userId);

                return NoContent();
            }
        }

        [HttpPut("UpdateUserType/{userId}")]
        public IActionResult UpdateUserType(UserProfile profile)
        {

            _userProfileRepository.UpdateUserTypeId(profile.UserTypeId, profile.Id);

            return NoContent();
        }

        [HttpGet("CountAdmins")]
        public IActionResult CountAdmins()
        {
            return Ok(_userProfileRepository.CountAdmins());
        }
    }
}
