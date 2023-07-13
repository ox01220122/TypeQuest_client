import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateReview.scss';
import { SERVER } from '../lib/constant';

function YoutubeReview({ mbtiResult, onClose }) {
    const [reviewData, setReviewData] = useState({
        title: '',
        content: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value,
        });
    };
    //세션 스토리지에 유저 아이디 가져오기
    const userId = sessionStorage.getItem('user_data');
    const test_name = '유튜버Test';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            content: reviewData.content,
            result: mbtiResult,
            userId: userId,
            test_name,
        };

        try {
            // send data to API
            const response = await axios.post(`${SERVER}/review`, dataToSend);
            console.log('response', response);

            // Close the popup
            onClose();
            navigate('/Review'); // 페이지 이동
        } catch (error) {
            console.error('Failed to write review:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="popup-nav">
                    <h3>리뷰 작성하기</h3>
                    <button className="close-button" onClick={handleClose}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="content"
                        className="writeReview"
                        value={reviewData.content}
                        onChange={handleChange}
                        placeholder="내용"
                    />
                    <button type="submit" className="submitReview">
                        리뷰 작성
                    </button>
                </form>
            </div>
        </div>
    );
}

export default YoutubeReview;
