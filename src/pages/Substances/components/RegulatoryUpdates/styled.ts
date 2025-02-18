import { FaImage, FaSearch, FaPlus, FaChevronDown } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';

import styled from 'styled-components';

export const Container = styled.div`
  .update-open {
    max-height: inherit;
  }

  [data-title]:hover:after {
    opacity: 1;
    transition: all 0.1s ease 0.5s;
    visibility: visible;
  }
  [data-title]:after {
    content: attr(data-title);
    position: absolute;
    left: 0;
    padding: 4px 4px 4px 8px;
    color: ${props => props.theme.palette.GREYSCALE.DARK_FOUR};
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-box-shadow: 0px 0px 4px
      ${props => props.theme.palette.GREYSCALE.DARK_FOUR};
    -webkit-box-shadow: 0px 0px 4px
      ${props => props.theme.palette.GREYSCALE.DARK_FOUR};
    box-shadow: 0px 0px 4px ${props => props.theme.palette.GREYSCALE.DARK_FOUR};
    background-image: -moz-linear-gradient(
      top,
      ${props => props.theme.palette.GREYSCALE.CLEAR_THREE},
      ${props => props.theme.palette.GREYSCALE.GREY_SIX}
    );
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, ${props => props.theme.palette.GREYSCALE.CLEAR_THREE}),
      color-stop(1, ${props => props.theme.palette.GREYSCALE.GREY_SIX})
    );
    background-image: -webkit-linear-gradient(
      top,
      ${props => props.theme.palette.GREYSCALE.CLEAR_THREE},
      ${props => props.theme.palette.GREYSCALE.GREY_SIX}
    );
    background-image: -moz-linear-gradient(
      top,
      ${props => props.theme.palette.GREYSCALE.CLEAR_THREE},
      ${props => props.theme.palette.GREYSCALE.GREY_SIX}
    );
    background-image: -ms-linear-gradient(
      top,
      ${props => props.theme.palette.GREYSCALE.CLEAR_THREE},
      ${props => props.theme.palette.GREYSCALE.GREY_SIX}
    );
    background-image: -o-linear-gradient(
      top,
      ${props => props.theme.palette.GREYSCALE.CLEAR_THREE},
      ${props => props.theme.palette.GREYSCALE.GREY_SIX}
    );
    opacity: 0;
    z-index: 99999;
    visibility: hidden;
  }
  [data-title] {
    position: relative;
  }
`;

export const ContainerPagination = styled.div`
  display: flex;
  width:  100%;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const PageSubtitle = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 0;
  padding: 0;
  font-size: 18px;
  font-weight: bold;
button {
  }
`;

export const ArrowDown = styled(FaChevronDown)`
  position: absolute;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  right: 30px;
  top: 15px;
  font-size: 14px;
  cursor: pointer;
`;

export const IconImage = styled(FaImage)`
  font-size: 17px;
`;

export const IconPlus = styled(FaPlus)`
  font-size: 10px;
  color: ${props => props.theme.palette.PRIMARY.WHITE} !important;
  margin-right: 6px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  width: 324px;
  input {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 13,
  color: props.theme.palette.GREYSCALE.GREY_THREE
}))``;

export const Update = styled.div`
  border: 1px solid black;
  padding: 2px;
  margin-top: 15px;
  overflow: hidden;
  position: relative;
  padding: 10px 30px;
`;

export const ContainerLoadingSearch = styled.div`
  display: none;
  align-items: center;
  justify-content: center;

  svg {
    animation: loading 1.5s infinite ease;
    font-size: 14px;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

export const TitleUpdateContainer = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  padding-top: 5px;
  gap: 40px;
  align-items: center;
`;

export const EditUpdateButton = styled.div`
  display: flex;
  opacity: 0;
  pointer-events: none;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  font-size: 16px;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`;

export const DescriptionTextOpen = styled.p`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_SIX};

  padding: 10px;
`;

export const DescriptionText = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
`;

export const DateUpdate = styled.p`
  font-size: 16px;
  font-style: italic;
  display: inline-block;
`;

export const PencilIcon = styled(RiPencilFill)`
  font-size: 15px;
`;

export const ContainerItemsUpdate = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const TitleUpdate = styled.p`
  margin-top: 0px;
`;

export const TitleItem = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const AttachmentsContainer = styled.div`
  max-height: 230px;
  overflow-y: scroll;
  padding-right: 5px;
  padding-left: 5px;
`;

export const RelatedSubstances = styled.div`
  padding-right: 5px;
  padding-left: 5px;
`;

export const DescriptionContainer = styled.div`
  padding-right: 5px;
  padding-left: 5px;
`;

export const TextDescription = styled.div`
  height: auto;
  max-height: 220px;
  overflow-y: scroll;
  padding: 10px 5px;
  border: 1px solid gray;
`;

export const EditUpdateContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-width: 165px;
  text-align: center;
  margin-top: 37px;
`;

export const UlRelatedSubstances = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const LiRelatedSubstances = styled.li`
  display: inline-block;
  text-decoration: underline;
  margin-top: 10px;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  cursor: pointer;
`;

export const FileAttached = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
  min-width: 500px;
`;

export const Attachment = styled.div`
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  padding: 10px 0px;
`;

export const Filename = styled.a`
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  text-decoration: underline;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const Attachments = styled.div`
  flex: 1;
`;

export const TitlePage = styled.div`
  display: flex;
  gap: 40px;
  font-weight: bold;
  margin-top: 100px;
  margin-bottom: 30px;
  padding-bottom: 60px;
  font-size: 28px;
  border-bottom: 2px solid ${props => props.theme.palette.GREYSCALE.DARK_TWO};
`;

export const FileDescription = styled.div`
  border: 2px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 5px;
  padding: 8px 10px;
  margin-left: -25px;
`;

export const UpdateContentContainer = styled.div``;

export const FakeElement = styled.div`
  width: 20px;
`;

export const Bold = styled.span`
  font-weight: bold;
`;
