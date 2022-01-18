using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        [Required]
        public string SubscriberUserProfileId { get; set; }
        [Required]

        public string ProviderUserProfileId { get; set; }

        [Required]
        public DateTime BeginDateTime { get; set; }

        [Required]
        public DateTime EndDateTime { get; set; }

    }
}
