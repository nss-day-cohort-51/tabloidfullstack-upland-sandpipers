using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class PostReaction
    {
        public int Id { get; set; }
        [Required]
        [DisplayName("ReactionId")]
        public int ReactionId { get; set; }
       
        public Reaction Reaction { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int UserProfileId { get; set; }

    }
}
