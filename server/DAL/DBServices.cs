using System.Data;
using Microsoft.Data.SqlClient;

namespace server.DAL
{
    public class DBServices
    {
        protected SqlConnection Connect()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json").Build();

            string cStr = configuration.GetConnectionString("myProjDB");

            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }

        public SqlCommand CreateCommandWithStoredProcedure(string spName, SqlConnection con, SqlParameter[] parameters)
        {
            SqlCommand cmd = new SqlCommand(spName, con);
            cmd.CommandType = CommandType.StoredProcedure;

            if (parameters != null)
            {
                cmd.Parameters.AddRange(parameters);
            }

            return cmd;
        }
    }
}
