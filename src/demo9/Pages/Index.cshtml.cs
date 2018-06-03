using System.ComponentModel.DataAnnotations;
using demo9.Validation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace demo9.Pages
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
            [MaxLength(10)]
            [MinLength(5)]
            [VeeValidate]
            public string UserName { get; set; }

            [Required]
            [EmailAddress]
            [VeeValidate]
            public string Email { get; set; }
            [Remote(action:"Validate", controller:"validator", HttpMethod="POST", AdditionalFields="")]
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