import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import autobind from 'react-autobind';
import Fontawesome from 'react-fontawesome';
import ApiService from '../services/apiService';
import uuid from 'uuid/v4';
import { IRecipe } from '../interfaces/IRecipe';
import { IIngredient } from 'ClientApp/interfaces/IIngredient';

interface ILocalState {
    title: string;
    imageBase64String: string;
    ingredients: IIngredient[];
    instructions: string;
    error: string;
}

const Outer: any = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding-top: 20px;
    height: 660px;
    width: 900px;
    margin: auto;
    color: #808080;
`;

const Image: any = styled.div`
    height: 600px;
    width: 800px;
    margin: auto;
    border: 1px solid black;
    background-size: cover;
`;

const Form: any = styled.form`
    margin-top: -20px;
    height: 598px;
    width: 400px;
    justify-content: center;
    background-color: #fff;
    opacity: 0.9;
    float: right;
`;

const FormHeader: any = styled.h2`
    font-weight: 900;
    height: 50px;
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 80%;
`;

const FormField: any = styled.div`
    width: 100%;
    padding: 5px 10px;
`;

const InstructionFormField: any = styled.div`
    margin-top: 10px;
    width: 100%;
    padding: 5px 10px;
`;

const Input: any = styled.input`
    height: 35px;
    width: 100%;
    text-align: left;
    line-height : 42px;
    margin: 5px 0px;
    display: block;
`;

const IngredientsInput: any = styled.input`
    height: 35px;
    width: 95%;
    text-align: left;
    line-height : 42px;
    margin: 5px 0px;
    margin-right: 5px;
`;

const IngredientsList: any = styled.div`
    height: 80px;
    margin: 0 15px;
    font-size: 14px;
    font-style: italic;
    overflow: scroll;
    padding: 5px;
`;

const TextareaInput: any = styled.textarea`
    width: 95%;
    text-align: left;
    display: block;
    resize: none;
    margin: auto;
`;

const Label: any = styled.label`
    text-align: left;
    font-family: 'Roboto',sans-serif;
`;

const Button: any = styled.input`
    width: 20px;
    height: 50px;
    border: thin solid #fff;
    background-color: #224377;
    align-self: center;
    margin-top: 20px;
`;

const RecipeButton: any = styled.input`
    width: 200px;
    height: 50px;
    border: thin solid #dddddf;
    background-color: #fff;
    align-self: center;
    float:right;
    margin-right: 10px;
    margin-top: 10px;
`;

const Error: any = styled.label`
    color: red;
    margin-left: 10px;
`;

const defaultImage = 'default-image.jpg';

export class AddRecipe extends React.Component<RouteComponentProps<{}>, ILocalState> {
    constructor() {
        super();

        this.state = {
            title: '',
            ingredients: [],
            instructions: '',
            error: '',
            imageBase64String: defaultImage
        };

        autobind(this);
    }

    private handleImageChange(event: any): void {
        const file: any = event.target.files[0];
        if (file && file.type.match('image.*')) {
            this.setState((prevState) => ({ ...prevState, imageBlob: file }));

            const fileReader: FileReader = new FileReader();
            fileReader.onload = this.onImageLoad;
            fileReader.readAsDataURL(file);
        }
    }

    private onImageLoad(event: any) {
        const base64 = event.target.result;
        this.setState((prevState) => ({ ...prevState, imageBase64String: base64 }));
    }

    private handleTitleChange(event: any): void {
        this.setState({ title: event.target.value });
    }

    private handleInstructionsChange(event: any): void {
        this.setState({ instructions: event.target.value });
    }

    private handleKeyPress(event: any): void {
        if (event.key === 'Enter') {
            console.log('dd');
            this.addIngredient(event);
        }
    }

    private handleSubmit(event: any): void {
        alert('A name was submitted: ' + this.state.title);
        event.preventDefault();
    }

    private ingredientList: any = [];
    private addIngredient(event: any): void {
        this.ingredientList.push({ Name: event.target.value });
        this.setState({ ingredients: this.ingredientList });
        event.target.value = '';
    }

    private addRecipe(): void {

        let recipe: IRecipe = {
            id: uuid(),
            instructions: this.state.instructions,
            title: this.state.title,
            image: this.state.imageBase64String,
            ingredients: this.state.ingredients
        };

        ApiService.addRecipe(recipe).then((data) => {
            if (data) {
                console.log(data);
                this.props.history.push(`/recipedetails/${data.id}`);
            } else {
                console.log('something is wrong');
            }
        });
    }

    private uploadNewImage() {
        const form = new FormData();
        form.append('file', this.state.imageBase64String);

        fetch('/api/Recipe/UploadImage', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
            },
            body: form
        });
    }

    public render() {
        let formatedIngredientsList: any = [];
        if (this.ingredientList) {
            this.ingredientList.forEach((item: any) => {
                formatedIngredientsList.push(<span>
                    {item.Name + ', '}
                </span>);
            });
        }

        return (
            <Outer>
                <Image style={{ backgroundImage: "url(" + this.state.imageBase64String + ")", width: 800, height: 600 }}>
                    <input type='file' name='Select Image File' onChange={this.handleImageChange} accept=".png,.jpeg,.jpg,.gif" />
                    <Form>
                        <FormHeader>
                            Recipe Card
                        </FormHeader>
                        <FormField>
                            <Label>Recipe Name:</Label>
                            <Error>{this.state.error}</Error>
                            <Input
                                id="recipe_name"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </FormField>
                        <FormField>
                            <Label>Recipe Ingredients:</Label>
                            <IngredientsInput
                                onKeyPress={this.handleKeyPress}
                            />
                            <Fontawesome
                                name="plus"
                                onClick={this.addIngredient}
                            />
                        </FormField>
                        <IngredientsList>
                            {formatedIngredientsList}
                        </IngredientsList>
                        <InstructionFormField>
                            <Label>Recipe Instruction:</Label>
                            <TextareaInput
                                id="recipe_instructions"
                                value={this.state.instructions}
                                onChange={this.handleInstructionsChange}
                                rows={7}
                            />
                        </InstructionFormField>
                        <RecipeButton type='button' onClick={this.addRecipe} value='Add Recipe' />
                    </Form>
                </Image>
            </Outer>
        );
    }
}
