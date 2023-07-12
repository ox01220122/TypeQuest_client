import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { SERVER } from '../lib/constant';

import axios from 'axios';
import MainHeader from './Header';

function Ask() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [inquiries, setInquiries] = useState([]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {
        // 등록 로직 작성
        const user_id = sessionStorage.getItem('user_data');
        const newInquiry = {
            user_id: user_id,
            title: title,
            content: content,
        };

        axios
            .post(`${SERVER}/ask`, newInquiry)
            .then(() => {
                // 문의 등록 성공 시 새로운 문의를 목록에 추가
                setInquiries([...inquiries, { ...newInquiry, showAdminMessage: false }]);
                window.location.reload();
            })
            .catch((error) => {
                console.error('문의 등록에 실패했습니다:', error);
                // 오류 처리 로직 추가
            });

        setTitle('');
        setContent('');
    };

    const fetchInquiries = () => {
        const user_id = sessionStorage.getItem('user_data');
        axios
            .get(`${SERVER}/ask`, { params: { user_id } })
            .then((result) => {
                console.log(result);
                const inquiriesWithAdminMessageState = result.data.map((inquiry) => ({
                    ...inquiry,
                    showAdminMessage: false,
                }));
                setInquiries(inquiriesWithAdminMessageState);
            })
            .catch((error) => {
                console.error('문의 등록에 실패했습니다:', error);
                // 오류 처리 로직 추가
            });
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`${SERVER}/ask/${id}`)
            .then(() => {
                const updatedInquiries = inquiries.filter((inquiry) => inquiry.ask_id !== id);
                setInquiries(updatedInquiries);
            })
            .catch((error) => {
                console.error('문의 삭제에 실패했습니다:', error);
                // 에러 처리 로직을 추가하세요
            });
    };

    const handleToggleAdminMessage = (ask_id) => {
        const updatedInquiries = inquiries.map((inquiry) => {
            if (inquiry.ask_id === ask_id) {
                return {
                    ...inquiry,
                    showAdminMessage: !inquiry.showAdminMessage,
                };
            }
            return inquiry;
        });
        setInquiries(updatedInquiries);
    };

    return (
        <>
            <MainHeader />
            <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, color: 'white', paddingTop: 5 }}>
                <fieldset style={{ border: '2px solid white' }}>
                    <legend>온라인 문의하기</legend>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            maxWidth: 600,
                            margin: 'auto',
                            color: 'white',
                            fontSize: '1rem',
                            paddingBottom: '2.5rem',
                            paddingTop: '2.5rem',
                        }}
                    >
                        요청사항을 남겨주시면 신속하게 답변 드리겠습니다
                    </Typography>
                    <div>
                        <TextField
                            label="TITLE"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={handleTitleChange}
                            sx={{
                                marginBottom: 2,
                                paddingBottom: '2rem',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#FFFFFF',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#CCCCCC',
                                },
                            }}
                            InputLabelProps={{
                                sx: { color: '#FFFFFF' },
                            }}
                            InputProps={{
                                style: { color: 'white' },
                                autoComplete: 'off',
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Content"
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={4}
                            value={content}
                            onChange={handleContentChange}
                            sx={{
                                marginBottom: 2,
                                color: 'white',
                                paddingBottom: '2rem',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#FFFFFF',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#CCCCCC',
                                },
                            }}
                            InputLabelProps={{
                                sx: { color: '#FFFFFF' },
                            }}
                            InputProps={{
                                style: { color: 'white' },
                                autoComplete: 'off',
                            }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            marginBottom: 2,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            backgroundColor: 'rgba(42, 48, 96, 1)',
                            color: '#FFFFFF',
                            '&:hover': {
                                backgroundColor: 'rgba(22, 28, 76, 1)',
                                fontWeight: 'bold',
                            },
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        문의하기
                    </Button>
                </fieldset>
                <br />
                <br />
                <br />

                <div>
                    <div className="commentContainer">
                        {inquiries.map((inquiry) => (
                            <Box
                                key={inquiry.ask_id}
                                sx={{
                                    background: '#f5f5f5',
                                    padding: 2,
                                    marginBottom: 2,
                                    borderRadius: '4px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                }}
                            >
                                <Typography variant="h6" sx={{ marginBottom: 2, color: 'black' }}>
                                    {inquiry.title}
                                </Typography>
                                <Box sx={{ flexGrow: 1, whiteSpace: 'pre-wrap', color: 'black' }}>
                                    <Typography>{inquiry.content}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleToggleAdminMessage(inquiry.ask_id)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        댓글 확인
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(inquiry.ask_id)}
                                    >
                                        삭제
                                    </Button>
                                </Box>
                                <Box key={inquiry.ask_id}>
                                    {/* 관리자 메시지가 기본으로 표시되는 창 히든되있어야함 */}
                                    {/* 관리자 메시지가 있을 경우에만 메시지 표시 */}
                                    {!inquiry.showAdminMessage && (
                                        <Typography
                                            variant="body2"
                                            sx={{ display: 'none', color: 'gray', marginTop: 1 }}
                                        ></Typography>
                                    )}
                                    {/* 관리자 메시지가 null 일때 show는 되는데 댓글이 없습니다가 표시되게 */}
                                    {inquiry.manager_msg === null && inquiry.showAdminMessage && (
                                        <Typography
                                            variant="body2"
                                            sx={{ display: 'block', color: 'gray', marginTop: 1 }}
                                        >
                                            댓글이 없습니다.
                                        </Typography>
                                    )}
                                    {inquiry.showAdminMessage && (
                                        <Typography
                                            variant="body2"
                                            sx={{ display: 'block', color: 'rgb(30,30,333)', marginTop: 1 }}
                                        >
                                            {inquiry.manager_msg}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </div>
                </div>
            </Box>
        </>
    );
}

export default Ask;
