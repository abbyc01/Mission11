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

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateBook(int bookId, [FromBody] Book UpdatedBook)
    {
        var existingBook = _context.Books.Find(bookId);
        
        existingBook.Title = UpdatedBook.Title;
        existingBook.Category = UpdatedBook.Category;
        existingBook.Price = UpdatedBook.Price;
        existingBook.Author = UpdatedBook.Author;
        existingBook.Classification = UpdatedBook.Classification;
        existingBook.ISBN = UpdatedBook.ISBN;
        existingBook.PageCount = UpdatedBook.PageCount;
        existingBook.Publisher = UpdatedBook.Publisher;
        
        _context.Books.Update(existingBook);
        _context.SaveChanges();
        return Ok(existingBook);
    }

[HttpDelete("DeleteBook/{bookId}")]
public IActionResult DeleteBook(int bookId)
{
    var book = _context.Books.Find(bookId);

    if (book == null)
    {
        return NotFound(new { message = "Book not found" });
    }

    _context.Books.Remove(book);
    _context.SaveChanges();
    return NoContent();
}



   
}