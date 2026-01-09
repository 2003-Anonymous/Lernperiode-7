namespace MissileSimulator_API.Models
{
    public class Building
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string Icon { get; set; }
        public int IconX { get; set; }
        public int IconY { get; set; }
        public int? Income { get; set; }
        public int? Range { get; set; }
        public double? HitOdds { get; set; }
        public bool Unlocked { get; set; }
        public int Stage { get; set; }
    }
}
