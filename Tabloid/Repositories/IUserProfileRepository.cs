using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllDeactivatedUserProfiles();
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
<<<<<<< HEAD
        UserProfile GetUserProfileByUserId(int userId);
        void UpdateUserTypeId(int userTypeId, int userId);
=======
        UserProfile GetUserById(int id);
>>>>>>> main
    }
}