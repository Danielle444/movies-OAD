-- Get all movies
CREATE PROCEDURE sp_GetAllMovies
AS
BEGIN
    SELECT * FROM Movies;
END
GO

-- Insert a new movie
CREATE PROCEDURE sp_InsertMovie
    @Title       NVARCHAR(300),
    @Rating      FLOAT,
    @Income      FLOAT,
    @ReleaseYear INT,
    @Duration    INT,
    @Language    NVARCHAR(100),
    @Description NVARCHAR(MAX),
    @Genre       NVARCHAR(100),
    @PhotoUrl    NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Movies (Title, Rating, Income, ReleaseYear, Duration, Language, Description, Genre, PhotoUrl)
    VALUES (@Title, @Rating, @Income, @ReleaseYear, @Duration, @Language, @Description, @Genre, @PhotoUrl);
END
GO

-- Get all cast members
CREATE PROCEDURE sp_GetAllCast
AS
BEGIN
    SELECT * FROM Cast;
END
GO

-- Register new user
CREATE PROCEDURE sp_RegisterUser
    @UserName NVARCHAR(100),
    @Email    NVARCHAR(200),
    @Password NVARCHAR(200)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        RETURN;  
    END

    INSERT INTO Users (UserName, Email, Password)
    VALUES (@UserName, @Email, @Password);
END
GO

-- Login user
CREATE PROCEDURE sp_LoginUser
    @Email    NVARCHAR(200),
    @Password NVARCHAR(200)
AS
BEGIN
    SELECT Id, UserName, Email
    FROM Users
    WHERE Email = @Email
      AND Password = @Password;
END
GO
