using System.Text.Json.Serialization;

namespace MissileSimulator_API.Models
{
    public class SaveGame
    {
        public int Id { get; set; }

        public int Money { get; set; }
        public int UserId { get; set; }
        

        public int ShortrangeStage { get; set; }
        public int LongrangeStage { get; set; }

        public ICollection<Marker> Markers { get; set; } = new List<Marker>();

        [JsonIgnore]
        public User? User { get; set; }
    }
}
