import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import HomePagePart1 from './HomePagePart1';
import getRessources from '../../utils/getRessources';
import HomePagePart2 from './HomePagePart2';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            homepageNews:[],
            homepageCard:[],
            isRedirectVideo:false,
            isRedirectLapsteelator:false,


        }
    }


    handleClickLink = (event) => {
        switch (event.target.id) {
            case '1':
                console.log("cas 1");
                this.setState({isRedirectLapsteelator:true});
                break;
            case '2':
                console.log("cas 2");
                this.setState({isRedirectVideo:true});
                break;
        
            default:
                break;
        }
    }

    componentDidMount = async () => {
    // obtenir les ressources pour la section homepage-news
    let homepageNewsArray = await getRessources('homepage','homepage-news', null, REACT_APP_SERVER_ADDRESS_FULL);
    // obtenir les ressources pour la section homepage-news
    let homepageCardArray = await getRessources('homepage','homepage-card',true, REACT_APP_SERVER_ADDRESS_FULL);

    this.setState({
        homepageNews:homepageNewsArray,
        homepageCard:homepageCardArray
    });

    }

    render(){
        console.log("this.state.isRedirectLapsteelator : ", this.state.isRedirectLapsteelator);
        console.log("this.state.isRedirectVideo : ", this.state.isRedirectVideo);
        return(
            <div>
                {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                <NavBarHomePage />
                <HomePagePart1 homepageNews={this.state.homepageNews}/>
                <HomePagePart2 homepageCard={this.state.homepageCard} handleClickLink={this.handleClickLink}/>
                {this.state.isRedirectLapsteelator ? <Redirect to='/lapsteelator' /> : ""}
                {this.state.isRedirectVideo ? <Redirect to='/videos' /> : ""}

            </div>
        )
    }
}





export default Homepage;