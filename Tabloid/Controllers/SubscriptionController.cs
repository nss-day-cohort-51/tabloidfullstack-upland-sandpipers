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
    public class SubscriptionController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IPostTagRepository _postTagRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;


        public SubscriptionController(IPostRepository postRepository, IPostTagRepository postTagRepository, ICategoryRepository categoryRepository, ICommentRepository commentRepository, IUserProfileRepository userProfileRepository, ISubscriptionRepository subscriptionRepository)
        {
            _postRepository = postRepository;
            _postTagRepository = postTagRepository;
            _categoryRepository = categoryRepository;
            _commentRepository = commentRepository;
            _subscriptionRepository = subscriptionRepository;
            _userProfileRepository = userProfileRepository;
        }

        // POST api/<SubscriptionController>
        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            subscription.BeginDateTime = DateTime.Now;
            _subscriptionRepository.Add(subscription);
            return NoContent();
        }

        // POST api/<SubscriptionController>
        [HttpPut]
        public IActionResult Put(Subscription subscription)
        {
            _subscriptionRepository.Update(subscription);
            return NoContent();
        }

        // POST api/<SubscriptionController>
        [HttpPut("CancelSubscription")]
        public IActionResult CancelSubscription(Subscription subscription)
        {
            subscription.EndDateTime = DateTime.Now;
            _subscriptionRepository.Update(subscription);
            return NoContent();
        }

        // DELETE api/<SubscriptionController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _subscriptionRepository.Delete(id);
            return NoContent();
        }

        // GET api/<SubscriptionController>/IsUserSubscribed/?subscriberUserId=1&providerUserId=2`,
        [HttpGet("UserProviderSubscription")]
        public IActionResult UserProviderSubscription(int subscriberUserId, int providerUserId)
        {
            var res = _subscriptionRepository.GetActiveUserProviderSubscrption(subscriberUserId, providerUserId);
            return Ok(res);
        }
    }
}
