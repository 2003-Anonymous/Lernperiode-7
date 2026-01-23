using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MissileSimulator_API.Models;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace MissileSimulator_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        private readonly GameContext _context;

        public BuildingController(GameContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllBuildings()
        {
            var buildings = _context.Buildings.ToList();

            var result = buildings
                .GroupBy(m => m.Category)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(b => new Building
                    {
                        Id = b.Id,
                        Name = b.Name,
                        Type = b.Type,
                        Category = b.Category,
                        Income = b.Income,
                        Icon = b.Icon,
                        IconX = b.IconX,
                        IconY = b.IconY,
                        Unlocked = b.Unlocked,
                        Stage = b.Stage,
                        Range = b.Range,
                        HitOdds = b.HitOdds
                    })
                );

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetBuilding(int id)
        {
            var building = await _context.Buildings.FindAsync(id);

            if(building == null)
            {
                return NotFound();
            }

            return Ok(building);
        }

        [HttpPost]
        public async Task<ActionResult> PostBuilding(Building building)
        {
            _context.Buildings.Add(building);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetBuilding),
                new { id = building.Id },
                building);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutBuilding(int id, [FromBody]Building building)
        {
            _context.Entry(building).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!_context.Buildings.Any(b => b.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBuilding(int id)
        {
            var building = await _context.Buildings.FindAsync(id);

            if(building == null)
            {
                return NotFound();
            }

            _context.Buildings.Remove(building);
            await _context.SaveChangesAsync();

            return Ok(building);
        }
    }
}
