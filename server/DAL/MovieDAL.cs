using Microsoft.Data.SqlClient;
using server.BL;

namespace server.DAL
{
    public class MoviesDAL : DBServices
    {
        private SqlDataReader reader;
        private SqlConnection connection;
        private SqlCommand command;

        public List<Movie> GetAllMovies()
        {
            try
            {
                connection = Connect();
            }
            catch (Exception ex)
            {
                throw;
            }

            command = CreateCommandWithStoredProcedure("sp_GetAllMovies", connection, null);

            try
            {
                List<Movie> lst = new List<Movie>();
                reader = command.ExecuteReader();

                while (reader.Read())
                {
                    lst.Add(new Movie()
                    {
                        Id = int.Parse(reader["Id"].ToString()),
                        Title = reader["Title"].ToString(),
                        Rating = double.Parse(reader["Rating"].ToString()),
                        Income = double.Parse(reader["Income"].ToString()),
                        ReleaseYear = int.Parse(reader["ReleaseYear"].ToString()),
                        Duration = int.Parse(reader["Duration"].ToString()),
                        Language = reader["Language"].ToString(),
                        Description = reader["Description"].ToString(),
                        Genre = reader["Genre"].ToString(),
                        PhotoUrl = reader["PhotoUrl"].ToString()
                    });
                }

                return lst;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }
        }

        public int InsertMovie(Movie movie)
        {
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@Title", movie.Title),
                new SqlParameter("@Rating", movie.Rating),
                new SqlParameter("@Income", movie.Income),
                new SqlParameter("@ReleaseYear", movie.ReleaseYear),
                new SqlParameter("@Duration", movie.Duration),
                new SqlParameter("@Language", movie.Language),
                new SqlParameter("@Description", movie.Description),
                new SqlParameter("@Genre", movie.Genre),
                new SqlParameter("@PhotoUrl", movie.PhotoUrl)
            };

            try
            {
                connection = Connect();
            }
            catch (Exception ex)
            {
                throw;
            }

            command = CreateCommandWithStoredProcedure("sp_InsertMovie", connection, parameters);

            try
            {
                return command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }
        }
    }
}
