using System.Text.Json.Serialization;

namespace MissileSimulator_API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public SaveGame SaveGame { get; set; } = null!;
    }
}
