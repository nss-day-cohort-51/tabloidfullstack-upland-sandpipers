using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void Delete(int id);
        PostTag GetById(int id);
        List<PostTag> GetPostTagsByPostId(int id); 
    }
}