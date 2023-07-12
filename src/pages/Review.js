import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { SERVER } from '../lib/constant';

const Title = styled.div`
    padding-top: 5vh;
    padding-bottom: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: white;
`;

const ChooseResult = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

// ---------------------------------------------

const ReviewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 100px;
    padding-right: 100px;
`;

const BoardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ContainerBoard = styled.div`
    margin: 10px;
    padding: 0px;
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 300px;
    align-items: center;
    justify-content: center;

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    position: relative;
`;
const BoardTop = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BoardBottom = styled.div`
    background-color: white;
    width: 100%;
    height: 30%;
    background-color: rgba(82, 88, 136, 0.8);
    text-align: center;
`;

const PhotoSpace = styled.div`
    width: 100%;
    height: 30%;
`;

const BoardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 20px;
`;
const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
`;

const BoardPhoto = styled.div`
    /* background-color: blue; */
    width: 40%;
    height: 30%;
    border-radius: 100%;
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid white;
    object-fit: cover;
`;

const BoardUserId = styled.div`
    margin-top: 4vh;
    color: rgba(50, 50, 160, 1);
    font-weight: bolder;
`;

const BoardTestName = styled.div`
    margin-top: 1vh;
    color: rgba(50, 50, 160, 1);
    font-weight: bolder;
`;

const BoardResult = styled.div`
    color: white;
`;

const BoardTime = styled.div`
    color: white;
`;
const Review = () => {
    //review 테이블
    const [tests, setTests] = useState([]);
    const [posts, setPosts] = useState([]);

    const [selectedOption, setSelectedOption] = useState('All');

    useEffect(() => {
        //test 목록 가져오기(test 테이블)
        axios
            .get(`${SERVER}/test`)
            .then((testResponse) => {
                setTests(testResponse.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    //선택한 option값으로 post가져오기 function
    const getPosts = (option) => {
        axios
            .get(`${SERVER}/review`, {
                params: {
                    selectedOption: option,
                },
            })
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        //게시물 목록 가져오기(게시판 테이블)
        getPosts(selectedOption);
    }, [selectedOption]);

    //select에 결과 넣어주기
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    //날짜
    const extractDate = (dateTime) => {
        const [date] = dateTime.split('T');
        return date;
    };

    //시간
    const formatTime = (dateTime) => {
        const dateObj = new Date(dateTime);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();

        // 시, 분, 초
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds,
        ).padStart(2, '0')}`;

        return formattedTime;
    };

    return (
        <div>
            {/* 게시물의 title */}
            <Header></Header>
            <Title>
                <h1>Review</h1>
                <ChooseResult>
                    <h3>Type :&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <div>
                        <select value={selectedOption} onChange={handleSelectChange}>
                            <option value="All">All test</option>
                            {tests.length > 0 ? (
                                <>
                                    {tests.map((test) => (
                                        <option value={test.test_name} key={test.test_id}>
                                            {test.test_name}
                                        </option>
                                    ))}
                                </>
                            ) : (
                                <option value="none">No tests available</option>
                            )}
                        </select>
                    </div>
                </ChooseResult>
            </Title>
            <ReviewWrapper>
                <BoardWrapper>
                    {posts.map((post) => (
                        <ContainerBoard key={post.id}>
                            <BoardTestName>{post.test_name}</BoardTestName>
                            <BoardTop>
                                <BoardContent>{post.content}</BoardContent>
                            </BoardTop>
                            <PhotoSpace></PhotoSpace>
                            <BoardPhoto>
                                <ProfileImg src={`../../profile/${post.img}.jpg`} />
                            </BoardPhoto>
                            <BoardBottom>
                                <BoardUserId>{post.user_id}</BoardUserId>
                                <BoardResult>{post.result}</BoardResult>
                                <BoardTime>
                                    {extractDate(post.created_at)} {formatTime(post.created_at)}
                                </BoardTime>
                            </BoardBottom>
                        </ContainerBoard>
                    ))}
                </BoardWrapper>
            </ReviewWrapper>
            <Footer></Footer>
        </div>
    );
};

export default Review;
