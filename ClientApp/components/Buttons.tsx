import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonBlock: any = styled.div`
    overflow: auto;
    padding-bottom: 5px;
    float: right;
    margin-right: 20px;
    margin-bottom: 5px;
`;

const Button: any = styled.input`
    width: 100px;
    height: 40px;
    border: thin solid #dddddf;
    background-color: #fff;
    align-self: center;
    margin-right: 10px;
    float: left
`;

const ButtonList = (props: any) => {

    return (
        <ButtonBlock>
            <Button
                type='button'
                onClick={this.editRecipe}
                value='Save'
                // style={{display: 'none' }}
        />
            <Button
                type='button'
                onClick={this.addRecipe}
                value='Cancel'
                disable={true}
                // style={{display: 'none' }}
            />
            <Button
                type='button'
                onClick={this.addRecipe}
                value='Cancel'
                disable={true}
                style={{display: 'none' }}
            />
        </ButtonBlock>
    );
};

export default ButtonList;
