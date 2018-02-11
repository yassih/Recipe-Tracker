import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

// interface CounterState {
//     currentCount: number;
// }

const Form = styled.form`
    margin: auto;
    background-color: #355384;
    opacity: 0.8;
    border: 1px solid #224377;
    height: 500px;
    width: 400px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const FormHeader = styled.h2`
    font-weight: 900;
    color: #fff;
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
    color: #224377;
    height: 45px;
    width: 95%;
    text-align: left;
    line-height : 42px;
    margin: 5px 0px; 
    display: block;
`;

const Label = styled.label`
    color: #fff;
    text-align: left;
    font-family: 'Roboto',sans-serif;
`;

const Button = styled.input`
    width: 50%;    
    height: 50px;
    color: #fff;
    border: thin solid #fff;
    background-color: #224377;
    align-self: center;
    margin-top: 20px;
`;

export class AddRecipe extends React.Component<RouteComponentProps<{}>, {value : string , error : string}> {
    constructor() {
        super();
        this.state = { value: '' , error: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: any) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    private addRecipe(): void {
        var data = {
            createDateTime: new Date(),
            //id: '123',
            Title: this.state.value
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
                        id="recipe_name_input"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <label>{this.state.error}</label>
                </FormField>
                <FormField>
                    <Label>Recipe Ingredients:</Label>
                    <Input />
                </FormField>
                <FormField>
                    <Label>Recipe Instruction:</Label>
                    <Input />
                </FormField>
                <input type='button' onClick={this.addRecipe} value='Add Recipe' />
            </Form>);
    }
}
