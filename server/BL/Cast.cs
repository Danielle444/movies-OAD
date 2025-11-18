using server.DAL;

namespace server.BL
{
    public class Cast
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }


        public static List<Cast> Read()
        {
            CastDAL dal = new CastDAL();
            return dal.GetAllCast();
        }

    }
}
