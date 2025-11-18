using Microsoft.Data.SqlClient;
using server.BL;

namespace server.DAL
{
    public class UsersDAL : DBServices
    {
        private SqlDataReader reader;
        private SqlConnection connection;
        private SqlCommand command;

        public int RegisterUser(Users user)
        {
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@UserName", user.UserName),
                new SqlParameter("@Email", user.Email),
                new SqlParameter("@Password", user.Password)
            };

            try
            {
                connection = Connect();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            command = CreateCommandWithStoredProcedure("sp_RegisterUser", connection, parameters);

            try
            {
                return command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }
        }

        public Users Login(string email, string password)
        {
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@Email", email),
                new SqlParameter("@Password", password)
            };

            try
            {
                connection = Connect();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            command = CreateCommandWithStoredProcedure("sp_LoginUser", connection, parameters);

            try
            {
                reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return new Users()
                    {
                        Id = int.Parse(reader["Id"].ToString()),
                        UserName = reader["UserName"].ToString(),
                        Email = reader["Email"].ToString()
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }
        }
    }
}

