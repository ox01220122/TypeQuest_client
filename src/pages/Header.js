import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from '../assets/TQ.png';
//navigate
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FiMenu } from 'react-icons/fi';

const Hamburger = styled.div`
    display: none;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 30px;
        padding: 5px;
    }
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    height: 10vh;

    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            height: 7.5vh;
        }
    }
`;

const Logo = styled.img`
    width: 200px;
    height: 10vh;
    cursor: pointer;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 150px;
            height: 7.5vh;
        }
    }
`;

const Categories = styled.div`
    display: flex;
    justify-content: center;
    font: 18px/1 'Noto Sans KR';

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const Category = styled.div`
    margin: 5px 10px;
    padding: 10px;
    cursor: pointer;

    a {
        text-decoration: none;
        color: rgba(11, 31, 46, 1);

        &:hover {
            color: rgba(131, 25, 166, 1);
            border-bottom: 2px solid rgba(131, 25, 166, 1);
        }
    }
`;

const MobileCategories = styled.div`
    text-align: center;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 768px) {
        display: ${({ open }) => (open ? 'block' : 'none')};
        position: absolute;
        top: 7%;
        opacity: ${({ open }) => (open ? '1' : '0')};
        transition: opacity 0.8s, top 0.8s;
        z-index: 10;
        width: -webkit-fill-available;
    }
`;

const MobileCategory = styled.div`
    margin-bottom: 10px;

    a {
        text-decoration: none;
        color: rgba(11, 31, 46, 1);

        &:hover {
            color: rgba(131, 25, 166, 1);
            border-bottom: 2px solid rgba(131, 25, 166, 1);
        }
    }
`;

const Sign = styled.div`
    display: flex;
    width: 200px;
    height: 100px;
    align-items: center;
    justify-content: center;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 150px;
            height: 30px;
            padding: 5px;
        }
    }
`;

const SignButton = styled.button`
    width: 90px;
    height: 40px;
    background-color: white;
    font: 14px/1 'Noto Sans KR';
    margin-left: auto;
    border: none;
    color: rgba(82, 88, 136, 1);
    cursor: pointer;
    margin: 4px;

    @media screen {
        @media (max-width: 768px) {
            width: 80px;
            height: 30px;
        }
    }
`;
const MobileCategoriesTransition = styled(CSSTransition)`
    &.menu-enter {
        opacity: 0;
        transform: translateY(-10px);
    }

    &.menu-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 300ms, transform 300ms;
    }

    &.menu-exit {
        opacity: 1;
        transform: translateY(0);
    }

    &.menu-exit-active {
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 300ms, transform 300ms;
    }
`;

function MainHeader() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const [loggedIn, setLoggedIn] = useState();
    const onClickHandler = () => {
        // 로고 클릭시 메인 페이지로 이동
        navigate('/');
    };

    function checkLoggedIn() {
        let isLoggedIn = sessionStorage.getItem('user_data'); // 로그인 상태 확인
        isLoggedIn = isLoggedIn ? true : false;
        setLoggedIn(isLoggedIn);
    }

    const handleLogout = () => {
        sessionStorage.removeItem('user_data');
        setLoggedIn(false);
        alert('로그아웃 되었습니다');
    };
    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <>
            <Header>
                <Logo src={LogoSrc} alt="" onClick={onClickHandler} />
                <Categories>
                    <Category>
                        <Link to="/Personalities">성격 유형</Link>
                    </Category>
                    <Category>
                        <Link to="/MbtiPage">테스트</Link>
                    </Category>
                    <Category>
                        <Link to="/Review">후기</Link>
                    </Category>
                    <Category>
                        <Link to="/ChatLogin">채팅</Link>
                    </Category>
                </Categories>
                <MobileCategoriesTransition in={mobileMenuOpen} classNames="menu" timeout={300} unmountOnExit>
                    <MobileCategories open={mobileMenuOpen}>
                        <MobileCategory>
                            <Link to="/Personalities">성격 유형</Link>
                        </MobileCategory>
                        <MobileCategory>
                            <Link to="/MbtiPage">테스트</Link>
                        </MobileCategory>
                        <MobileCategory>
                            <Link to="/Review">후기</Link>
                        </MobileCategory>
                        <MobileCategory>
                            <Link to="/ChatLogin">채팅</Link>
                        </MobileCategory>
                    </MobileCategories>
                </MobileCategoriesTransition>

                <Sign>
                    {loggedIn === true ? (
                        <Link to="/">
                            <SignButton onClick={handleLogout}>로그아웃</SignButton>
                        </Link>
                    ) : (
                        <Link to="/Login">
                            <SignButton>로그인</SignButton>
                        </Link>
                    )}
                    {loggedIn === true ? (
                        <Link to="/UserPage">
                            <SignButton>MyPage</SignButton>
                        </Link>
                    ) : (
                        <Link to="/Join">
                            <SignButton>회원가입</SignButton>
                        </Link>
                    )}
                </Sign>
                <Hamburger onClick={handleMenuToggle}>
                    <FiMenu size={25} />
                </Hamburger>
            </Header>
        </>
    );
}

export default MainHeader;
