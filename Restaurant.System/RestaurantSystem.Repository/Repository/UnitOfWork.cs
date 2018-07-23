using RestaurantSystem.Repository.Context;
using RestaurantSystem.Repository.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantSystem.Repository.Repository
{
    public class UnitOfWork : IDisposable
    {
        private DbaContext _context = new DbaContext();

        #region Restaurant
        private RepositoryBase<Restaurant, int> _restaurantRepository;

        public RepositoryBase<Restaurant, int> RestaurantRepository
        {
            get
            {
                if (_restaurantRepository == null)
                {
                    _restaurantRepository = new RepositoryBase<Restaurant, int>(_context);
                }

                return _restaurantRepository;
            }
        }
        #endregion

        #region Dish
        private RepositoryBase<Dish, int> _dishRepository;

        public RepositoryBase<Dish, int> DishRepository
        {
            get
            {
                if (_dishRepository == null)
                {
                    _dishRepository = new RepositoryBase<Dish, int>(_context);
                }

                return _dishRepository;
            }
        }
        #endregion

        public List<Dish> DishList()
        {
            List<Dish> lstDish = _context.Dish.ToList();
            lstDish.ForEach(d => _context.Entry(d).Reference(r => r.Restaurant).Load());
            lstDish.ForEach(d => d.Restaurant?.Dishes.Clear());
            return lstDish;
        }

        private bool _disposed = false;

        public void Dispose()
        {
            Clear(true);
            GC.SuppressFinalize(this);
        }

        private void Clear(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        ~UnitOfWork()
        {
            Clear(false);
        }
    }
}
