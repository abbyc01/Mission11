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
    public IActionResult GetBooks(int pageHowMany, int pageNum = 1)
    {
        var books = _context.Books.Skip((pageNum - 1)* pageHowMany).Take(pageHowMany).ToList();
        
        var totalNumBooks = _context.Books.Count();
        var someObject = new
        {
            books = books,
            totalNumBooks = totalNumBooks
        };
        
        return Ok(someObject);
    }

    
   
    
}