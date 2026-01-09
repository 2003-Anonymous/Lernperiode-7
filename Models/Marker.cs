namespace MissileSimulator_API.Models
{
    public class Marker
    {
        public int Id { get; set; }

        public float X { get; set; }
        public float Y { get; set; }
        
        public int SaveGameId { get; set; }
        public SaveGame SaveGame { get; set; } = null!;
    }
}
