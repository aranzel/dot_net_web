﻿using System.Web;
using System.Web.Mvc;

namespace RestaurantSystem.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}