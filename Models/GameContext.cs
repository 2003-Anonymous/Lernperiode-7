using Microsoft.EntityFrameworkCore;

namespace MissileSimulator_API.Models
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Seed();

            modelBuilder.Entity<User>()
                .HasOne(u => u.SaveGame)
                .WithOne(p => p.User)
                .HasForeignKey<SaveGame>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SaveGame>()
               .HasMany(s => s.Markers)
               .WithOne(m => m.SaveGame)
               .HasForeignKey(m => m.SaveGameId)
               .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Missile> Missiles => Set<Missile>();
        public DbSet<Building> Buildings => Set<Building>();
        public DbSet<User> Users => Set<User>();
        public DbSet<SaveGame> SaveGames => Set<SaveGame>();
        public DbSet<Marker> Markers => Set<Marker>();
    }
}
