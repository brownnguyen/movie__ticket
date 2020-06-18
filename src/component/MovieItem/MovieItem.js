import React, { useEffect, useState } from 'react'
import { Layout, Row, Col } from 'antd'
import { movieServices } from '../../Services/MoviesServices';
import { StarFilled } from '@ant-design/icons';
import moment from 'moment';
import './MovieItem.scss';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const { Content } = Layout;
export default function MovieItem(props) {
    let [movieItem, setMovieItem] = useState({});
    useEffect(() => {
        const getMovieItem = async () => {
            try {
                let movie = await movieServices.GetMovieInfo(props.movieId);
                setMovieItem(movie.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        getMovieItem();
    }, [])
    const showStar = () => {
        let arrStar = []
        for (let i = 0; i < movieItem.danhGia / 2 - 0.5; i++) {
            arrStar.push(<StarFilled />)
        }
        if (movieItem.danhGia % 2 === 1) {
            arrStar.push('1/2');
        }
        return arrStar
    }
    const showMovieTime = () => {
        return movieItem.heThongRapChieu?.map((item, index) => {
            return (
                <TabPane tab={<img src={item.logo} alt={item.tenHeThongRap}
                    style={{ width: 50, height: 50 }} />}
                    key={index}>
                    {item.cumRapChieu?.map((item, index) => {
                        console.log(item)
                        return (
                            <div>
                                <div>
                                    <h4 className="theater__movie">
                                        {item.tenCumRap}
                                    </h4>
                                </div>
                                <div>
                                    {item.lichChieuPhim.map((item, index) => {
                                        return (
                                            <span className="schedule__movieItem">{moment(item.ngayChieuGioChieu).format('hA')}</span>
                                        )
                                    }).splice(0, 15)}
                                </div>
                            </div>
                        )
                    })}
                </TabPane>
            )
        })
    }
    const bookingMovie = (element) => {
        setTimeout(() => {
            document.querySelector(element).scrollIntoView()
        }, 500)
    }
    return (
        <Layout>
            <div className="blur__movieBackground" style={{ backgroundImage: "url(" + movieItem.hinhAnh + ")" }}></div>
            <div className="layer__movieItem"></div>
            <Content className="movieItem__content">
                <Row className="row__movieItem">
                    <Row style={{ width: "70%", margin: "auto", padding: "100px" }}>
                        <Col md={18}>
                            <div className="movie__left">
                                <img src={movieItem.hinhAnh} style={{ width: 250, height: 350, borderRadius: "10px" }} alt={movieItem.biDanh} />
                                <div className="movie__content">
                                    <p>Ngày khởi chiếu: {moment(movieItem.ngayKhoiChieu).format("DD MM YYYY")}</p>
                                    <h3>{movieItem.tenPhim}</h3>
                                    <span onClick={() => bookingMovie('#booking__movie')} className="booking__movieItem">Đặt vé</span>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="movie__right">
                                <div>
                                    <div className="danhGia__border">{movieItem.danhGia}</div>
                                    <div className="star">
                                        {showStar()}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Row>
                <Row id="booking__movie" style={{ width: "60%", margin: "0 auto", backgroundColor: "white", borderRadius: 10 }}>
                    <Tabs className="movieItem__schedule" tabPosition={"left"} style={{ padding: 20 }}>
                        {showMovieTime()}
                    </Tabs>
                </Row>

            </Content>
        </Layout>
    )
}
