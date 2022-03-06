using Microsoft.AspNetCore.SignalR;

namespace HttpLens.Hubs;

public class BinHub : Hub
{

    public Task JoinBin(string binId)
    {
        return Groups.AddToGroupAsync(Context.ConnectionId, binId);
    }
}