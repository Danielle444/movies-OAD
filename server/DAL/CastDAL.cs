using Microsoft.Data.SqlClient;
using server.BL;

namespace server.DAL
{
    public class CastDAL : DBServices
    {
        private SqlDataReader reader;
        private SqlConnection connection;
        private SqlCommand command;

        public List<Cast> GetAllCast()
        {
            try
            {
                connection = Connect();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            command = CreateCommandWithStoredProcedure("sp_GetAllCast", connection, null);

            try
            {
                List<Cast> lst = new List<Cast>();
                reader = command.ExecuteReader();

                while (reader.Read())
                {
                    lst.Add(new Cast()
                    {
                        Id = int.Parse(reader["Id"].ToString()),
                        Name = reader["Name"].ToString(),
                        Role = reader["Role"].ToString(),
                        DateOfBirth = DateTime.Parse(reader["DateOfBirth"].ToString()),
                        Country = reader["Country"].ToString(),
                        PhotoUrl = reader["PhotoUrl"].ToString()
                    });
                }

                return lst;
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
