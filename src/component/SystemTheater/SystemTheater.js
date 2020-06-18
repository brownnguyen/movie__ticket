import React, { useEffect, useState, Fragment } from 'react';
import { Tabs } from 'antd';
import { movieServices } from '../../Services/MoviesServices';
import './SystemTheater.scss';
import moment from 'moment';
const { TabPane } = Tabs;
export default function SystemTheater() {
    let [systemTheater, setSystemTheater] = useState([]);
    let [idTheater, setIdTheater] = useState("BHDStar");
    let [movies, setMovies] = useState([]);
    useEffect(() => {
        const getServices = async () => {
            try {
                let systemTheater = await movieServices.GetSystemTheaterInfo();
                setSystemTheater(systemTheater.data);
                let chooseMovie = await movieServices.GetListMovieInfo(idTheater);
                setMovies(chooseMovie.data);
            }
            catch (error) {
                console.log(error.reponse)
            }
        }
        getServices();
    }, [idTheater]);
    const GetIDTheater = (name) => {
        console.log(name);
        setIdTheater(name)
        console.log(idTheater)
    }
    const renderTheater = () => {
        return (
            <Tabs className="theater__info"
                defaultActiveKey="0"
                tabPosition={"left"}
                style={{ width: '100%', paddingLeft: 0 }}>
                {movies.map((item) => {
                    return item.lstCumRap.map((item, index) => {
                        return (
                            <TabPane
                                key={index}
                                tab={
                                    <div className="theater__details" onClick={() => { }}>
                                        <h4>{item.tenCumRap.length > 30 ? item.tenCumRap.substr(0, 30) + ". . ." : item.tenCumRap}</h4>
                                        <p>{item.diaChi.length > 30 ? item.diaChi.substr(0, 30) + ". . ." : item.diaChi}</p>
                                    </div>
                                }>
                                {item.danhSachPhim.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div className="movie__name__img">
                                                <div className="movie__img">
                                                    <img width={50} height={50} src={item.hinhAnh} alt={item.tenPhim} />
                                                </div>
                                                <div className="movie__name">
                                                    <p>{item.tenPhim}</p>
                                                </div>
                                            </div>
                                            <div className="div__schedule">
                                                {item.lstLichChieuTheoPhim?.map((item, index) => {
                                                    return (
                                                        <span className="schedule__movie"
                                                            key={index}>{moment(item.ngayChieuGioChieu).format('hA')}</span>
                                                    )
                                                }).splice(0, 12)}
                                            </div>
                                        </Fragment>
                                    )
                                }
                                )}
                            </TabPane>
                        )
                    }
                    )
                }
                )}
            </Tabs>
        )
    }
    return (
        <div style={{ width: "60%", height: "500px", overflow: "hidden", margin: "50px auto", border: "1px solid rgba(0,0,0,0.05" }}>
            <Tabs className="theater__logo__left" id="systemTheater"
                defaultActiveKey="0"
                tabPosition={"left"}
                style={{ width: '100%', height: "500px", overflowY: "auto" }}>
                {systemTheater.map((theater, index) => (
                    <TabPane
                        tab={<img src={theater.logo}
                            style={{ width: "50px", height: "50px" }}
                            alt={theater.tenHeThongRap}
                            onClick={() => GetIDTheater(theater.maHeThongRap)} />}
                        key={index}>
                        {renderTheater()}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    )
}
