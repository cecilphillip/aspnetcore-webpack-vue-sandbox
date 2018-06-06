using System.ComponentModel.DataAnnotations;
using demo10.Validation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace demo10.Pages
{
    public class IndexModel : PageModel
    {
        public class InputModel
        {
            [Required]
            [MinLength(5)]
            [VeeValidate]
            public string Name { get; set; }

            [Required]
            [MaxLength(15)]
            [MinLength(5)]
            [Remote(action:"IsUserNameAvailable", controller:"Validation", HttpMethod="POST")]
            [VeeValidate]
            public string UserName { get; set; }

            [Required]
            [EmailAddress]
            [VeeValidate]
            public string Email { get; set; }

            [MaxLength(150)]
            [VeeValidate]
            public string Message { get; set; }
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public void OnGet()
        {
        }

        public void OnPost() {

        }
    }
}