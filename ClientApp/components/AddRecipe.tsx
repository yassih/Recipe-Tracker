import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

// interface CounterState {
//     currentCount: number;
// }

const Form = styled.form`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);    
    margin: auto;
    height: 600px;
    width: 500px;
    margin: auto;
    display: flex;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #A9A9A9;
`;

const FormHeader = styled.h2`
    font-weight: 900;
    height: 50px;
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 50%;
`;

const FormField = styled.div`
    width: 100%;
    margin: 5px 10px;
`;

const Input = styled.input`
    height: 45px;
    width: 95%;
    text-align: left;
    line-height : 42px;
    margin: 5px 0px; 
    display: block;
`;

const TextareaInput = styled.textarea`
    height: 45px;
    width: 95%;
    text-align: left;
    line-height : 20px;
    margin: 5px 0px; 
    display: block;
`;

const Label = styled.label`
    text-align: left;
    font-family: 'Roboto',sans-serif;
`;

const Button = styled.input`
    width: 20px;    
    height: 50px;
    border: thin solid #fff;
    background-color: #224377;
    align-self: center;
    margin-top: 20px;
`;

export class AddRecipe extends React.Component<RouteComponentProps<{}>, {title : string ,ingridient: string ,instructions: string,  error : string}> {
    constructor() {
        super();
        this.state = { title: '' , ingridient: '', instructions:'' , error: ''};

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
        this.handleIngredientChange= this.handleIngredientChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
    }

    handleTitleChange(event: any) {
        this.setState({ title: event.target.value });
    }

    handleIngredientChange(event: any){
        this.setState({ ingridient: event.target.value });
    }

    handleInstructionsChange(event: any){
        this.setState({ instructions: event.target.value});
    }

    handleSubmit(event: any) {
        alert('A name was submitted: ' + this.state.title);
        event.preventDefault();
    }


    private addIngredient(): void {
        alert(`added ${this.state.ingridient}`)
    }

    private addRecipe(): void {
        var data = {
            createDateTime: new Date(),
            Instructions: this.state.instructions,
            Title: this.state.title
        };
        console.log('im clicked');
        fetch('/api/Recipe/AddRecipe', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(res => {
            if(res.status === 200){

            }
            else {
                res.text().then((t) => this.setState({error : t}));
            }
        });

    }
    

    public render() {
        return (
            <Form>
                <FormHeader>
                    Recipe Card
                </FormHeader>
                <FormField>
                    <Label>Recipe Name:</Label>
                    <Input
                        id="recipe_name"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <label>{this.state.error}</label>
                </FormField>
                <FormField>
                    <Label>Recipe Ingredients:</Label>
                    <Input 
                        value= {this.state.ingridient}
                        onChange= {this.handleIngredientChange}
                    />
                    <input type='button' onClick={this.addIngredient} value='Add Ingredient' />
                </FormField>
                <FormField>
                    <Label>Recipe Instruction:</Label>
                    <TextareaInput 
                        id="recipe_instructions"
                        value= {this.state.instructions}
                        onChange={this.handleInstructionsChange}
                        rows = {5}
                    />
                </FormField>
                <input type='button' onClick={this.addRecipe} value='Add Recipe' />
            </Form>);
    }
}
