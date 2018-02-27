import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
    width: 300px;
    height: 300px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    flex-wrap: wrap;
    margin: 10px;
    float: left;
    &:hover {
        box-shadow: 0 10px 18px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
    }
`;

const Image = styled.div`
`;

const Title = styled.div`
    color: #606060;
    font-size: 24px;
    font-family: 'Signika', sans-serif;
    padding-bottom: 5px;
    margin-top: 15px;
`;

const RecipeCard = (props: any) => {
    console.log('recipe card props');
    console.log(props);

    return (
        <div>
            <Link to={`/recipedetails/${props.recipeId}`} >
                <Card>
                    <Image>
                        <img
                            src={props.image}
                            height={225}
                            width={300}
                        />
                    </Image>
                    <Title>
                        {props.title}
                    </Title>
                </Card>
            </Link>

        </div>
    );
};

export default RecipeCard;
