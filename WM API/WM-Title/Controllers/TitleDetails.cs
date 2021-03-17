using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WM_Title.Controllers
{
    public class TitleDetails : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
