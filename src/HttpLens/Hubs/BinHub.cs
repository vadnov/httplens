using Microsoft.AspNetCore.SignalR;

namespace HttpLens.Hubs;

public class BinHub : Hub
{
    public async Task JoinBin(string binId)
    {
        var host = Context.GetHttpContext()!.Request.Host;
        await Clients.Caller.SendAsync("Init", $"https://{host}/b/{binId}");
        await Groups.AddToGroupAsync(Context.ConnectionId, binId);
    }
}