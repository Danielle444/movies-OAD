using server.DAL;

namespace server.BL
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Rating { get; set; }
        public double Income { get; set; }
        public int ReleaseYear { get; set; }
        public int Duration { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string Genre { get; set; }
        public string PhotoUrl { get; set; }




        public bool Insert()
        {
            MoviesDAL dal = new MoviesDAL();
            int num = dal.InsertMovie(this);
            return num > 0;
        }

        public static List<Movie> Read()
        {
            MoviesDAL dal = new MoviesDAL();
            return dal.GetAllMovies();
        }


        public static List<Movie> ReadByRating(double rating)
        {
            List<Movie> allMovies = Read();
            List<Movie> RMoviesList = new List<Movie>();

            for (int i = 0; i < allMovies.Count; i++)
            {
                if (allMovies[i].Rating >= rating)
                {
                    RMoviesList.Add(allMovies[i]);
                }
            }

            return RMoviesList;
        }


        public static List<Movie> ReadByDuration(int duration)
        {
            List<Movie> allMovies = Read();
            List<Movie> DMoviesList = new List<Movie>();

            for (int i = 0; i < allMovies.Count; i++)
            {
                if (allMovies[i].Duration <= duration)
                {
                    DMoviesList.Add(allMovies[i]);
                }
            }

            return DMoviesList;
        }


    }
}
