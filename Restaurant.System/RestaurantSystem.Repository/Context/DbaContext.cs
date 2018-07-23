using RestaurantSystem.Repository.Context.Configuration;
using RestaurantSystem.Repository.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantSystem.Repository.Context
{
    public class DbaContext : DbContext
    {
        static DbaContext()
        {
            Database.SetInitializer<DbaContext>(null);
        }

        public DbaContext() : base("Name=ConnectionDbaContext") 
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
     
        public DbSet<Restaurant> Restaurant { get; set; }
        public DbSet<Dish> Dish { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new RestaurantConfiguration());
            modelBuilder.Configurations.Add(new DishConfiguration());
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
