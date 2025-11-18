using server.DAL;

namespace server.BL
{
    public class Users
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public int Register()
        {
            UsersDAL dal = new UsersDAL();
            return dal.RegisterUser(this);
        }

        public static Users Login(string email, string password)
        {
            UsersDAL dal = new UsersDAL();
            return dal.Login(email, password);
        }
    }
}
