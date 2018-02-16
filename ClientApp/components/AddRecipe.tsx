import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

// interface CounterState {
//     currentCount: number;
// }

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

const Input: any = styled.input`
    height: 35px;
    width: 100%;
    text-align: left;
    line-height : 42px;
    margin: 5px 0px;
    display: block;
`;

const TextareaInput: any = styled.textarea`
    height: 45px;
    width: 95%;
    text-align: left;
    margin: 5px 0px;
    display: block;
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

interface ILocalProps {
    //
}

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

    handleTitleChange(event: any): void {
        this.setState({ title: event.target.value });
    }

    handleIngredientChange(event: any): void {
        this.setState({ ingridient: event.target.value });
    }

    handleInstructionsChange(event: any): void {
        this.setState({ instructions: event.target.value});
    }

    handleSubmit(event: any): void {
        alert('A name was submitted: ' + this.state.title);
        event.preventDefault();
    }


    private addIngredient(): void {
        alert(`added ${this.state.ingridient}`);
    }

    private addRecipe(): void {
        let data: any = {
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
            if(res.status === 200) {
                //
        }else {
                res.text().then((t) => this.setState({error : t}));
            }
        });

    }

    public render() {
        return (
            <Outer>
                <Image>
                    <Form>
                        <FormHeader>
                            Recipe Card
                        </FormHeader>
                        <FormField>
                            <Label>Recipe Name:</Label>
                            <label>{this.state.error}</label>
                            <Input
                                id="recipe_name"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
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
                    </Form>
                </Image>
            </Outer>
            );
    }
}
