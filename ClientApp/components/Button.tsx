import * as React from 'react';
import styled from 'styled-components';

const CustomButton: any = styled.input`
    width: 150px;
    height: 50px;
    border: thin solid #fff;
    background-color: #fcad26;
    align-self: center;
    float:right;
    margin-right: 10px;
    margin-top: 10px;
    color: #fff;
    font-weight: 700;
    &:hover:enabled {
        background-color: #fcad26;
        color: #fff;
        border: thick solid #f29e0d;
    }
    &:disabled{
        opacity: 0.8;
        cursor: not-allowed;
    }
`;

const Button = (props: any) => {
    return (
        <CustomButton
            type={props.type}
            onClick={props.onClick}
            value={props.value}
            disabled={props.disabled}
        />
    );
};

export default Button;
