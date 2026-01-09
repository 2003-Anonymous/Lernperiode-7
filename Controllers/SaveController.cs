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
            var save = await _context.SaveGames.FindAsync(id);

            if(save == null)
            {
                return NotFound();
            }

            return Ok(save);
        }

        [HttpPost]
        public async Task<ActionResult> PostSave(SaveGame save)
        {
            _context.SaveGames.Add(save);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetSave),
                new { id = save.Id },
                save);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutSave(int id, [FromBody]SaveGame save)
        {
            _context.Entry(save).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!_context.SaveGames.Any(s => s.Id == id))
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
        public async Task<ActionResult> DeleteSave()
        {

        }
    }
}
