import React, { useState } from 'react'
import './CarouselMovie.scss';
import carouseldata from '../../json/carouseldata.json';
import { CaretRightOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Slider from 'react-slick';
export default function CarouselMovie() {
    let [visible, setVisible] = useState(false);
    let [trailer, setTrailer] = useState({})
    const showModal = (trailer) => {
        setVisible(true)
        setTrailer(trailer)
    };
    let settings = {
        dots: true,
        speed: 500,
        autoplay: true,
    };
    const handleCancel = e => {
        console.log(e);
        setVisible(false)
    };
    const renderCarousel = () => {
        return carouseldata.image.map((image, index) => {
            return (
                <div className="carousel__render" key={index}>
                    <div className="img__playIcon">
                        <img className="img__carousel"
                            style={{ width: "100%", height: "100%" }}
                            src={image.src} alt={image.name} />
                        <div onClick={() => showModal(image.trailer)} className="play__icon"><CaretRightOutlined className="icon__content"
                            style={{ paddingLeft: "5px", color: "white" }} />
                        </div>
                    </div>
                </div>

            )
        })
    }
    return (
        <>
            <Slider {...settings} className="carousel__content">
                {renderCarousel()}
            </Slider>
            <Modal
                className="modal__movie"
                footer={null}
                visible={visible}
                trailer={trailer}
                onCancel={handleCancel}>
                <iframe width="100%"
                    height="100%"
                    src={trailer}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullscreen></iframe>
            </Modal>
        </>
    )
}
