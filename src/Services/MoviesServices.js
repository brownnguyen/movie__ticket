import Axios from 'axios';
const { groupID, domain, groupIDnew } = require("../settings/configs")

class MovieServices {
    FetchWatchingMovie = () => {
        return Axios({
            method: "GET",
            url: `${domain}/QuanLyPhim/LayDanhSachPhim?maNhom=${groupID}`
        })
    }
    FetchCommingMovie = () => {
        return Axios({
            method: "GET",
            url: `${domain}/QuanLyPhim/LayDanhSachPhim?maNhom=${groupIDnew}`
        })
    }
    GetSystemTheaterInfo = () => {
        return Axios({
            method: "GET",
            url: `${domain}/QuanLyRap/LayThongTinHeThongRap`
        })
    }
    GetTheaterInfo = (name) => {
        return Axios({
            method: "GET",
            url: `${domain}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${name}`
        })
    }
    GetListMovieInfo = (idTheater) => {
        return Axios({
            method: "GET",
            url: `${domain}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${idTheater}&maNhom=GP01`
        })
    }
    GetMovieInfo = (id) => {
        return Axios({
            method: "GET",
            url: `${domain}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
        })
    }
    Login = (data) => {
        return Axios({
            method: "POST",
            url: `${domain}/QuanLyNguoiDung/DangNhap`,
            data
        })
    }
    Register = (data) => {
        return Axios({
            method: "POST",
            url: `${domain}/QuanLyNguoiDung/DangKy`,
            data
        })
    }
}
export const movieServices = new MovieServices();