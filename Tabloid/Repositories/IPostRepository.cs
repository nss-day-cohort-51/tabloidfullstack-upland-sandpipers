using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    internal interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<Post> GetAllPublishedPosts();
        List<Post> GetPostsByUserId(int id);
        Post GetPublishedPostById(int id);
        Post GetUserPostById(int id, int userProfileId);
        void Update(Post post);
    }
}