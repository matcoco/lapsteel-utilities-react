import React, { Component } from 'react';
import InputAccordage from './InputAccordage';
import InputTonique from './InputTonique';
import InputMode from './InputMode';
import Canvas from './Canvas';

class LapsteelModulePrincipal extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputAccordage:"",
            inputTonique:"",
            inputMode:""
        }
    }

    componentDidMount = () => {
        let saisieTonique = document.getElementById('input-tonique-tonique').value;
        let mode  = document.getElementById('input-interval-mode').value;

        this.setState({ 
            inputTonique:saisieTonique,
            inputMode:mode
        });
        
    }

    handleOnChangeInput = (event) => {
        switch (event.target.id) {
            case 'input-accordage':
                this.setState({inputAccordage:event.target.value});
                break;
            case 'input-tonique-tonique':
                console.log(event.target.value);
                this.setState({inputTonique:event.target.value});
                break;
            case 'input-interval-mode':
                this.setState({inputMode:event.target.value});
                break;
            default:
                break;
        }
    }

    render(){
        const { inputAccordage, inputTonique, inputMode } = this.state;
        console.log("**********************************")
        console.log("inputAccordage : ",inputAccordage);
        console.log("inputTonique : ", inputTonique);
        console.log("inputTonique : ", inputMode);
        console.log("**********************************")
    
        return(
            <div>
                <InputAccordage handleOnChangeInput={this.handleOnChangeInput} inputAccordage={this.state.inputAccordage}/>
                <InputTonique handleOnChangeInput={this.handleOnChangeInput} getPutValue={this.getInputValue}/>
                <InputMode handleOnChangeInput={this.handleOnChangeInput}/>
                <Canvas />
            </div>
        )
    }
}

export default LapsteelModulePrincipal;