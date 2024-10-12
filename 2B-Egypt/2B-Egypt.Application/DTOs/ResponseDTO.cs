namespace _2B_Egypt.Application.DTOs;

public class ResponseDTO<TEntity>
{
    public TEntity Entity { get; set; }
    public bool IsSuccessfull { get; set; }
    public string Message { get; set; }
}
