import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Card = styled.div`
    width: 350px;
    height: 250px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    margin: 10px;
    float: left;
`;

const Image = styled.div`
    padding: 10px;
`;

const Title = styled.div`
    color: #ff4411; 
    font-size: 24px; 
    font-family: 'Signika', sans-serif; 
    padding-bottom: 5px;  
`;

const RecipeCard = (props: any) => {

    //let title = props.title;
    //const { children } = this.props; ask brad why this is not working

    return(
    <Card>
        <Image>
        </Image>
        <Title>
            <Link to={`/recipedetails/${props.key}`}>{props.title}</Link>
        </Title>
    </Card>
    )
  }

  export default RecipeCard;

