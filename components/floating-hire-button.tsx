'use client';

// import { Link } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const FloatingHireMe = () => {
  return (
    <StyledWrapper>
      <div className="">
      <NextLink href="#contact">
      <button className="button">
        <p className="button__text">
          <span style={{ '--index': 0 } as React.CSSProperties}>H</span>
          <span style={{ '--index': 1 } as React.CSSProperties}>I</span>
          <span style={{ '--index': 2 } as React.CSSProperties}>R</span>
          <span style={{ '--index': 3 } as React.CSSProperties}>E</span>
          <span style={{ '--index': 4 } as React.CSSProperties}></span>
          <span style={{ '--index': 5 } as React.CSSProperties}>M</span>
          <span style={{ '--index': 6 } as React.CSSProperties}>E</span>
        </p>
        <div className="button__circle ">
          <svg
            width={14}
            className="button__icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path
              fill="currentColor"
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            />
          </svg>
          <svg
            className="button__icon button__icon--copy"
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            fill="none"
            viewBox="0 0 14 15"
          >
            <path
              fill="currentColor"
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            />
          </svg>
        </div>
      </button>
      </NextLink>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 20px; /* Position from bottom */
  right: 20px; /* Position from right */
  z-index: 1000; /* Ensures it stays above other content */

  /* Responsive for smaller screens */
  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;

    .button {
      width: 70px; /* Smaller button for mobile */
      height: 70px;
      font-size: 12px;
    }

    .button__circle {
      width: 30px;
      height: 30px;
    }
  }

  .button {
    cursor: pointer;
    border: none;
    background: #80b3ff;
    color: #0056b3;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    display: grid;
    place-content: center;
    transition:
      background 300ms,
      transform 200ms;
    font-weight: 600;
  }

  .button__text {
    position: absolute;
    inset: 0;
    animation: text-rotation 8s linear infinite;

    > span {
      position: absolute;
      transform: rotate(calc(19deg * var(--index)));
      inset: 7px;
    }
  }

  .button__circle {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: #fff;
    color: #0056b3;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button__icon--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover {
    background: #0056b3;
    color: #fff;
    transform: scale(1.05);
  }

  .button:hover .button__icon {
    color: #0056b3;
  }

  .button:hover .button__icon:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }

  @keyframes text-rotation {
    to {
      rotate: 360deg;
    }
  }
`;

export default FloatingHireMe;
