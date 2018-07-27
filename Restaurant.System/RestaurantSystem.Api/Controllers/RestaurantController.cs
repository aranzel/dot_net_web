using RestaurantSystem.Repository.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace RestaurantSystem.Api.Controllers
{
    public class RestaurantController : BaseController<Restaurant, int>
    {
        [HttpGet]
        [Route("api/Restaurant/SearchByName")]
        public IEnumerable<Restaurant> SearchByName([FromUri]string name)
        {
            return _repository.Get(r => r.Name.Contains(name));
        }
        
    }
}