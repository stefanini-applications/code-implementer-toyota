import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    z-index: 400;
    background: rgba(67, 72, 76, 0.37);
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
    visibility: hidden;
    opacity: 0;
    svg {
        animation: loading 1.5s infinite ease;
        font-size: 40px;
    }

    @keyframes loading {
        0% {
        transform: rotate(0deg);
        }
        100% {
        transform: rotate(359deg);
        }
    }

    z-index: 99999;
`;

export const LoadingText = styled.p`
    font-size: 20px;
`;
