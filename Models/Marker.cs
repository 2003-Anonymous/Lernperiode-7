using System.Text.Json.Serialization;

namespace MissileSimulator_API.Models
{
    public class Marker
    {
        public int Id { get; set; }

        public int BuildingId { get; set; }
        public float Lat { get; set; }
        public float Lng { get; set; }

        [JsonIgnore]
        public int? SaveGameId { get; set; }

        [JsonIgnore]
        public SaveGame? SaveGame { get; set; }
    }
}
