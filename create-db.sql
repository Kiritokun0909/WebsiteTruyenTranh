CREATE DATABASE IF NOT EXISTS mangadb;
USE mangadb;

CREATE TABLE Role (
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(255) NOT NULL
);

CREATE TABLE Account (
    AccountID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

CREATE TABLE Genre (
    GenreID INT AUTO_INCREMENT PRIMARY KEY,
    GenreName VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Manga (
    MangaID INT AUTO_INCREMENT PRIMARY KEY,
    StoryName VARCHAR(255) NOT NULL,
    AuthorName VARCHAR(255) NOT NULL,
    CoverImageUrl VARCHAR(255),
    PublishedDate DATE,
    Country VARCHAR(255),
    Description TEXT,
    AgeLimit INT,
    Status VARCHAR(255),
    NumViews INT DEFAULT 0,
    AccountID INT,
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

CREATE TABLE MangaGenre (
    GenreID INT,
    MangaID INT,
    PRIMARY KEY (GenreID, MangaID),
    FOREIGN KEY (GenreID) REFERENCES Genre(GenreID),
    FOREIGN KEY (MangaID) REFERENCES Manga(MangaID)
);

CREATE TABLE Chapter (
    ChapterID INT AUTO_INCREMENT PRIMARY KEY,
    ChapterName VARCHAR(255) NOT NULL,
    PublishedDate DATE,
    MangaID INT,
    FOREIGN KEY (MangaID) REFERENCES Manga(MangaID)
);

CREATE TABLE ChapterImage (
    ChapterID INT,
    OrderNumber INT,
    ImageUrl VARCHAR(255),
    PRIMARY KEY (ChapterID, OrderNumber),
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ChapterID)
);

CREATE TABLE `Like` (
    AccountID INT,
    MangaID INT,
    PRIMARY KEY (AccountID, MangaID),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    FOREIGN KEY (MangaID) REFERENCES Manga(MangaID)
);

CREATE TABLE Follow (
    AccountID INT,
    MangaID INT,
    IsChecked BOOLEAN,
    PRIMARY KEY (AccountID, MangaID),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    FOREIGN KEY (MangaID) REFERENCES Manga(MangaID)
);

CREATE TABLE CommentManga (
	AccountID INT,
	MangaID INT,
	CommentDate DATETIME,
	Context TEXT,
	PRIMARY KEY (AccountID, MangaID, CommentDate),
	FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
	FOREIGN KEY (MangaID) REFERENCES Manga(MangaID)
);

CREATE TABLE CommentChapter (
    AccountID INT,
    ChapterID INT,
    CommentDate DATETIME,
    Context TEXT,
    PRIMARY KEY (AccountID, ChapterID, CommentDate),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ChapterID)
);
