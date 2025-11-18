namespace server.Models
{
    public class Cast
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }

        public static List<Cast> CastsList = new List<Cast>();

        public bool Insert()
        {
            for (int i = 0; i < CastsList.Count; i++)
            {
                if (this.Id == CastsList[i].Id)
                {
                    return false;
                }
            }
            CastsList.Add(this);
            return true;
        }

        static public List<Cast> Read()
        {
            return CastsList;
        }
    }
}
