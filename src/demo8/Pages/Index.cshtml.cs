using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace demo8.Pages
{
    public class IndexModel : PageModel
    {
        public class InputModel
        {
            [Required]
            [MinLength(5)]
            public string Name { get; set; }

            [Required]
            [MaxLength(10)]
            [MinLength(5)]
            public string UserName { get; set; }

            [Required]
            [EmailAddress]
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