import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Fontawesome from 'react-fontawesome';
import { Base64 } from 'js-base64';

import uuid from 'uuid/v4';

const img = 'recipe.jpg';

  

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

const ImageButton: any = styled.input`
    width: 200px;
    height: 50px;
    border: thin solid #dddddf;
    background-color: #fff;
    align-self: center;
    margin-left: 10px;
    margin-top: 20px;
`;

const Error: any = styled.label`
    color: red;
    margin-left: 10px;
`;


interface ILocalProps {
    //
}

export class AddRecipe extends React.Component<RouteComponentProps<{}>, { title: string, imageBase64String: any, ingredients: any, instructions: string, error: string }> {
    constructor() {
        super();

        this.state = { title: '', ingredients: [], instructions: '', error: '', imageBase64String: img};

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        //this.updateImage = this.updateImage.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
    }

    handleImageChange(event: any): void {
        const file: any = event.target.files[0];
        if (file && file.type.match('image.*')) {
            this.setState((prevState) => ({...prevState, imageBlob: file}));

            const fileReader: FileReader = new FileReader();
            fileReader.onload = this.onImageLoad;
            fileReader.readAsDataURL(file);
        }

    }

    private onImageLoad(event: any) {
        const base64 = event.target.result;
        this.setState((prevState) => ({ ...prevState, imageBase64String: base64 }));
    }

    handleTitleChange(event: any): void {
        this.setState({ title: event.target.value });
    }

    handleInstructionsChange(event: any): void {
        this.setState({ instructions: event.target.value });
    }

    handleKeyPress(event: any): void {
        if(event.key === 'Enter'){
            console.log('dd');
            this.addIngredient(event);
          }
    }

    handleSubmit(event: any): void {
        alert('A name was submitted: ' + this.state.title);
        event.preventDefault();
    }

    ingredientList: any = [];
    private addIngredient(event: any): void {
        //alert(`added ${this.state.ingredients}`);
        this.ingredientList.push({Name: event.target.value});
        this.setState({ ingredients: this.ingredientList });
        event.target.value = '';
    }

    private addRecipe(): void {
        let data: any = {
            createDateTime: new Date(),
            Instructions: this.state.instructions,
            Title: this.state.title,
            Image: this.state.imageBase64String
        };
        if(data.Title == '')
        {
            this.setState({error: 'title cannot be empty'});
            return;
        }
        fetch('/api/Recipe/AddRecipe', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(res => {
            if (res.status === 200) {
            } else {
                res.text().then((t) => this.setState({ error: t }));
            }
        });

    }

    private uploadNewImage() {
        const form = new FormData();
        form.append('file', this.state.imageBase64String);

        fetch('/api/Recipe/UploadImage',{
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
                    {item.Name + ' <p style="color:red;">X</p>, '}
                </span>);
            })
        }

        return (
            <Outer>
                <Image style={{backgroundImage: "url(" + this.state.imageBase64String + ")" , width:800 , height:600 }}>
                    <input type='file' name='Select Image File' onChange={this.handleImageChange} accept=".png,.jpeg,.jpg,.gif"/>
                    {/* <div style={{ backgroundImage: `url(${img})`, width:200 , height:500 }}/> */}
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
                                //value={this.state.ingredients}
                                //onChange={this.handleIngredientChange}
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
