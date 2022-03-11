using System.Collections.Immutable;
using System.Text;
using HttpLens.Hubs;
using HttpLens.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace HttpLens.Controllers
{
    [Route("b")]
    [ApiController]
    public class BinController : ControllerBase
    {
        private readonly IHubContext<BinHub> _hubContext;

        public BinController(IHubContext<BinHub> hubContext)
        {
            _hubContext = hubContext;
        }
        
        [Route("{*slug}")]
        public async Task<IActionResult> Index(string slug)
        {
            slug ??= "";
            var binId = slug.Split("/")[0] ?? "";
            var sb = new StringBuilder();
            sb.Append($"{Request.Method} {Request.Path}{Request.QueryString}\n\n");
            foreach (var header in Request.Headers)
            {
                sb.Append($"{header.Key}: {string.Join(", ", header.Value)}\n");
            }

            var request = new BinRequest()
            {
                Method = Request.Method,
                Headers = Request.Headers
                    .ToDictionary(
                        o => o.Key, 
                        o => string.Join(", ", o.Value)),
            };

            await _hubContext.Clients.Group(binId).SendAsync("RequestReceived", request);

            return Ok(sb.ToString());
        }
    }
}