using System;

namespace RestaurantSystem.Repository.Domain
{
    public interface Base<TKey> where TKey : IComparable, IComparable<TKey>, IEquatable<TKey>
    {
        TKey Id { get; set; }
    }
}
