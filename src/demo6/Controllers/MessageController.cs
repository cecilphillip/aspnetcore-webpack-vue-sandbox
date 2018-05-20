using System.Threading.Tasks;
using demo6.Hubs;
using demo6.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace demo6.Controllers
{

    [ApiController]
    [Route("/message")]
    public class MessageController : Controller
    {
        public IHubContext<ApplicationHub> _hubContext { get; }

        public MessageController(IHubContext<ApplicationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public Task PostMessage(ChatMessage message)
        {
            return _hubContext.Clients.All.SendAsync("Send", message.Message);
        }
    }
}