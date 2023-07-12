import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mbti from '../common/api/travelResult.json';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/TotalResult.css';
import Footer from './Footer';
import MainHeader from './Header';

import CreateReview from './CreateReview';
import { SERVER } from '../lib/constant';
import KakaoShareButton from './KakaoShareButton';
function TravelResult() {
    const location = useLocation();
    const mbti = location.state.id;
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const goReview = () => {
        openPopup();
    };

    const goChat = () => {
        navigate('/ChatLogin');
    };

    //
    useEffect(() => {
        // function for sending data
        const sendData = async () => {
            const result = Mbti.find((data) => data.id === mbti.mbti)?.nickname || '';
            console.log('result', result);

            const test_name = '여행Test'; // test name to send
            const user_id = sessionStorage.getItem('user_data'); // User ID stored in session

            try {
                await axios.post(`${SERVER}/participation`, {
                    user_id,
                    result,
                    test_name,
                });
            } catch (error) {
                console.error('Failed to send data:', error);
            }
        };

        if (mbti.mbti) {
            sendData();
        }
    }, []); // 의존성 배열 비워둠
    return (
        <>
            <div className="Layout">
                <MainHeader />
                <div className="resultLayout">
                    <div className="resultTitle">
                        <h2 className="title1">
                            {' '}
                            <img src="image/airplane.png" alt="air" className="titleImg" /> 여행MBTI 결과는?
                        </h2>
                    </div>
                    {Mbti.find((data) => data.id === mbti.mbti) && (
                        <div className="resultShow">
                            <p className="mbti">-{mbti.mbti}-</p>
                            <p className="travelN">{Mbti.find((data) => data.id === mbti.mbti)?.nickname}</p>

                            <img src={Mbti.find((data) => data.id === mbti.mbti)?.img} alt="mbti" className="img" />
                            <ul className="description">
                                <li className="exp">
                                    {Mbti.find((data) => data.id === mbti.mbti)?.description[0].exp}
                                </li>
                                <li className="exp">
                                    {Mbti.find((data) => data.id === mbti.mbti)?.description[1].exp}
                                </li>
                                <li className="exp">
                                    {Mbti.find((data) => data.id === mbti.mbti)?.description[2].exp}
                                </li>
                            </ul>
                            <h1 className="travelTitle">
                                {' '}
                                <img src="image/travel.png" className="rImg" alt="travel" /> 추천하는 여행지는?
                            </h1>
                            <div className="recommend">
                                <img
                                    src={Mbti.find((data) => data.id === mbti.mbti)?.img1}
                                    alt="kk"
                                    className="rec_img"
                                />
                                <img
                                    src={Mbti.find((data) => data.id === mbti.mbti)?.img2}
                                    alt="kk"
                                    className="rec_img"
                                />
                            </div>
                        </div>
                    )}
                    <div className="buttonLayout">
                        <div className="buttonBox">
                            <KakaoShareButton />
                            <button type="button" className="review btn" onClick={goReview}>
                                리뷰쓰기 <img src="image/feedback.png" alt="" width={'23px'} height={'23px'} />
                            </button>
                            <button type="button" className="chat btn" onClick={goChat}>
                                채팅하기 <img src="image/chat.png" alt="" width={'20px'} height={'20px'} />
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <CreateReview onClose={closePopup} />
                    </div>
                </div>
            )}
        </>
    );
}

export default TravelResult;
