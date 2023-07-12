import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

import io from 'socket.io-client';
import { SERVER } from '../lib/constant';

const socket = io.connect(`${SERVER}`);

const ChatWindow = styled.div`
    width: 600px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: ${({ isKeyboardOpen }) => (isKeyboardOpen ? 'flex-start' : 'space-between')};
    transition: justify-content 0.3s;
    margin: 15px;

    @media (max-width: 768px) {
        margin: 0px;
        width: 100%;
        height: 92.5vh;
    }
`;

const ChatHeader = styled.div`
    height: 45px;
    background: #04202f;
    position: relative;
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center;
    //왼쪽위 오른쪽위 테두리 둥글게
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    //모바일 사이즈
    @media (max-width: 768px) {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
`;

const ChatHeaderTitle = styled.p`
    display: block;
    padding: 0px;
    margin: 0px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    font-family: 'arial';
`;

const ChatBody = styled.div`
    flex-grow: 1;
    border: 1px solid #263238;
    background: #eee;
    position: relative;
    overflow: hidden;
`;

const MessageContainer = styled(ScrollToBottom)`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        display: none;
    }

    scroll-behavior: smooth;
`;

const Message = styled.div`
    height: auto;
    padding: 10px;
    display: flex;

    &:last-child {
        margin-bottom: 0;
    }

    ${(props) =>
        props.isYou
            ? css`
                  justify-content: flex-end;

                  .message-content {
                      justify-content: flex-end;
                  }

                  .message-meta {
                      justify-content: flex-end;
                      margin-left: 5px;
                  }
              `
            : css`
                  justify-content: flex-start;

                  .message-content {
                      justify-content: flex-start;
                  }

                  .message-meta {
                      justify-content: flex-start;
                      margin-right: 5px;
                  }
              `}
`;

const MessageContent = styled.div`
    width: auto;
    height: auto;
    max-width: 120px;
    background-color: #04202fdc;
    border-radius: 5px;
    color: #eee;
    display: flex;
    overflow-wrap: break-word;
    word-break: break-word;
    padding: 0px 5px;
    margin: 0px 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MessageMeta = styled.div`
    display: flex;
    font-size: 12px;

    #author {
        margin-left: 10px;
        font-weight: bold;
    }
`;

const ChatFooter = styled.div`
    height: 40px;
    border: 1px solid #263238;
    border-top: none;
    display: flex;
    //아래쪽에 테두리 없애기
    border-bottom: none;
    //왼쪽 오른쪽 아래에 테두리 둥글게
`;

const ChatInput = styled.input`
    height: 100%;
    flex: 85%;
    border: 0;
    padding: 0 0.7em;
    font-size: 1em;
    border-right: 1px dotted #607d8b;
    outline: none;
    font-family: 'Open Sans', sans-serif;
    //아랫쪽 테두리 제거
    border-bottom: none;
`;

const SendButton = styled.button`
    border: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex: 15%;
    height: 100%;
    background: transparent;
    outline: none;
    font-size: 15px;
    color: #eee;
    font-weight: bold;
    background-color: #04202f;

    &:hover {
        color: #f0f2f5;
    }
`;
const ChatFooter2 = styled.div`
    height: 20px;
    border-top: none;
`;

function Chat({ username, room }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const messageContainerRef = useRef(null);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    // 각 방에 대한 메시지 리스트를 저장할 객체 생성
    const messageListsByRoom = {};

    // 현재 방에 대한 메시지 리스트를 가져오는 함수
    const getMessageListForRoom = (room) => {
        if (!messageListsByRoom[room]) {
            // 방별 메시지 리스트가 없으면 초기화
            messageListsByRoom[room] = [];
        }
        return messageListsByRoom[room];
    };

    useEffect(() => {
        socket.emit('join_room', room);

        return () => {
            socket.emit('leave_room', room);
        };
    }, [room]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            if (data.room === room) {
                setMessageList((prevMessages) => [...prevMessages, data]); // 이전의 메시지 리스트에 새로운 메시지 추가
            }
        });

        return () => {
            socket.off('receive_message');
        };
    }, [room]);

    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date().toLocaleTimeString(),
            };

            socket.emit('send_message', messageData);
            setMessageList((prevMessages) => [...prevMessages, messageData]);
            setCurrentMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === 'Done') {
            sendMessage();
            event.preventDefault();
        }
    };

    useEffect(() => {
        const adjustChatWindowHeight = () => {
            if (messageContainerRef.current) {
                const windowHeight = window.innerHeight;
                const messageContainerHeight = messageContainerRef.current.clientHeight;
                const chatHeaderHeight = 45;
                const chatFooterHeight = 0;
                const newChatWindowHeight = windowHeight - chatHeaderHeight - chatFooterHeight;
                const newChatBodyHeight = newChatWindowHeight - messageContainerHeight;

                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
                messageContainerRef.current.style.height = `${newChatBodyHeight}px`;
                document.documentElement.style.setProperty('--chat-window-height', `${newChatWindowHeight}px`);
            }
        };

        adjustChatWindowHeight();

        window.addEventListener('resize', adjustChatWindowHeight);

        // 키보드 이벤트 리스너 추가
        window.addEventListener('resize', handleKeyboardEvent);
        window.addEventListener('orientationchange', handleKeyboardEvent);
        document.addEventListener('focusin', handleKeyboardEvent);
        document.addEventListener('focusout', handleKeyboardEvent);

        return () => {
            window.removeEventListener('resize', adjustChatWindowHeight);

            // 키보드 이벤트 리스너 제거
            window.removeEventListener('resize', handleKeyboardEvent);
            window.removeEventListener('orientationchange', handleKeyboardEvent);
            document.removeEventListener('focusin', handleKeyboardEvent);
            document.removeEventListener('focusout', handleKeyboardEvent);
        };
    }, []);

    const handleKeyboardEvent = () => {
        const { innerHeight } = window;
        const footerElement = document.querySelector('.chat-footer');

        if (footerElement) {
            const footerRect = footerElement.getBoundingClientRect();
            const isKeyboardOpen = innerHeight > footerRect.bottom;
            setIsKeyboardOpen(isKeyboardOpen);
        }
    };

    return (
        <ChatWindow isKeyboardOpen={isKeyboardOpen}>
            <ChatHeader>
                <ChatHeaderTitle>MBTI 채팅방</ChatHeaderTitle>
            </ChatHeader>
            <ChatBody>
                <MessageContainer ref={messageContainerRef}>
                    {messageList.map((messageContent, index) => (
                        <Message key={index} isYou={username === messageContent.author}>
                            <MessageContent>
                                <div>{messageContent.message}</div>
                            </MessageContent>
                            <MessageMeta>
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </MessageMeta>
                        </Message>
                    ))}
                </MessageContainer>
            </ChatBody>
            <ChatFooter className="chat-footer">
                <ChatInput
                    type="text"
                    value={currentMessage}
                    placeholder="채팅창에 입력하세요"
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <SendButton onClick={sendMessage}>전송</SendButton>
            </ChatFooter>
            <ChatFooter2></ChatFooter2>
        </ChatWindow>
    );
}

export default Chat;
