import React from 'react';
import styled from 'styled-components';

const ProjectButton = () => {
  return (
    <StyledWrapper>
      <button className="Btn-Container">
        <span className="text">Explore!</span>
        <span className="icon-Container">
          <svg width={16} height={19} viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1.61321" cy="1.61321" r="1.5" fill="currentColor" />
            <circle cx="5.73583" cy="1.61321" r="1.5" fill="currentColor" />
            <circle cx="5.73583" cy="5.5566" r="1.5" fill="currentColor" />
            <circle cx="9.85851" cy="5.5566" r="1.5" fill="currentColor" />
            <circle cx="9.85851" cy="9.5" r="1.5" fill="currentColor" />
            <circle cx="13.9811" cy="9.5" r="1.5" fill="currentColor" />
            <circle cx="5.73583" cy="13.4434" r="1.5" fill="currentColor" />
            <circle cx="9.85851" cy="13.4434" r="1.5" fill="currentColor" />
            <circle cx="1.61321" cy="17.3868" r="1.5" fill="currentColor" />
            <circle cx="5.73583" cy="17.3868" r="1.5" fill="currentColor" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn-Container {
    display: flex;
    width: 170px;
    height: fit-content;
    background-color: #E0F2FE; /* Light blue background */
    border-radius: 40px;
    box-shadow: 0px 5px 10px rgba(204, 226, 255, 0.8); /* Subtle blue shadow */
    justify-content: space-between;
    align-items: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s ease;
  }

  .Btn-Container:hover {
    background-color: #60A5FA; /* Subtle dark blue hover */
  }

  .icon-Container {
    width: 45px;
    height: 45px;
    background-color: #BFDBFE; /* Light blue for icon background */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 3px solid #60A5FA; /* Dark blue border for the icon */
    transition: transform 0.3s ease;
  }

  .text {
    width: calc(170px - 45px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1E3A8A; /* Darker blue text */
    font-size: 1.1em;
    letter-spacing: 1.2px;
  }

  .icon-Container svg {
    transition-duration: 1.5s;
    color: #1E3A8A; /* Dark blue color for the icon circles */
  }

  .Btn-Container:hover .icon-Container svg {
    transition-duration: 1.5s;
    animation: arrow 1s linear infinite;
  }

  @keyframes arrow {
    0% {
      opacity: 0;
      margin-left: 0px;
    }
    100% {
      opacity: 1;
      margin-left: 10px;
    }
  }

  /* Light and Dark Mode Styles */
  @media (prefers-color-scheme: dark) {
    .Btn-Container {
      background-color: #1E3A8A; /* Dark blue background for dark mode */
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5); /* Darker shadow */
    }

    .Btn-Container:hover {
      background-color: #2563EB; /* Lighter blue for hover in dark mode */
    }

    .icon-Container {
      background-color: #60A5FA; /* Lighter blue for the icon */
      border: 3px solid #1E3A8A; /* Dark blue border */
    }

    .text {
      color: white; /* White text in dark mode */
    }

    .icon-Container svg {
      color: white; /* White icon in dark mode */
    }
  }

  /* Responsive Design */
  @media (max-width: 600px) {
    .Btn-Container {
      width: 140px; /* Smaller width for mobile */
      height: auto;
    }

    .text {
      font-size: 0.95em; /* Smaller font size on mobile */
    }
  }

  @media (max-width: 400px) {
    .Btn-Container {
      width: 120px; /* Even smaller on very small screens */
    }

    .text {
      font-size: 0.85em; /* Further reduce font size */
    }
  }
`;

export default ProjectButton;
