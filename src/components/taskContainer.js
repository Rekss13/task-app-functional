import styled from "styled-components";

export const Container = styled.div`
    border: 1px solid ${props => (props.isDragging ? 'lightblue' : 'lightgrey')};
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (
        props.isDragDisabled
            ? 'lightgrey'
            : props.isDragging ? 'lightblue' : 'white'
    )};

    display: flex;
`;