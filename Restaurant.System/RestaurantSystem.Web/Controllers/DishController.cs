using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RestaurantSystem.Web.Controllers
{
    public class DishController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create(int? id)
        {
            return View();
        }
    }
}