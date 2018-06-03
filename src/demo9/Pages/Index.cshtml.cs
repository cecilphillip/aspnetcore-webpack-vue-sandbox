using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
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