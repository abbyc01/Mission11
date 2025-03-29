using Microsoft.AspNetCore.Mvc;
using OnlineBookstore.API.Data;

namespace OnlineBookstore.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController : Controller
{
    private BookDbContext _context;

    public BookController(BookDbContext temp) => _context = temp;

    [HttpGet]
    public IActionResult GetBooks(int pageHowMany, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
    {
        var query = _context.Books.AsQueryable();
        if (bookTypes != null && bookTypes.Any())
        {
            query = query.Where(b => bookTypes.Contains(b.Category));
        }
        
        var totalNumBooks = query.Count();
        var books = query.Skip((pageNum - 1)* pageHowMany).Take(pageHowMany).ToList();
        
        
        var someObject = new
        {
            books = books,
            totalNumBooks = totalNumBooks
        };
        
        return Ok(someObject);
    }

    [HttpGet("GetBookTypes")]
    public IActionResult GetBooksTypes()
    {
        var projectTypes = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        return Ok(projectTypes);
    }
    
    
}