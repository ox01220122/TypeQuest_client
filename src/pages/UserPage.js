import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Typography, Box, Button, Grid, Paper, TextField, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import MainHeader from './Header';
import Footer from './Footer';
import { SERVER } from '../lib/constant';

const customTheme = createTheme({
    typography: {
        fontFamily: 'Noto Sans KR, sans-serif',
        h5: {
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#333',
        },
        body1: {
            fontSize: '18px',
            fontWeight: '500',
        },
    },
    palette: {
        primary: {
            main: '#42a5f5',
        },
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    minHeight: '400px',
    marginTop: '30px',
    width: '600px',
    //모바일 사이즈
    '@media (max-width: 600px)': {
        width: '80%',
        margin: '0px',
        marginTop: '30px',
    },
}));

const MyPage = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const id = sessionStorage.getItem('user_data');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${SERVER}/user/${id}`);
                setUsers(response.data.user);
                setUser(response.data.user); // 첫 번째 사용자를 기본 사용자로 설정
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const handleProfileEdit = () => {
        setIsEditing(true);
        setEditedUser(user);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        setUser(editedUser);
        setIsEditing(false);
        try {
            const response = axios.patch(`${SERVER}/user/${id}`, editedUser);
            // 요청이 성공적으로 완료되었을 때의 처리 로직을 추가할 수 있습니다.
        } catch (error) {
            console.error(error);
            // 요청이 실패했을 때의 처리 로직을 추가할 수 있습니다.
        }
    };

    if (!user) {
        return null; // 사용자 데이터가 로드되지 않은 경우, 로딩 중이라고 표시하거나 다른 처리를 할 수 있습니다.
    }

    return (
        <>
            <MainHeader />
            <ThemeProvider theme={customTheme}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <StyledPaper elevation={3}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item>
                                {isEditing ? (
                                    <Avatar
                                        alt="User Avatar"
                                        src={`../../profile/${user.img}.jpg`}
                                        sx={{ width: 120, height: 120 }}
                                    />
                                ) : (
                                    <Avatar
                                        alt="User Avatar"
                                        src={`../../profile/${user.img}.jpg`}
                                        sx={{ width: 120, height: 120 }}
                                    />
                                )}
                            </Grid>
                            <Grid item>
                                {isEditing ? (
                                    <TextField
                                        name="name"
                                        label="이름"
                                        value={editedUser.name || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Typography variant="h4" component="h1">
                                        {user.name}
                                    </Typography>
                                )}

                                <Typography variant="subtitle1" component="div" color="textSecondary">
                                    {isEditing ? (
                                        <TextField
                                            name="email"
                                            label="이메일"
                                            value={editedUser.email || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                {isEditing ? (
                                    <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                                        저장
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={handleProfileEdit}>
                                        프로필 편집
                                    </Button>
                                )}
                            </Grid> */}
                        </Grid>

                        <Box mt={3}>
                            <Typography variant="h6" component="div" mt={6}>
                                개인 정보
                            </Typography>
                            <Typography variant="body1" component="div" mt={1} color="textSecondary">
                                아이디:{' '}
                                {isEditing ? (
                                    <TextField
                                        name="id"
                                        label="ID"
                                        value={editedUser.id || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    user.id
                                )}
                            </Typography>
                            <Typography variant="body1" component="div" mt={1} color="textSecondary">
                                비밀번호:{' '}
                                {isEditing ? (
                                    <TextField
                                        type="password"
                                        name="pw"
                                        label="비밀번호"
                                        value={editedUser.pw || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    ' ********'
                                )}
                            </Typography>
                            <Typography variant="body1" component="div" mt={1} color="textSecondary">
                                이메일: {user.email}
                            </Typography>
                        </Box>
                    </StyledPaper>
                </Box>
            </ThemeProvider>
            <Footer />
        </>
    );
};

export default MyPage;
