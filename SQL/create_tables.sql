-- Users table
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(100),
    Email NVARCHAR(200) UNIQUE,
    Password NVARCHAR(200)
);

-- Movies table
CREATE TABLE Movies (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(300),
    Rating FLOAT,
    Income FLOAT,
    ReleaseYear INT,
    Duration INT,
    Language NVARCHAR(100),
    Description NVARCHAR(MAX),
    Genre NVARCHAR(100),
    PhotoUrl NVARCHAR(MAX)
);

-- Cast table
CREATE TABLE Cast (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200),
    Role NVARCHAR(200),
    DateOfBirth DATE,
    Country NVARCHAR(200),
    PhotoUrl NVARCHAR(MAX)
);

-- Movies_Cast table (M:M relationship)
CREATE TABLE Movies_Cast (
    MovieId INT FOREIGN KEY REFERENCES Movies(Id),
    CastId INT FOREIGN KEY REFERENCES Cast(Id),
    PRIMARY KEY (MovieId, CastId)
);
