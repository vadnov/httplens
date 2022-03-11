using Microsoft.Extensions.Primitives;

namespace HttpLens.Models;

public class BinRequest
{
    public Dictionary<string, string> Headers { get; set; } = new();
    public string Body { get; set; } = "";
    public string Method { get; set; } = "";
}