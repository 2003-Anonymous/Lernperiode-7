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
    public class SaveController : ControllerBase
    {
        private readonly GameContext _context;

        public SaveController(GameContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //public async Task<ActionResult> GetAllSaves()
        //{

        //}

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSave(int id)
        {
            //Wird benötigt, weil Navigation Properties nicht automatisch geladen werden.
            var save = await _context.SaveGames
                .Include(s => s.Markers)
                .FirstOrDefaultAsync(s => s.Id == id);

            if(save == null)
            {
                return NotFound();
            }

            return Ok(save);
        }

        [HttpPost]
        public async Task<ActionResult> PostSave(SaveGame dto)
        {
           
            var existing = await _context.SaveGames
                .Include(s => s.Markers)
                .FirstOrDefaultAsync(s => s.UserId == dto.UserId);

            if (existing != null)
            {
                existing.Money = dto.Money;
                existing.ShortrangeStage = dto.ShortrangeStage;
                existing.LongrangeStage = dto.LongrangeStage;

                _context.Markers.RemoveRange(existing.Markers);

                foreach (var marker in dto.Markers)
                {
                    existing.Markers.Add(marker);
                }

                await _context.SaveChangesAsync();
                return Ok(existing);
            }

            var save = new SaveGame
            {
                Money = dto.Money,
                UserId = dto.UserId,
                ShortrangeStage = dto.ShortrangeStage,
                LongrangeStage = dto.LongrangeStage,
                Markers = dto.Markers
            };

            _context.SaveGames.Add(save);
            await _context.SaveChangesAsync();

            return Ok(save);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutSave(int id, [FromBody]SaveGame save)
        {
            var existing = await _context.SaveGames
                .Include(s => s.Markers)
                .FirstOrDefaultAsync(s => s.Id == id);

            if(existing == null)
            {
                return NotFound();
            }

            existing.Money = save.Money;
            existing.ShortrangeStage = save.ShortrangeStage;
            existing.LongrangeStage = save.LongrangeStage;

            _context.Markers.RemoveRange(existing.Markers);

            foreach(var marker in save.Markers)
            {
                existing.Markers.Add(marker);
            }

            await _context.SaveChangesAsync();

            return Ok(save);
        }
    

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSave(int id)
        {
            var save = await _context.SaveGames.FindAsync(id);

            if (save == null)
            {
                return NotFound();
            }

            _context.Markers.RemoveRange(save.Markers);
            _context.SaveGames.Remove(save);
            await _context.SaveChangesAsync();

            return Ok(save);
        }
    }
}
