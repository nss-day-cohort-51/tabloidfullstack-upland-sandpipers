using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IReactionRepository
    {
        void AddReaction(Reaction category);
        List<Reaction> GetAll();
        void DeleteReaction(int id);
        Reaction GetById(int id);
    }
}
