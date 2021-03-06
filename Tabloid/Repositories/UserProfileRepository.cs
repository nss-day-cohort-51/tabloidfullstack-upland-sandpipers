using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAllUserProfiles()
        {
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                      Select * from UserProfile";


                        var users = new List<UserProfile>();

                        var reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            int id = reader.GetInt32(reader.GetOrdinal("Id"));
                            string fireId = reader.GetString(reader.GetOrdinal("firebaseUserId"));
                            string display = reader.GetString(reader.GetOrdinal("displayName"));
                            string fName = reader.GetString(reader.GetOrdinal("firstName"));
                            string lName = reader.GetString(reader.GetOrdinal("lastName"));
                            string email = reader.GetString(reader.GetOrdinal("email"));
                            DateTime cDT = reader.GetDateTime(reader.GetOrdinal("createDateTime"));
                            string imgLoc = reader.GetString(reader.GetOrdinal("imageLocation"));
                            int UTI = reader.GetInt32(reader.GetOrdinal("userTypeId"));

                            users.Add(new UserProfile()
                            {
                                Id = id,
                                DisplayName = display,
                                FirstName = fName,
                                LastName = lName,
                                Email = email,
                                CreateDateTime = cDT,
                                ImageLocation = imgLoc,
                                UserTypeId = UTI
                            });
                        }

                        reader.Close();

                        return users;
                    }
                }
            }
        }

        public List<int> GetAllDeactivatedUserIds()
        {
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                      Select * from UserProfile 
                        WHERE UserTypeId = 3";


                        var users = new List<int>();

                        var reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            int id = reader.GetInt32(reader.GetOrdinal("Id"));
                            string fireId = reader.GetString(reader.GetOrdinal("firebaseUserId"));
                            string display = reader.GetString(reader.GetOrdinal("displayName"));
                            string fName = reader.GetString(reader.GetOrdinal("firstName"));
                            string lName = reader.GetString(reader.GetOrdinal("lastName"));
                            string email = reader.GetString(reader.GetOrdinal("email"));
                            DateTime cDT = reader.GetDateTime(reader.GetOrdinal("createDateTime"));
                            string imgLoc = reader.GetString(reader.GetOrdinal("imageLocation"));
                            int UTI = reader.GetInt32(reader.GetOrdinal("userTypeId"));

                            users.Add(id);
                        }

                        reader.Close();

                        return users;
                    }
                }
            }
        }

        public List<string> GetAllDeactivatedUserEmails()
        {
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                      Select * from UserProfile 
                        WHERE UserTypeId = 3";


                        var users = new List<string>();

                        var reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            int id = reader.GetInt32(reader.GetOrdinal("Id"));
                            string fireId = reader.GetString(reader.GetOrdinal("firebaseUserId"));
                            string display = reader.GetString(reader.GetOrdinal("displayName"));
                            string fName = reader.GetString(reader.GetOrdinal("firstName"));
                            string lName = reader.GetString(reader.GetOrdinal("lastName"));
                            string email = reader.GetString(reader.GetOrdinal("email"));
                            DateTime cDT = reader.GetDateTime(reader.GetOrdinal("createDateTime"));
                            string imgLoc = reader.GetString(reader.GetOrdinal("imageLocation"));
                            int UTI = reader.GetInt32(reader.GetOrdinal("userTypeId"));

                            users.Add(email);
                        }

                        reader.Close();

                        return users;
                    }
                }
            }
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetUserProfileByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE up.id = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, 
                                                                 Email, CreateDateTime, ImageLocation, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @CreateDateTime, @ImageLocation, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public int CountAdmins()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT COUNT(Id) 'adminCount' FROM UserProfile WHERE UserTypeId = 1";
                    
                    var adminCount = 0;

                    using (var reader= cmd.ExecuteReader()){

                        if (reader.Read())
                        {
                            adminCount = reader.GetInt32(reader.GetOrdinal("adminCount"));
                        }

                        return adminCount;
                    }

                }
            }
        }

        public void UpdateUserTypeId(int userTypeId, int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {


                    cmd.CommandText = @"UPDATE UserProfile 
                                           SET UserTypeId = @userTypeId
                                         WHERE id = @id";

                    cmd.Parameters.AddWithValue("@userTypeId", userTypeId);
                    cmd.Parameters.AddWithValue("@id", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}