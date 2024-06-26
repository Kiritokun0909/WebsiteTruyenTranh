CREATE DATABASE IF NOT EXISTS ComicsDB;
USE ComicsDB;

-- Create Role table
CREATE TABLE Role (
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(25) NOT NULL
);

-- Create Account table
CREATE TABLE Account (
    AccountID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Phone VARCHAR(20) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

-- Create UserDetail table
CREATE TABLE UserDetail (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    Address VARCHAR(255),
    AccountID INT,
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

-- Create Genre table
CREATE TABLE Genre (
    GenreID INT AUTO_INCREMENT PRIMARY KEY,
    GenreName VARCHAR(50) NOT NULL UNIQUE
);

-- Create Story table
CREATE TABLE Story (
    StoryID INT AUTO_INCREMENT PRIMARY KEY,
    StoryName VARCHAR(100) NOT NULL,
    AuthorName VARCHAR(100),
    Image VARCHAR(255),
    PublishedDate DATE,
    Country VARCHAR(100),
    TypeStory ENUM('Manga', 'Novel') NOT NULL,
    Description TEXT,
    AgeLimit INT,
    Status ENUM('Ongoing', 'Completed', 'Stop') NOT NULL,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES UserDetail(UserID)
);

-- Create StoryGenre table
CREATE TABLE StoryGenre (
    GenreID INT,
    StoryID INT,
    PRIMARY KEY (GenreID, StoryID),
    FOREIGN KEY (GenreID) REFERENCES Genre(GenreID),
    FOREIGN KEY (StoryID) REFERENCES Story(StoryID)
);

-- Create Chapter table
CREATE TABLE Chapter (
    ChapterID INT AUTO_INCREMENT PRIMARY KEY,
    ChapterName VARCHAR(100) NOT NULL,
    PublishedDate DATE,
    StoryID INT,
    FOREIGN KEY (StoryID) REFERENCES Story(StoryID)
);

-- Create Manga table
CREATE TABLE Manga (
    ChapterID INT,
    OrderNumber INT,
    Image VARCHAR(255),
    PRIMARY KEY (ChapterID, OrderNumber),
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ChapterID)
);

-- Create Novel table
CREATE TABLE Novel (
    ChapterID INT PRIMARY KEY,
    Context TEXT,
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ChapterID)
);

-- Create Like table
CREATE TABLE `Like` (
    UserID INT,
    StoryID INT,
    PRIMARY KEY (UserID, StoryID),
    FOREIGN KEY (UserID) REFERENCES UserDetail(UserID),
    FOREIGN KEY (StoryID) REFERENCES Story(StoryID)
);

-- Create Follow table
CREATE TABLE Follow (
    UserID INT,
    StoryID INT,
    PRIMARY KEY (UserID, StoryID),
    FOREIGN KEY (UserID) REFERENCES UserDetail(UserID),
    FOREIGN KEY (StoryID) REFERENCES Story(StoryID)
);

-- Create CommentStory table
CREATE TABLE CommentStory (
    UserID INT,
    StoryID INT,
    CommentDate DATETIME,
    Context TEXT,
    PRIMARY KEY (UserID, StoryID, CommentDate),
    FOREIGN KEY (UserID) REFERENCES UserDetail(UserID),
    FOREIGN KEY (StoryID) REFERENCES Story(StoryID)
);

-- Create CommentChapter table
CREATE TABLE CommentChapter (
    UserID INT,
    ChapterID INT,
    CommentDate DATETIME,
    Context TEXT,
    PRIMARY KEY (UserID, ChapterID, CommentDate),
    FOREIGN KEY (UserID) REFERENCES UserDetail(UserID),
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ChapterID)
);
