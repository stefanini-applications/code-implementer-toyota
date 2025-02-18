import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  /* ::-webkit-scrollbar {
    width: 8px;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_TWO};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border: 2px solid  ${props =>
      props.theme.palette.GREYSCALE.TRANSLUCENT_TWO} !important;
    -webkit-box-shadow: inset 0 0 4px
      ${props => props.theme.palette.BACKGROUND.CONTRAST_TWO};
    box-shadow: inset 0 0 4px
      ${props => props.theme.palette.GREYSCALE.DARK_FOUR};
      border-radius: 8px;
  } */
}

*:focus{
    outline: 0;
}

body {
  box-sizing: border-box;
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  /* max-width: 1240px;
  min-width: 1024px;
  margin: auto; */
}

textarea{
  font-family: 'Roboto', sans-serif;
}

a {
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 14px;
  &:hover{
    text-decoration: underline;
    color: #69b1ff;

    > p, > span {
      text-decoration: underline;
    }
  }
}

/* ul{
    list-style: none;
    display: inline-block;
    padding: 0;
} */

/* li{
    display: inline-block;
} */

.a-default{
    color: #074EE8;
}

.p-title-page{
    font-size: 18px;
    margin-bottom: -5px;
}

.hr-title-page{
    height: 2px;
    border: none;
    background-color: black;
}

.div-title-page{
    margin-top: 100px;
    padding-left: 20px;
}

.hide-item{
    display: none !important;
}

.show-item{
    display: inherit !important;
}

.p-title-page{
    margin-bottom: 10px;
}

.loading-indicator:before {
    content: '';
    background: #000000cc;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
}

.loading-indicator:after {
    content: 'Loading';
    position: fixed;
    width: 100%;
    top: 50%;
    left: 0;
    z-index: 1001;
    color:white;
    text-align:center;
    font-weight:bold;
    font-size:1.5rem;
}

.rs-picker-select-menu{
  z-index: 110; 
}

.rs-table-scrollbar-handle{
  border-radius: 0px;
  background-color: #C1C1C1;
}

.rs-table-scrollbar-vertical .rs-table-scrollbar-handle {
  width: 11px !important;
  left: 2px !important;
}

.rs-table-scrollbar-handler:hover{
  background-color: #a8a8a8;
}
.rs-table-scrollbar-vertical {
  width: 14px;
}
.rs-table-scrollbar-horizontal{
  height: 14px;
}
.rs-table-scrollbar-horizontal .rs-table-scrollbar-handle{
  height: 11px !important;
  top: 2px;
}

.ant-tree-list-scrollbar-thumb{
  border-radius: 0px !important;
  background-color: #C1C1C1 !important;
  height: 40px !important;
}

.ant-tree-list-scrollbar-thumb:hover{
  background-color: #a8a8a8 !important;

}

.ant-tree-list-scrollbar{
  width: 12px !important;
}

.modal-open {
  height: 100vh;
  overflow-y: hidden;
}

.hide-overflow {
  overflow: hidden;
}
.disable{
background-color: #f0f0f0;
}
.disableText{
color: #7A7A7A;
}

.rotateicon{
  animation: loading 1.5s infinite ease;
 @keyframes loading {
        0% {
        transform: rotate(0deg);
        }
        100% {
        transform: rotate(359deg);
        }
    }
}

.ant-table-tbody > tr:hover > td {
  background-color: transparent !important;
}
`;

