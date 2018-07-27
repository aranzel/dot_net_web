using RestaurantSystem.Repository;
using RestaurantSystem.Repository.Domain;
using RestaurantSystem.Repository.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Http.Formatting;

namespace RestaurantSystem.Api.Controllers
{
    public class BaseController<TEntity, TKey> : ApiController where TEntity : class, Base<TKey> where TKey : IComparable, IComparable<TKey>, IEquatable<TKey>
    {
        protected readonly RepositoryBase<TEntity, TKey> _repository;

        public BaseController()
        {
            _repository = new RepositoryBase<TEntity, TKey>();
        }

        public IEnumerable<TEntity> Get()
        {
            return _repository.Get();
        }

        public TEntity Get(TKey id)
        {
            return _repository.Get(id);
        }
        
        public TEntity Post(FormDataCollection form)
        {
            TEntity entity = Serialize(form);
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

        [HttpPost]
        public TEntity Update([FromUri]TKey id, FormDataCollection form)
        {
            TEntity entity = Serialize(form);
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

        [HttpGet]
        public IHttpActionResult Delete([FromUri]TKey entityId)
        {
            var entity = _repository.Get(entityId);
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

        protected virtual TEntity Serialize(FormDataCollection form)
        {
            try
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<TEntity>(form["entity"]);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("entity", $"Erro ao tentar desserializar o entidade: {ex.ToString()}");
            }
            return null;
        }
        
    }
}