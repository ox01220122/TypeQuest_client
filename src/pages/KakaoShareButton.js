import React, { useEffect } from 'react';

const KakaoShareButton = () => {
    useEffect(() => {
        window.Kakao.Share.createDefaultButton({
            container: '#kakaotalk-sharing-btn',
            objectType: 'feed',
            content: {
                title: 'TypeQuest',
                description: '#MBTI #Travel #YouTube #Occupation #Choice Disorder',
                imageUrl: 'https://daeyo.s3.ap-northeast-2.amazonaws.com/mainImg.png',
                link: {
                    mobileWebUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                    webUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                },
            },
            social: {
                likeCount: 286,
                commentCount: 45,
                sharedCount: 845,
            },
            buttons: [
                {
                    title: 'View on the web',
                    link: {
                        mobileWebUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                        webUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                    },
                },
                {
                    title: 'View as App',
                    link: {
                        mobileWebUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                        webUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                    },
                },
            ],
        });
    }, []);

    return (
        <a id="kakaotalk-sharing-btn" href="https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app/">
            <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                alt="KakaoTalk share send button"
            />
        </a>
    );
};

export default KakaoShareButton;
