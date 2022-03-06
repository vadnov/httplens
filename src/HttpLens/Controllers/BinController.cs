using System.Text;
using HttpLens.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace HttpLens.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BinController : ControllerBase
    {
        private readonly IHubContext<BinHub> _hubContext;

        public BinController(IHubContext<BinHub> hubContext)
        {
            _hubContext = hubContext;
        }
        [Route("{binId}")]
        public async Task<IActionResult> Index(string binId)
        {
            
            var sb = new StringBuilder();
            sb.Append($"{Request.Method} {Request.Path}{Request.QueryString}\n\n");
            foreach (var header in Request.Headers)
            {
                sb.Append($"{header.Key}: {string.Join(", ", header.Value)}\n");
            }

            await _hubContext.Clients.All.SendAsync("RequestReceived", sb.ToString());

            return Ok(sb.ToString());
        }
    }
}