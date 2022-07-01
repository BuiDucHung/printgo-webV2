

export const checkErrorBefore = (value, type='text') => {
    if(type === 'password') {
        return (value && value.length >= 6) ? null : "Mật khẩu tối thiểu 6 ký tự .!!";
    }
    let isnum = /^\d+$/.test(value);
    if(isnum) {
      var vnf_regex = /((09|03|07|08|05|01|02)+([0-9]{8})\b)/g;
      const ret = vnf_regex.test(value);
      return !ret ? "Sai định dạng số điện thoại" : null
    } else {
      var re_email = /\S+@\S+\.\S+/;
      return re_email.test(value) ? null : "Sai định dang email"
    }
}

export const formatTimeDone = time => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
}

export const textDetailStatus = (status) => {
  const t = {
      0 : 'Chờ thanh toán', 8 : 'Hoàn thành',
      1: 'Đang thiết kế', 2: 'Sửa thiết kế',
      3: 'Thiết kế xong', 17: 'Chờ duyệt thiết kế',
      13: 'Chờ duyệt sản xuất', 4: 'Sản xuất và gia công',
      5: 'Chuyển về kho', 6: 'Trong kho',
      7: 'Đã giao', 26: 'Đang giao'
  };
  return t[status] || 'Đang xử lý';
}