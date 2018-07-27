using RestaurantSystem.Repository.Domain;
using RestaurantSystem.Repository.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RestaurantSystem.Api.Controllers
{
    public class DishController : BaseController<Dish, int>
    {
        [HttpGet]
        [Route("api/Dish/SearchBy")]
        public IEnumerable<Dish> SearchBy([FromUri]string restaurant, string dish)
        {
            using (UnitOfWork context = new UnitOfWork())
                return context.DishList(restaurant, dish);
        }

        [HttpGet]
        [Route("api/Dish/List")]
        public IEnumerable<Dish> List()
        {
            using (UnitOfWork context = new UnitOfWork())
                return context.DishList();
        }


    }
}