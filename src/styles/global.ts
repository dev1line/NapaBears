import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      -ms-overflow-style: scrollbar;
    scroll-behavior: smooth;
  }
  body {
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #064056;
      color: #ffffff;
  }
  *,
  *::before,
  *::after {
    -webkit-box-sizing: inherit;
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Roboto', sans-serif;
  }

  .relative {
    position: relative;
  }

  .flex {
    display: flex;
  }

  #loading {
  bottom: 15%;
  position: relative;
  font-size:40px;
  -webkit-animation: linear infinite;
  -webkit-animation-name: run;
  -webkit-animation-duration: 2s;
}

.sans {
  font-family: 'DM Sans', sans-serif;
}

@-webkit-keyframes run {
  0% {
    left: 0;
  }
  50% {
    left: 5px;
  }
  100% {
    left: 0;    
  }
}

  
.checkbox {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  gap: 10px;  
  font-size: 24px;
  color :white;
  &:hover {
    .checkbox-checkmark {
      border: 2px solid #e31d78;
    }
  }
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:focus ~ .checkbox-checkmark-box {
    border-color: #098d60;
  }

  &:checked ~ .checkbox-checkmark-box {
    .checkbox-checkmark {
      &:after {
        display: block;
      }
    }
  }

  &:checked ~ .checkbox-checkmark-box {
    .checkbox-checkmark {
      background-color: #098d60;
      border: 2px solid #e31d78;
    }
  }

  &:disabled ~ .checkbox-checkmark-box {
    .checkbox-checkmark {
      border: 2px solid #ff9e00;
      cursor: not-allowed;
    }
  }

  &:disabled {
    &:checked ~ .checkbox-checkmark-box {
      .checkbox-checkmark {
        background-color: #ff9e00;
        &:after {
          background: url("data:image/svg+xml,%3Csvg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.8866 9.91722L0.0873348 5.36761C0.0596566 5.34137 0.037692 5.31018 0.0227039 5.27582C0.00771585 5.24146 0 5.20461 0 5.1674C0 5.13019 0.00771585 5.09335 0.0227039 5.05899C0.037692 5.02463 0.0596566 4.99343 0.0873348 4.96719L1.29893 3.81086C1.41471 3.70049 1.60183 3.70049 1.71761 3.81086L4.87718 6.80501C4.99296 6.91538 5.18143 6.91409 5.2972 6.80372L12.2787 0.0839022C12.3945 -0.0277526 12.5829 -0.0277526 12.7001 0.0826188L13.913 1.23895C14.0288 1.34932 14.0288 1.52771 13.9143 1.63809L6.30821 8.95468L6.30956 8.95597L5.30662 9.91722C5.19085 10.0276 5.00238 10.0276 4.8866 9.91722Z' fill='%2374767B'/%3E%3C/svg%3E%0A") no-repeat center;
    background-size: contain;
        }
      }
    }
  }
}

.checkbox-checkmark-box {
  min-width: 38px;
  max-width: 38px;
  min-height: 38px;
  max-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 4px;
}

.checkbox-checkmark {
  min-width: 32px;
  max-width: 32px;
  min-height: 32px;
  max-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #e31d78;
  border-radius: 4px;
  cursor: pointer;

  &:after {
    content: "";
    display: none;
    background: url("data:image/svg+xml,%3Csvg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.8866 9.91722L0.0873348 5.36761C0.0596566 5.34137 0.037692 5.31018 0.0227039 5.27582C0.00771585 5.24146 0 5.20461 0 5.1674C0 5.13019 0.00771585 5.09335 0.0227039 5.05899C0.037692 5.02463 0.0596566 4.99343 0.0873348 4.96719L1.29893 3.81086C1.41471 3.70049 1.60183 3.70049 1.71761 3.81086L4.87718 6.80501C4.99296 6.91538 5.18143 6.91409 5.2972 6.80372L12.2787 0.0839022C12.3945 -0.0277526 12.5829 -0.0277526 12.7001 0.0826188L13.913 1.23895C14.0288 1.34932 14.0288 1.52771 13.9143 1.63809L6.30821 8.95468L6.30956 8.95597L5.30662 9.91722C5.19085 10.0276 5.00238 10.0276 4.8866 9.91722Z' fill='white'/%3E%3C/svg%3E%0A") no-repeat center;
    width: 18px;
    height: 20px;
    background-size: contain;
  }
}

`;
