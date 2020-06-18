import React, { useEffect, useState } from 'react';
import "./MovieList.scss";
import { Tabs } from 'antd';
import { movieServices } from '../../Services/MoviesServices';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import Slider from 'react-slick';
const { Meta } = Card;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
export default function MovieList(props) {
    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                }
            }
        ]
    };
    let [movieListWatching, setMovieListWatching] = useState([]);
    let [movieListComming, setMovieListComming] = useState([]);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                let watchingMovie = await movieServices.FetchWatchingMovie()
                setMovieListWatching([...watchingMovie.data]);
                let commingMovie = await movieServices.FetchCommingMovie();
                setMovieListComming([...commingMovie.data])
            }
            catch (error) {
                console.log(error.response);
            }
        }
        fetchMovie();
    }, [])
    const renderStar = (range) => {
        let arrStar = []
        for (let i = 0; i < (range / 2 - 1 / 2); i++) {
            arrStar.push(<StarFilled className="star" key={i} />)
        }
        if (range % 2 === 1) {
            arrStar.push(<span key={range++} className="starHalf">1/2</span>)
        }
        return arrStar;
    }
    const renderMovieWatching = () => {
        return movieListWatching.map((movie, index) => {
            return (
                <NavLink key={index}
                    to={`/chitietphim/${movie.maPhim}`}
                    exact>
                    <Card
                        className="card__movie"
                        hoverable
                        style={{ width: 240, border: "transparent" }}
                        cover={<>
                            <img alt={movie.biDanh}
                                src={movie.hinhAnh}
                                style={{ height: 280, borderRadius: "5px" }} />
                            <div className="layer"></div>
                        </>}>
                        <Meta title={movie.tenPhim}
                            description={renderStar(movie.danhGia)} />
                        <button className="ticket__booking">Đặt vé</button>
                    </Card>
                </NavLink>
            )
        })
    }
    const renderMovieComming = () => {
        return movieListComming.map((movie, index) => {
            return (
                <Card key={index}
                    className="card__movie"
                    hoverable
                    style={{ width: 240, border: "transparent" }}
                    cover={<>
                        <img alt={movie.biDanh}
                            src={movie.hinhAnh}
                            style={{ height: 280, borderRadius: "5px" }} />
                        <div className="layer"></div>
                    </>}>
                    <Meta title={movie.tenPhim}
                        description={'In comming movie'} />
                    <button className="ticket__booking">Đặt vé</button>
                </Card>
            )
        })
    }
    return (
        <>
            <Tabs className="movieList" id="movieList"
                style={{ color: "black", width: "80%", margin: "0 auto" }}
                defaultActiveKey="1"
                onChange={callback}>
                <TabPane tab="Phim đang chiếu" key="1">
                    <Slider {...settings}>
                        {renderMovieWatching()}
                    </Slider>

                </TabPane>
                <TabPane tab="Phim sắp chiếu" key="2">
                    <Slider {...settings}>
                        {renderMovieComming()}
                    </Slider>
                </TabPane>
            </Tabs>
        </>
    )
}
