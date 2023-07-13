import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './Header';
import { SERVER } from '../lib/constant';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled.fieldset`
    color: white;
    font-size: 1.8rem;
    padding-top: 2rem;
    padding-bottom: 3rem;
    width: 50%;
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Login = styled.input`
    width: 70%;
    height: 3rem;
    background: none;
    background-color: rgba(200, 200, 200, 0.1);
    color: white; /* 글자색 흰색으로 변경 */
    font-size: large;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    &:focus {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* 포커스 시 그림자 변경 */
    }
`;

const SendButton = styled.button`
    width: 20%;
    background: none;
    background-color: rgba(200, 200, 200, 0.1);
    color: white;
    font-size: large;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    &:hover {
        background-color: rgba(82, 88, 136, 1);
        color: white;
    }
`;

const AdminPage = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const login = () => {
        const data = {
            code: code,
        };
        axios
            .post(`${SERVER}/adminLogin`, data)
            .then((response) => {
                if (!response.data) {
                    alert('Manager CODE가 잘못되었습니다');
                    setCode('');
                } else {
                    navigate('/Adminpage');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <Header></Header>
            <LoginWrapper>
                <legend>Manager CODE</legend>
                <Login onChange={handleInputChange} />
                <SendButton onClick={login}>입력</SendButton>
            </LoginWrapper>
        </div>
    );
};

export default AdminPage;
