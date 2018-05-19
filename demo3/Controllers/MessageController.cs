using System.Threading.Tasks;
using demo3.Hubs;
using demo3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace demo3.Controllers
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