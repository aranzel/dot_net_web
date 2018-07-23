using RestaurantSystem.Repository;
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
    public class BaseController<TEntity, TKey> : ApiController where TEntity : class, Base<TKey> where TKey : IComparable, IComparable<TKey>, IEquatable<TKey>
    {
        protected readonly RepositoryBase<TEntity, TKey> _repository;

        public BaseController()
        {
            _repository = new RepositoryBase<TEntity, TKey>();
        }

        // GET api/<controller>
        public IEnumerable<TEntity> Get()
        {
            return _repository.Get();
        }

        // GET api/<controller>/5
        public TEntity Get(TKey id)
        {
            return _repository.Get(id);
        }

        // POST api/<controller>
        public TEntity Post([FromBody]TEntity entity)
        {
            if (ModelState.IsValid)
            {
                _repository.Add(entity);
            }
            else
            {
                ErrorValidation();
            }
            return entity;
        }

        // PUT api/<controller>/5
        public TEntity Put(TKey id, [FromBody]TEntity entity)
        {
            if (ModelState.IsValid)
            {
                entity.Id = id;
                _repository.Edit(entity);
            }
            else
            {
                ErrorValidation();
            }
            return entity;
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(TKey id)
        {
            var entity = _repository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }
            _repository.Delete(entity);
            return StatusCode(HttpStatusCode.OK);
        }

        protected void ErrorValidation()
        {
            IEnumerable<string> errors = (from s in ModelState
                          from e in s.Value.Errors
                          where s.Value.Errors.Any()
                          select e.ErrorMessage);

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent("Error list: \n" + string.Join("\\n", errors)),
                ReasonPhrase = "Validation Error"
            });
        }

    }
}