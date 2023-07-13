import React, { useRef, useState } from 'react';
import { Wrapper, Inner } from './Main';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from './Header';
import Footer from './Footer';
import { SERVER } from '../lib/constant';

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 3px;
    margin: 15px;
    position: relative; /* 추가 */

    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 360px;
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

    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 350px;
        }
    }
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
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 350px;
        }
    }
`;
export const WarningContainer = styled.div`
    display: flex;
`;

export const SubmitBtn = styled.button`
    border: 0px;
    display: block;
    background-color: #04202f;
    color: #fff;
    height: 3rem;
    border-radius: 15px;
    font-weight: 700;
    width: 460px;
    max-width: 100%;
    &:hover {
        cursor: pointer;
    }
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 350px;
        }
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    width: 460px;
    align-items: center;
    justify-content: center;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 350px;
        }
    }
`;
export const Warn = styled.p`
    display: flex;
    align-items: center;
    color: rgba(200, 200, 200, 0.8);
    font-size: 0.8rem;
    font-weight: 700;
    position: absolute;
`;

export const SlectProfile = styled.div`
    width: 100%;
    height: 6rem;
    border-radius: 100px;
    background-color: rgba(82, 88, 136, 0.8);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 350px;
        }
    }
`;
const ProfileImage = styled.img`
    width: 70%;
    height: 70%;
    border-radius: 100%;
    object-fit: cover;
`;

export const Profile = styled.label`
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    object-fit: cover;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    input[type='checkbox'] {
        width: 100%;
        height: 100%;
        display: none;
        border: 5px solid white;
    }

    &:hover {
        width: 5.2rem;
        height: 5.2rem;
    }

    input[type='checkbox']:checked + ${ProfileImage} {
        width: 100%;
        height: 100%;
    }

    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 4rem;
            height: 4rem;
        }
    }
`;

export const Filed = styled.fieldset`
    border: none;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 400px;
            margin: 0px;
            padding: 0px;
        }
    }
`;

export const Hidden = styled.legend`
    position: absolute;
    top: -9999px;
    opacity: 0;
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// 리액트 hook form 회원가입

function Login() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const password = useRef();
    password.current = watch('password');

    const [loading, setLoading] = useState(false);

    // 회원가입 버튼 클릭시 데이터 연결

    const [selectedProfile, setSelectedProfile] = useState('');

    const handleProfileSelection = (profile) => {
        setSelectedProfile(profile);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const { user_id, password, email, name } = data;
        //이미지데이터 DB저장 형식으로 변환 코드 추가
        try {
            const response = await axios.post(`${SERVER}/signin`, {
                user_id,
                password,
                name,
                email,
                profile: selectedProfile,
            });
            if (response.data.result === 'user') {
                alert(response.data.msg);
                window.location.href = '../Login';
            } else if (response.data.result === false) {
                alert(response.data.msg);
                window.location.href = '../Join';
                return;
            } else {
                alert('회원가입 완료!');
                navigate('../Login');
            }
        } catch (error) {
            alert(error.response.data);
        }
        setLoading(false);
        // 회원가입 완료 되면 페이지 이동
    };

    return (
        <>
            <MainHeader />
            <Wrapper>
                <Inner>
                    <div className="signInForm">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Filed>
                                <Hidden>회원가입 폼 양식 </Hidden>

                                <h1>회원가입</h1>
                                <InputContainer>
                                    <InputWrapper>
                                        <Input
                                            className={`Input_top ${errors.user_id ? 'error' : ''}`}
                                            name="user_id"
                                            placeholder="아이디"
                                            {...register('user_id', {
                                                required: '아이디를 입력해주세요',
                                                maxLength: { value: 10, message: '아이디는 10자 이하로 만들어주세요,' },
                                            })}
                                        />
                                        {errors.user_id && <Warn>{errors.user_id.message}</Warn>}
                                    </InputWrapper>

                                    <InputWrapper>
                                        <InputBottom
                                            className={`Input_bottom ${errors.password ? 'error' : ''}`}
                                            name="password"
                                            type="password"
                                            placeholder="비밀번호를 입력하세요"
                                            {...register('password', {
                                                required: '비밀번호를 입력해주세요',
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,24}$/,
                                                    message: '대문자,숫자,특수문자를 포함하여 4자리 이상 입력',
                                                },
                                            })}
                                        />
                                        {errors.password && <Warn>{errors.password.message}</Warn>}
                                    </InputWrapper>
                                </InputContainer>

                                <InputContainer>
                                    <InputWrapper>
                                        <Input
                                            name="email"
                                            placeholder="이메일"
                                            {...register('email', {
                                                required: '이메일을 입력해주세요',
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: '이메일 형식에 맞지 않습니다',
                                                },
                                            })}
                                        />
                                        {errors.email && <Warn>{errors.email.message}</Warn>}
                                    </InputWrapper>

                                    <InputWrapper>
                                        <InputBottom
                                            name="name"
                                            placeholder="이름"
                                            {...register('name', { required: '이름을 입력해주세요' })}
                                        />
                                        {errors.name && <Warn>{errors.name.message}</Warn>}
                                    </InputWrapper>
                                </InputContainer>
                                <br></br>

                                <h3>SELECT PROFILE</h3>
                                <ProfileContainer>
                                    <SlectProfile>
                                        <Profile>
                                            <input
                                                type="checkbox"
                                                value="dog"
                                                onChange={() => handleProfileSelection('dog')}
                                                checked={selectedProfile === 'dog'}
                                            />
                                            <ProfileImage src="../../profile/dog.jpg" />
                                        </Profile>
                                        <Profile>
                                            <input
                                                type="checkbox"
                                                value="cat"
                                                onChange={() => handleProfileSelection('cat')}
                                                checked={selectedProfile === 'cat'}
                                            />
                                            <ProfileImage src="../../profile/cat.jpg" />
                                        </Profile>
                                        <Profile>
                                            <input
                                                type="checkbox"
                                                value="hamster"
                                                onChange={() => handleProfileSelection('hamster')}
                                                checked={selectedProfile === 'hamster'}
                                            />
                                            <ProfileImage src="../../profile/hamster.jpg" />
                                        </Profile>
                                        <Profile>
                                            <input
                                                type="checkbox"
                                                value="pig"
                                                onChange={() => handleProfileSelection('pig')}
                                                checked={selectedProfile === 'pig'}
                                            />
                                            <ProfileImage src="../../profile/pig.jpg" />
                                        </Profile>
                                        <Profile>
                                            <input
                                                type="checkbox"
                                                value="bird"
                                                onChange={() => handleProfileSelection('bird')}
                                                checked={selectedProfile === 'bird'}
                                            />
                                            <ProfileImage src="../../profile/bird.jpg" />
                                        </Profile>
                                    </SlectProfile>
                                    <SubmitBtn type="submit" disabled={loading}>
                                        회원가입
                                    </SubmitBtn>
                                </ProfileContainer>
                            </Filed>
                        </form>
                    </div>
                    <Footer />
                </Inner>
            </Wrapper>
        </>
    );
}

export default Login;
