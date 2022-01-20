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
    public class ReactionsController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepository;
        public ReactionsController(IReactionRepository reactionRepository)
        {
            _reactionRepository = reactionRepository;
        }
        // GET: api/<ReactionsController>
        [HttpGet]
        public IActionResult getAll()
        {
            List<Reaction> reactions = _reactionRepository.GetAll();
            return Ok(reactions);
        }

        // POST api/<ReactionsController>
        [HttpPost]
        public IActionResult newReaction(Reaction reaction)
        {
            _reactionRepository.AddReaction(reaction);
            return Ok(reaction);
        }

        // DELETE api/<ReactionsController>/5
        [HttpGet("{id}")]
        public ActionResult ReactionById(int id)
        {
            Reaction reaction = _reactionRepository.GetById(id);
            return Ok(reaction);
        }

        // POST: ReactionController/Delete/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _reactionRepository.DeleteReaction(id);
            return Ok("reaction deleted");
        }
    }
}
