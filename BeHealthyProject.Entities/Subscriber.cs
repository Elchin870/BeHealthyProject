using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeHealthyProject.Entities
{
	public class Subscriber
	{
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public Dietitian Dietitian { get; set; }
        public List<User> Subscribers { get; set; } = new List<User>();
    }
}
