// src/components/Header.js
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../styles/Manga.css";

import { fetchManga, fetchMangaComment } from "../../api/SiteService";
import {
  likeManga,
  followManga,
  getLikeStatus,
  getFollowStatus,
  commentManga,
} from "../../api/AccountService";

const Manga = () => {
  const { mangaId } = useParams();

  const [isLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [isAdmin] = useState(localStorage.getItem("roleId") === "1");
  const [isLike, setIsLike] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  const [manga, setManga] = useState([]);
  const [genres, setGenres] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getManga = async () => {
      try {
        const data = await fetchManga(mangaId);
        setManga(data.manga);
        setGenres(data.genres);
        setChapters(data.chapters);
      } catch (error) {
        console.error("Error getting manga:", error);
      }
    };

    const getComments = async (pageNumber) => {
      try {
        const data = await fetchMangaComment(mangaId, pageNumber);
        setComments(data.comments);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error get list manga:", error);
      }
    };

    const fetchLikeStatus = async () => {
      try {
        const response = await getLikeStatus(mangaId);
        setIsLike(response.code === 200);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    const fetchFollowStatus = async () => {
      try {
        const response = await getFollowStatus(mangaId);
        setIsFollow(response.code === 200);
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };

    if (isLoggedIn) {
      fetchLikeStatus();
      fetchFollowStatus();
    }

    getManga();
    getComments(currentPage);
  }, [mangaId, isLoggedIn, currentPage]);

  const handleLikeClick = async () => {
    try {
      if (!isLoggedIn) {
        alert("Bạn phải đăng nhập để sử dụng chức năng này.");
        return;
      }

      const newStatus = !isLike;
      await likeManga(mangaId, newStatus);
      setIsLike(newStatus);
    } catch (error) {
      console.error("Error liking manga:", error);
    }
  };

  const handleFollowClick = async () => {
    try {
      if (!isLoggedIn) {
        alert("Bạn phải đăng nhập để sử dụng chức năng này.");
        return;
      }

      const newStatus = !isFollow;
      await followManga(mangaId, newStatus);
      setIsFollow(newStatus);
    } catch (error) {
      console.error("Error following manga:", error);
    }
  };

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setCurrentPage(page);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Bạn phải đăng nhập để sử dụng chức năng này.");
      return;
    }

    const response = await commentManga(mangaId, newComment);
    console.log(response);
    window.location.reload();
  };

  return (
    <div className="manga-layout">
      <div className="manga-item__sidebar-one"></div>

      <div className="manga-item__main-column">
        {manga.map((mangaItem) => (
          <div key={mangaItem.MangaId} className="manga-info">
            <div className="manga-cover">
              <img
                src={mangaItem.CoverImageUrl}
                alt={mangaItem.StoryName}
                className="manga-cover"
              />
            </div>

            <div className="manga-info-detail">
              <h4>{mangaItem.StoryName}</h4>
              <div className="list-info">
                <p>
                  <strong>Tác giả:</strong> {mangaItem.AuthorName}
                </p>
                <p>
                  <strong>Độ tuổi:</strong> {mangaItem.AgeLimit}+
                </p>
                <p>
                  <strong>Lượt xem:</strong> {mangaItem.NumViews}
                </p>
                <p>
                  <strong>Lượt theo dõi:</strong> {mangaItem.NumFollows}
                </p>
                <p>
                  <strong>Lượt yêu thích:</strong> {mangaItem.NumLikes}
                </p>
              </div>

              <div className="btn-like-follow">
                <button type="button" id="btn-like" onClick={handleLikeClick}>
                  {isLike ? "Huỷ thích" : "Thích"}
                </button>
                <button
                  type="button"
                  id="btn-follow"
                  onClick={handleFollowClick}
                >
                  {isFollow ? "Huỷ theo dõi" : "Theo dõi"}
                </button>
              </div>

              {isAdmin ? (
                <div className="btn-admin">
                  <div>
                    <NavLink to={`/update-manga/${mangaItem.MangaId}`}>
                      Cập nhật thông tin truyện
                    </NavLink>
                  </div>

                  <div>
                    <NavLink to={`/upload-chapter/${mangaItem.MangaId}`}>
                      Đăng chương mới
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}

        <div className="manga-description">
          <div className="genre-list">
            {genres.map((genre) => (
              <NavLink
                key={genre.GenreID}
                to={`/?genreId=${genre.GenreID}&pageNumber=1`}
              >
                {genre.GenreName}
              </NavLink>
            ))}
          </div>
          {manga.map((mangaItem) => (
            <div key={mangaItem.MangaId} className="description">
              <strong>Description:</strong> {mangaItem.Description}
            </div>
          ))}
        </div>

        <div className="header-title">
          <h4>List Chapter</h4>
        </div>
        <div className="manga-chapter">
          {chapters.map((chapter) => (
            <div key={chapter.ChapterID} className="chapter-row">
              <div className="chapter-name">
                <NavLink to={`/chapter/${chapter.ChapterID}`}>
                  {chapter.ChapterName}
                </NavLink>
              </div>
              <div className="publish-date">{chapter.PublishedDate}</div>
            </div>
          ))}
        </div>

        <div className="header-title ">
          <h4>Comments</h4>
        </div>
        <div className="manga-comment">
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Bình luận..."
            />
            <button onClick={handleSubmitComment}>Bình luận</button>
          </div>

          <ul>
            {comments.map((comment) => (
              <li key={comment.commentDate}>
                {comment.username}: {comment.context}
              </li>
            ))}
          </ul>

          <div className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Previous"
              onPageChange={handlePageClick}
              pageCount={totalPages}
              forcePage={currentPage - 1}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </div>

      <div className="manga-item__sidebar-two"></div>
    </div>
  );
};

export default Manga;
