// src/components/Header.js
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../styles/Chapter.css";

import { fetchChapter, fetchChapterComment } from "../../api/SiteService";
import { commentChapter } from "../../api/AccountService";

const Chapter = () => {
  const { id } = useParams();
  const [mangaId, setMangaId] = useState([]);
  const [mangaName, setMangaName] = useState([]);
  const [chapterName, setChapterName] = useState([]);
  const [previousChapterId, setPreviousChapterId] = useState([]);
  const [nextChapterId, setNextChapterId] = useState([]);
  const [chapter, setChapter] = useState([]);

  const [isLoggedIn] = useState(!!localStorage.getItem("authToken"));
  // const [isAdmin] = useState(localStorage.getItem("roleId") === "1");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getComments = async (pageNumber) => {
      try {
        const data = await fetchChapterComment(id, pageNumber);
        setComments(data.comments);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error get list manga:", error);
      }
    };

    getChapter(id);
    getComments(currentPage);
  }, [id, currentPage]);

  const getChapter = async (chapterId) => {
    try {
      const data = await fetchChapter(chapterId);
      setMangaId(data.mangaId);
      setMangaName(data.mangaName);
      setChapterName(data.chapterName);
      setPreviousChapterId(data.previousChapterId);
      setNextChapterId(data.nextChapterId);
      setChapter(data.chapter);
    } catch (error) {
      console.error("Error get chapter:", error);
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

    const response = await commentChapter(id, newComment);
    console.log(response);
    window.location.reload();
  };

 

  return (
    <div className="chapter-layout">
      <div className="chapter-info">
        <h3>
          <NavLink to={`/manga/${mangaId}`}>{mangaName}</NavLink> -{" "}
          {chapterName}
        </h3>
      </div>

      <div className="chapter-navigate">
        {previousChapterId ? (
          <NavLink to={`/chapter/${previousChapterId}`}>Chương trước</NavLink>
        ) : (
          <NavLink to="#" className="nav-disable">
            Chương trước
          </NavLink>
        )}

        {nextChapterId ? (
          <NavLink to={`/chapter/${nextChapterId}`}>Chương kế</NavLink>
        ) : (
          <NavLink to="#" className="nav-disable">
            Chương kế
          </NavLink>
        )}
      </div>

      <div className="chapter-images">
        {chapter.map((images) => (
          <div key={images.OrderNumber} className="chapter-image">
            <img src={images.ImageUrl} alt="images" className="chapter-image" />
          </div>
        ))}
      </div>

      <div className="chapter-navigate">
        {previousChapterId ? (
          <NavLink to={`/chapter/${previousChapterId}`}>Chương trước</NavLink>
        ) : (
          <NavLink to="#" className="nav-disable">
            Chương trước
          </NavLink>
        )}

        {nextChapterId ? (
          <NavLink to={`/chapter/${nextChapterId}`}>Chương kế</NavLink>
        ) : (
          <NavLink to="#" className="nav-disable">
            Chương kế
          </NavLink>
        )}
      </div>

      <div className="comment-section">
        <h4>Bình luận</h4>
        <div className="manga-comment">
          <div className="comment-form">
            <div className="comment-area">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Bình luận..."
              />
            </div>

            <div className="comment-button">
              <button onClick={handleSubmitComment}>Bình luận</button>
            </div>
          </div>

          <div className="list-comment">
            <ul>
              {comments.map((comment, index) => (
                <li key={`${comment.commentDate}-${index}`}>
                  <div className="comment-header">
                    <span className="username">{comment.username}</span>
                    <span className="comment-date">{comment.commentDate}</span>
                  </div>
                  <p className="comment-content">{comment.context}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Trang kế"
              previousLabel="Trang trước"
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
    </div>
  );
};

export default Chapter;
