import React from "react";

const GuidePage = () => {
  return (
    <div>
      <div className="home-header">
        <h3>Hướng dẫn quản lý truyện/chương</h3>
      </div>
      <div>
        <h4>Hướng dẫn đăng truyện mới</h4>
        <ol>
          <li>Chọn mục Quản lý - Đăng truyện</li>
          <li>Điền thông tin truyện và chọn ảnh bìa</li>
          <li>Chọn thể loại truyện</li>
          <li>Nhấn nút 'Đăng truyện' để xác nhận đăng truyện mới</li>
        </ol>
      </div>

      <div>
        <h4>Hướng dẫn chỉnh sửa thông tin truyện</h4>
        <ol>
          <li>
            Chọn một truyện muốn sửa thông tin trong danh sách (Trang chủ, Trang
            tìm kiếm,...)
          </li>
          <li>Nhấn nút 'Cập nhật thông tin truyện'</li>
          <li>Chỉnh sửa thông tin truyện, bìa truyện hoặc thể loại</li>
          <li>
            Nhấn nút 'Cập nhật truyện' để xác nhận cập nhật lại thông tin truyện
          </li>
        </ol>
      </div>

      <div>
        <h4>Hướng dẫn đăng chương mới</h4>
        <ol>
          <li>
            Chọn một truyện muốn đăng chương mới trong danh sách (Trang chủ,
            Trang tìm kiếm,...)
          </li>
          <li>Nhấn nút 'Đăng chương mới'</li>
          <li>
            Nhập tên chương mới (Lưu ý: nên đặt tên chương theo số, ví dụ:
            Chapter 1, Chapter 2, Chapter 2.1, Chapter 3,...)
          </li>
          <li>Nhấn nút 'Thêm ảnh' để thêm ảnh mới vào chương</li>
          <li>Nhấn nút 'Đăng chương' để xác nhận đăng chương mới</li>
        </ol>
      </div>

      <div>
        <h4>Hướng dẫn xoá một chương</h4>
        <ol>
          <li>
            Chọn một truyện muốn xoá chương trong danh sách (Trang chủ, Trang
            tìm kiếm,...)
          </li>
          <li>Chọn chương muốn xoá trong Danh sách chương của truyện</li>
          <li>Nhấn nút 'Xoá chương'</li>
          <li>Hệ thống hỏi xác nhận có muốn xoá</li>
          <li>Nhấn nút 'OK' để xác nhận xoá</li>
        </ol>
      </div>
    </div>
  );
};

export default GuidePage;
