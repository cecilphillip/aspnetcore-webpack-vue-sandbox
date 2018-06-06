using System;
using Microsoft.AspNetCore.Mvc;

namespace demo10.Controllers
{
    [Route("api/validate")]
    [ApiController]
    public class ValidationController : ControllerBase
    {
        [HttpPost]
        public ActionResult<object> IsUserNameAvailable([FromBody]string userName)
        {
            return userName.Equals("cecilphillip", StringComparison.OrdinalIgnoreCase) ?
                   Ok(new { valid = false, message = "User name is already in use" }): Ok(new { valid = true, message = "" });
        }
    }
}