using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        int CountAdmins();
        List<string> GetAllDeactivatedUserEmails();
        List<int> GetAllDeactivatedUserIds();
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileByUserId(int userId);
        void UpdateUserTypeId(int userTypeId, int userId);
    }
}