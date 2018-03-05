import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import autobind from 'react-autobind';
import Fontawesome from 'react-fontawesome';
import ApiService from '../services/apiService';
import ButtonList from '../components/Buttons';
import { ToastContainer, toast } from 'react-toastify';
import uuid from 'uuid/v4';
import { IRecipe } from '../interfaces/IRecipe';
import { IIngredient } from 'ClientApp/interfaces/IIngredient';
import Button from '../components/Button';

interface ILocalState {
    recipe: IRecipe;
    isEditing: boolean;
}

const Outer: any = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding-top: 20px;
    height: 660px;
    width: 900px;
    margin: auto;
    color: #808080;
    clear: both;
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

const Error: any = styled.label`
    color: red;
    margin-left: 10px;
`;

const defaultImage = 'default-image.jpg';

export class AddRecipe extends React.Component<RouteComponentProps<{}>, ILocalState> {
    constructor() {
        super();

        this.state = {
            recipe: {
                id: '',
                title: '',
                instructions: '',
                imageBase64String: '',
                ingredients: []
            },
            isEditing: false
        };

        autobind(this);
    }

    public componentWillMount() {
        if (this.props.match.params && this.props.match.params['id']) {
            let id = this.props.match.params['id'];
            ApiService.getRecipeById(id).then((data) => {
                this.setState({ isEditing: true });
                this.setState({
                    recipe: {
                        ...this.state.recipe,
                        imageBase64String: data.imageBase64String,
                        title: data.title,
                        instructions: data.instructions,
                        ingredients: data.ingredients, //This typo has to be corrected eventually
                        id: data.id
                    }
                });
            });
        } else {
            this.setState({
                recipe: {
                    ...this.state.recipe,
                    imageBase64String: defaultImage
                }

            });
        }

    }

    public cancelChanges() {
        //
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
        this.setState({
            recipe: {
                ...this.state.recipe,
                imageBase64String: base64
            }
        });
    }

    private handleTitleChange(event: any): void {
        this.setState({
            recipe: {
                ...this.state.recipe,
                title: event.target.value
            },
            isEditing: true
        });
    }

    private handleInstructionsChange(event: any): void {
        this.setState({
            recipe: {
                ...this.state.recipe,
                instructions: event.target.value
            }
        });
    }

    private handleKeyPress(event: any): void {
        if (event.key === 'Enter') {
            this.addIngredient(event);
        }
    }

    private handleSubmit(event: any): void {
        alert('A name was submitted: ' + this.state.recipe.title);
        event.preventDefault();
    }

    private ingredientList: any = [];
    private addIngredient(event: any): void {
        this.ingredientList.push({ Name: event.target.value });
        this.setState({
            recipe: {
                ...this.state.recipe,
                ingredients: this.ingredientList
            }
        });
        event.target.value = '';
    }

    private addRecipe(): void {

        let recipe: IRecipe = {
            id: uuid(),
            instructions: this.state.recipe.instructions,
            title: this.state.recipe.title,
            imageBase64String: this.state.recipe.imageBase64String,
            ingredients: this.state.recipe.ingredients //correct this typo
        };
        //let isEditingVariable: this.state.recipe.isEditing;

        ApiService.addRecipe(recipe).then((data) => {
            if (data) {
                console.log(data);
                //TODO
                toast.success("Recipe was successfully added");
                this.setState({
                    recipe: {
                        ...this.state.recipe
                    }

                });
                this.props.history.push(`/addrecipe/${data.id}`);
            } else {
                console.log('something is wrong');
            }
        });
    }

    private uploadNewImage() {
        const form = new FormData();
        form.append('file', this.state.recipe.imageBase64String);

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

        const isEnabled: boolean = (this.state.recipe.title) && (this.state.isEditing) ? true : false;
        if (this.ingredientList) {
            this.ingredientList.forEach((item: any) => {
                formatedIngredientsList.push(<span>
                    {item.Name + ', '}
                </span>);
            });
        }

        return (
            <div>
                <ToastContainer autoClose={5000} />
                <Outer>
                    <Image style={{ backgroundImage: "url(" + this.state.recipe.imageBase64String + ")", width: 800, height: 600 }}>
                        <input type='file' name='Select Image File' onChange={this.handleImageChange} accept=".png,.jpeg,.jpg,.gif" />
                        <Form>
                            <FormHeader>
                                {this.state.recipe.title}
                            </FormHeader>
                            <FormField>
                                <Label>Recipe Name:</Label>
                                {/* <Error>{this.state.recipe.error}</Error> */}
                                <Input
                                    id="recipe_name"
                                    value={this.state.recipe.title}
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
                                    value={this.state.recipe.instructions}
                                    onChange={this.handleInstructionsChange}
                                    rows={7}
                                />
                            </InstructionFormField>
                            <Button
                                type='button'
                                onClick={this.addRecipe}
                                value='Save'
                                disabled={!isEnabled}
                            />
                            <Button
                                type='button'
                                onClick={this.cancelChanges}
                                value='Cancel Changes'
                                disabled={!isEnabled}
                            />
                        </Form>
                    </Image>
                </Outer>
            </div>
        );
    }
}
