using RestaurantSystem.Repository.Context;
using RestaurantSystem.Repository.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace RestaurantSystem.Repository
{
    public class RepositoryBase<TEntity,TKey> : IDisposable, IRepositoryBase<TEntity> where TEntity : class, Base<TKey> where TKey : IComparable, IComparable<TKey>, IEquatable<TKey>
    {
        internal DbaContext _context;
        internal DbSet<TEntity> _dbSet;

        public RepositoryBase()
        {
            _context = new DbaContext();
            _dbSet = _context.Set<TEntity>();
        }

        internal RepositoryBase(DbaContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
        }

        public void Edit(TEntity entity)
        {
            var entry = _context.Entry<TEntity>(entity);
            var pkey = _dbSet.Create().GetType().GetProperty("Id").GetValue(entity);

            if (entry.State == EntityState.Detached)
            {
                var set = _context.Set<TEntity>();
                TEntity attachedEntity = set.Find(pkey);  // access the key 
                if (attachedEntity != null)
                {
                    var attachedEntry = _context.Entry(attachedEntity);
                    attachedEntry.CurrentValues.SetValues(entity);
                }
                else
                {
                    entry.State = EntityState.Modified; // attach the entity 
                }
            }

            _context.SaveChanges();
        }

        /// <summary> 
        /// Método que deleta um objeto no banco de dados da aplicação. 
        /// </summary> 
        public void Delete(TEntity entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _dbSet.Attach(entity);
            }
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

        /// <summary> 
        /// Método que deleta um ou varios objetos no banco de dados da aplicação, mediante uma expressão LINQ. 
        /// </summary> 
        public void DeleteAll(Expression<Func<TEntity, bool>> filter = null)
        {
            IQueryable<TEntity> query = _dbSet;
            List<TEntity> listDelete = query.Where(filter).ToList();

            foreach (var item in listDelete)
            {
                _dbSet.Remove(item);
            }
            _context.SaveChanges();
        }

        /// <summary> 
        /// Método que adiciona uma lista de novos objetos ao banco de dados da aplicação. 
        /// </summary> 
        public void AddAll(List<TEntity> entity)
        {
            foreach (var item in entity)
            {
                _dbSet.Add(item);
            }
            _context.SaveChanges();
        }
        
        public virtual List<TEntity> Get()
        {
            return _dbSet.ToList();
        }

        public virtual TEntity Get(TKey id)
        {
            return _dbSet.Find(id);
        }

        /// <summary> 
        /// Método que busca uma lista de objetos no banco de dados da aplicação e retorna-a no tipo IEnumerable<TEntity>. 
        /// </summary> 
        public virtual List<TEntity> Get(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }
        
        public void Dispose()
        {
            _dbSet = null;
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
        
    }
}
