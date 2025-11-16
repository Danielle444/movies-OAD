namespace server.Models
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

        static public List<Movie> MoviesList = new List<Movie>();

        public bool Insert()
        {
            for (int i = 0; i < MoviesList.Count; i++)
            {
                if (this.Id == MoviesList[i].Id)
                {
                    return false;
                }
            }
            MoviesList.Add(this);
            return true;
        }
        static public List<Movie> Read()
        {
            return MoviesList;
        }

        static public List<Movie> ReadByRating(int rating)
        {
            List<Movie> RMoviesList = new List<Movie>();

            for (int i = 0; i < MoviesList.Count; i++)
            {
                if (MoviesList[i].Rating >= rating)
                {
                    RMoviesList.Add(MoviesList[i]);
                }
            }
            return RMoviesList;
        }

        static public List<Movie> ReadByDuration(int duration)
        {
            List<Movie> DMoviesList = new List<Movie>();

            for (int i = 0; i < MoviesList.Count; i++)
            {
                if (MoviesList[i].Duration <= duration)
                {
                    DMoviesList.Add(MoviesList[i]);
                }
            }
            return DMoviesList;
        }

    }
}
