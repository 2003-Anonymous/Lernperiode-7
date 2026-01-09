namespace MissileSimulator_API.Models
{
    public class Missile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Warhead { get; set; }
        public int Radius { get; set; }
        public int Range { get; set; }
        public bool Unlocked { get; set; }
        public int Stage { get; set; }
    }
}
