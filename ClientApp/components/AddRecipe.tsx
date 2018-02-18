import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as Fontawesome from 'react-fontawesome';

const Outer: any = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding-top: 20px;
    height: 660px;
    width: 900px;
    margin: auto;
    color: #808080;
`;

const Image: any = styled.div`
    background-color:red;
    height: 600px;
    width: 800px;
    margin: auto;
    background-image: url('https://images.theconversation.com/files/181712/original/file-20170810-27667-l8qew7.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1012&h=668&fit=crop');
    border: 1px solid black;
`;

const Form: any = styled.form`
    height: 598px;
    width: 400px;
    justify-content: center;
    background-color: #fff;
    opacity: 0.93;
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
    margin-top: 20px;
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

export class AddRecipe extends React.Component<RouteComponentProps<{}>, { title: string, imageBlob: any, ingredients: any, instructions: string, error: string }> {
    constructor() {
        super();
        this.state = { title: '', ingredients: [], instructions: '', error: '', imageBlob: null };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
        //this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleImageChange(event: any): void {
        this.setState({imageBlob: event.target.file});
    }

    handleTitleChange(event: any): void {
        this.setState({ title: event.target.value });
    }

    // handleIngredientChange(event: any): void {
    // }

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

    updateImage(): void {
        alert('image will come');
        fetch('/api/Recipe/AddImage',{
            method: 'POST',
        //body: JSON.stringify(data),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then((res:any) => {console.log(res);});
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
            Ingridients: this.state.ingredients
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
                //
            } else {
                res.text().then((t) => this.setState({ error: t }));
            }
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
                <Image>
                    <input type='file' name='Select Image File' onChange={this.handleImageChange}/>
                    <ImageButton type='submit' value='Upload Image' onClick={this.updateImage}/>
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
