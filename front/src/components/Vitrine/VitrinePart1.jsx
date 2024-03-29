import React, { Component } from 'react';
import { Link} from 'react-router-dom';
class VitrinePart1 extends Component{


    render(){
        return(
            <div>
               
                <div className="row" style={{marginRight:"0",marginLeft:"0"}}>
                    <div className="container jumbotron col-lg-6 bg-white">
                        <h6 className="btn-welcome">Bienvenue sur Lapsteelator</h6>
                        <hr className="my-4"></hr>
                        <h2 className="vitrine-h2">GENERER VOS PROPRES MODES</h2>
                        <p className="vitrine-p">SIMPLE & RAPIDE.</p>            
                       <div className="btn-accueil mt-5">
                            <Link className="text-light" to="/Lapsteelator"><button type="button" className="btn btn-primary btn-lg">C'est parti</button></Link>
                        </div>
                    </div>
                    <div className="img-vitrine col-lg-6" style={{paddingRight:"0"}}>
                        <img className="w-100" src="/images/vitrine/screen-pc.png" alt="illustration d'une lapsteel guitar"/>
                    </div>
                </div>
            </div>
         

           
        )
    }
}

export default VitrinePart1;