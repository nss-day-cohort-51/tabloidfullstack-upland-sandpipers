using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public Post Post { get; set; }
        [Required]
        [DisplayName("Post")]
        public int PostId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]
        [DisplayName("User Profile")]
        public int UserProfileId { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}
