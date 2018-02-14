import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Card = styled.div`
    min-width: 350px;
    height: 250px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    flex-wrap: wrap;
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
    console.log('recipe card props');
    console.log(props);

    //let title = props.title;
    //const { children } = this.props; ask brad why this is not working

    return(
    <Card>
        <Title>
            <Link to={`/recipedetails/${props.recipeId}`}>{props.title}</Link>
        </Title>
        <Image>
            <img 
            src={props.image}
            height= {200}
            width = {350}
            />
        </Image>
    </Card>
    )
  }

  export default RecipeCard;

