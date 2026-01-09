using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MissileSimulator_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace MissileSimulator_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissileController : ControllerBase
    {
        private readonly GameContext _context;

        public MissileController(GameContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllMissiles()
        {
            var missiles = _context.Missiles.ToList();

            var result = missiles
                .GroupBy(m => m.Type)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(m => new
                    {
                        id = m.Id,
                        name = m.Name,
                        type = m.Type,
                        warhead = m.Warhead,
                        radius = m.Radius,
                        range = m.Range,
                        unlocked = m.Unlocked,
                        stage = m.Stage
                    })
                );

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetMissile(int id)
        {
            var missile = _context.Missiles.Find(id);

            if(missile == null)
            {
                return NotFound();
            }

            return Ok(missile);
        }

        [HttpPost]
        public async Task<ActionResult> PostMissile(Missile missile)
        {
            _context.Missiles.Add(missile);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetMissile),
                new { id = missile.Id },
                missile);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutMissile(int id, Missile missile)
        {
            _context.Entry(missile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!_context.Missiles.Any(m => m.Id == id))
                {
                    return NotFound();
                } else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMissile(int id)
        {
            var missile = await _context.Missiles.FindAsync(id);

            if(missile == null)
            {
                return NotFound();
            }

            _context.Missiles.Remove(missile);
            await _context.SaveChangesAsync();

            return Ok(missile);
        }
        
    }
}
