using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeHealthyProject.Entities.Dtos
{
	public class ShowDietitianDto
	{
		public string Username { get; set; }
		public string? Nickname { get; set; }
		public string? Specialization { get; set; }
		public List<string> Certifications { get; set; } = new List<string>();
		public int? Experience { get; set; }
        public bool isComplete { get; set; }
    }
}
