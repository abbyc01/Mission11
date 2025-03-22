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
    public IEnumerable<Book> GetBooks()
    {
        var books = _context.Books.ToList();
        return books;
    }

    
   
    
}