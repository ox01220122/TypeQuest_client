import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import LogoSrc from '../assets/TQ.png';
import { Link, useNavigate } from 'react-router-dom';
import { SERVER } from '../lib/constant';

const LoginHeader = styled.h1`
    font: bold 35px/1 'Noto Sans KR';
    margin: 25px;
    padding: 25px;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            font: bold 20px/1 'Noto Sans KR';
            margin: 10px;
            padding: 10px;
        }
    }
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 15px;
    position: relative; /* 추가 */

    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            max-width: 414px;
            margin: 0px;
        }
    }
`;
export const Input = styled.input`
    width: 460px;
    /* 테두리 상단 둥글게 */
    border: 1px solid #777;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    min-height: 50px;
    padding: 0 10px 0 15px;
`;

export const InputBottom = styled.input`
    width: 460px;
    /* 테두리 하단 둥글게 */
    border: 1px solid #777;
    border-radius: 0px 0px 15px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    min-height: 50px;
    padding: 0 10px 0 15px;
`;
export const WarningContainer = styled.div`
    display: flex;
`;
export const SignInBtn = styled.button`
    border-radius: 25px;
    border: 1px solid rgba(255, 255, 255, 1);
    display: block;
    background-color: #fff;
    color: rgba(255, 255, 255, 1);
    height: 3rem;
    padding: 0.625rem 1rem;
    font-weight: 700;
    width: 160px;
    max-width: 100%;
    margin: 2rem auto 0.8rem;
    &:hover {
        cursor: pointer;
    }
    a {
        color: rgba(82, 88, 136, 1);
    }
`;
export const SubmitBtn = styled.button`
    border: 0px;
    display: block;
    background-color: #04202f;
    color: #fff;
    height: 3rem;
    padding: 0.625rem 1rem;
    border-radius: 25px;
    font-weight: 700;
    width: 160px;
    max-width: 100%;
    margin: 2rem auto 0.8rem;
    &:hover {
        font: 18px;
        cursor: pointer;
    }
    a {
        color: rgba(82, 88, 136, 1);
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    width: 460px;
    align-items: center;
    justify-content: center;
    margin: 0px;
    //모바일 사이즈
    @media screen {
        @media (max-width: 930px) {
            width: 350px;
        }

        @media (max-width: 768px) {
            width: 350px;
        }
    }
`;
export const Warn = styled.p`
    display: flex;
    align-items: center;
    color: rgba(82, 88, 136, 1);
    font-size: 0.8rem;
    font-weight: 700;
    position: absolute;
`;
export const Filed = styled.fieldset`
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;

    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;

export const Hidden = styled.legend`
    position: absolute;
    top: -9999px;
    opacity: 0;
`;

const Logo = styled.img`
    width: 200px;
    height: 10vh;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 150px;
            height: 7.5vh;
        }
    }
`;

const InnerLogin = styled.div`
    display: flex;
    margin: 0 auto;
    width: 100%;
    font: 14px/1 'arial';
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: rgba(82, 88, 136, 1);
    height: 100vh;
    padding: 0px;
    color: white;
    @media screen {
        //모바일 사이즈
        @media (max-width: 768px) {
            height: 100vh;
            align-items: center;
        }
    }
`;

function Login() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const user_id = useRef();
    user_id.current = watch('user_id');

    const password = useRef();
    password.current = watch('password');

    const [loading] = useState(false);

    // 로그인 버튼 클릭시 데이터 연결

    let body = {
        user_id,
        password,
    };

    const onSubmit = (data) => {
        axios
            .post(`${SERVER}/login`, body)
            .then((response) => {
                // 로그인 성공 처리 로직을 여기에 작성하세요.
                if (response.data.result === false) {
                    alert(response.data.msg);
                    window.location.href = '../Login';
                    return;
                } else {
                    //로그인 성공시 입력한 id, pw를 세션스토리지에 데이터 저장
                    sessionStorage.setItem('user_data', user_id.current);
                    navigate('../MbtiPage');
                }
            })
            .catch((error) => {
                console.error(error); // 에러 처리
            });
    };

    const onClickHandler = () => {
        // 로고 클릭시 메인 페이지로 이동
        navigate('../');
    };

    return (
        <>
            <InnerLogin>
                <div className="logoContainer">
                    <Logo src={LogoSrc} alt="" onClick={onClickHandler} />
                </div>
                {/* <MainHeader /> */}
                <div className="container">
                    <div className="Left">
                        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                            <Filed>
                                <Hidden>로그인 양식 </Hidden>
                                <LoginHeader>Login</LoginHeader>

                                <InputContainer>
                                    <InputWrapper>
                                        <Input
                                            className={`Input_top ${errors.user_id ? 'error' : ''}`}
                                            name="user_id"
                                            placeholder="아이디"
                                            {...register('user_id', {
                                                required: '아이디를 입력해주세요',
                                                maxLength: {
                                                    value: 10,
                                                    message: '아이디는 10자 이하로 만들어주세요,',
                                                },
                                            })}
                                        />
                                        {errors.user_id && <Warn>{errors.user_id.message}</Warn>}
                                    </InputWrapper>
                                    <InputWrapper>
                                        <InputBottom
                                            className={`Input_bottom ${errors.password ? 'error' : ''}`}
                                            name="password"
                                            type="password"
                                            placeholder="비밀번호"
                                            {...register('password', {
                                                required: '비밀번호를 입력해주세요',
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,24}$/,
                                                    message:
                                                        '비밀번호는 대문자와 숫자를 포함하여 4자리 이상 입력해주세요',
                                                },
                                            })}
                                        />
                                        {errors.password && <Warn>{errors.password.message}</Warn>}
                                    </InputWrapper>
                                    <SubmitBtn type="submit" disabled={loading}>
                                        Login
                                    </SubmitBtn>
                                </InputContainer>
                            </Filed>
                        </form>
                    </div>

                    <div className="Right">
                        <Filed>
                            <LoginHeader>Hello</LoginHeader>

                            <InputContainer>
                                <InputWrapper>
                                    <div className="contentSignup">
                                        Enter your personal details and start journey with us. This site that makes your
                                        trip more enjoyable! Find out your favorite travel destinations and YouTubers
                                        with MBTI.
                                    </div>
                                </InputWrapper>
                                <SignInBtn to="/Join">
                                    <Link to="/Join">회원가입</Link>
                                </SignInBtn>
                            </InputContainer>
                        </Filed>
                    </div>
                </div>
            </InnerLogin>
        </>
    );
}

export default Login;
