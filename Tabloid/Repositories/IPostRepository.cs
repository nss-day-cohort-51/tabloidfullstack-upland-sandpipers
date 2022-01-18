using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<Post> GetAllPublishedPosts();
        List<Post> GetAllSubscribedPosts(int userId);
        bool GetIsSubscribed(int currentUserId, int providerId);
        List<Post> GetPostsByUserId(int id);
        Post GetPublishedPostById(int id);
        Post GetUserPostById(int id, int userProfileId);
        void Update(Post post);
    }
}