using Microsoft.EntityFrameworkCore;

namespace MissileSimulator_API.Models
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Missile>().HasData(
                new Missile { Id = 1, Name = "ATACMS", Type = "shortrange", Warhead = 230, Radius = 300, Range = 300000, Unlocked = true, Stage = 1 },
                new Missile { Id = 2, Name = "Iskander-M", Type = "shortrange", Warhead = 600, Radius = 450, Range = 500000, Unlocked = false, Stage = 2 },
                new Missile { Id = 3, Name = "SCUD-B", Type = "shortrange", Warhead = 985, Radius = 750, Range = 300000, Unlocked = false, Stage = 1 },
                
                new Missile { Id = 4, Name = "Trident II D5", Type = "longrange", Warhead = 450, Radius = 150, Range = 12000000, Unlocked = false, Stage = 1 },
                new Missile { Id = 5, Name = "Minuteman III", Type = "longrange", Warhead = 300, Radius = 200, Range = 13000000, Unlocked = false, Stage = 2 },
                new Missile { Id = 6, Name = "SS-27", Type = "longrange", Warhead = 1200, Radius = 200, Range = 11000000, Unlocked = false, Stage = 3 },
                new Missile { Id = 7, Name = "Tomahawk", Type = "longrange", Warhead = 450, Radius = 400, Range = 1600000, Unlocked = false, Stage = 4},
                new Missile { Id = 8, Name = "DF-21", Type = "longrange", Warhead = 600, Radius = 1500, Range = 140000, Unlocked = false, Stage = 5},
                new Missile { Id = 9, Name = "Hwasong-15", Type = "longrange", Warhead = 1000, Radius = 300, Range = 13000000, Unlocked = false, Stage = 6 },
                new Missile { Id = 10, Name = "Hwasong-17", Type = "longrange", Warhead = 2000, Radius = 300, Range = 15000000, Unlocked = false, Stage = 7 },
                new Missile { Id = 11, Name = "Agni-V", Type = "longrange", Warhead = 1500, Radius = 300, Range = 500000, Unlocked = false, Stage = 8 },
                new Missile { Id = 12, Name = "RS-24 Yars", Type = "longrange", Warhead = 1500, Radius = 300, Range = 12000000, Unlocked = false, Stage = 9 },
                new Missile { Id = 13, Name = "DF-41", Type = "longrange", Warhead = 2500, Radius = 300, Range = 15000000, Unlocked = false, Stage = 10 },
                new Missile { Id = 14, Name = "DF-5A", Type = "longrange", Warhead = 3000, Radius = 500, Range = 13000000, Unlocked = false, Stage = 11 },
                new Missile { Id = 15, Name = "RS-28 Sarmat", Type = "longrange", Warhead = 10000, Radius = 5000, Range = 18000000, Unlocked = false, Stage = 12 },
                new Missile { Id = 16, Name = "R-36M2 Voyevoda", Type = "longrange", Warhead = 8800, Radius = 500, Range = 16000000, Unlocked = false, Stage = 13 },
                new Missile { Id = 17, Name = "AN602", Type = "longrange", Warhead = 57000, Radius = 35000, Range = 20000000, Unlocked = false, Stage = 14});

            modelBuilder.Entity<Building>().HasData(
                new Building { Id = 1, Name = "Mainbase", Type = "base", Category = "base", Icon = "Images/mainBase.png", Income = 100, IconX = 30, IconY = 30, Stage = 1, Unlocked = true },
                new Building { Id = 2, Name = "Factory", Type = "economy", Category = "base", Icon = "Images/factory.png", Income = 200, IconX = 50, IconY = 50, Stage = 2, Unlocked = false },

                new Building { Id = 3, Name = "Shortrange Silo", Type = "shortrange", Category = "attack", Icon = "Images/shortrangeSilo.png", IconX = 30, IconY = 30, Stage = 1, Unlocked = true },
                new Building { Id = 4, Name = "Missilesilo", Type = "longrange", Category = "attack", Icon = "Images/missileSilo.png", IconX = 30, IconY = 30, Stage = 4, Unlocked = false },
               
                new Building { Id = 5, Name = "Airdefense", Type = "defense", Category = "defense", Icon = "Images/airDefense.png", IconX = 30, IconY = 30, HitOdds = 0.1, Stage = 1, Unlocked = true },
                new Building { Id = 6, Name = "Missiledefense", Type = "defense", Category = "defense", Icon = "Images/missileDefense.png", IconX = 30, IconY = 30, HitOdds = 0.02, Stage = 4, Unlocked = false});

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "Joshua", Password = "1234", Role = "admin" },
                new User { Id = 2, Username = "User", Password = "4321", Role = "user" });

        }
    }
}
