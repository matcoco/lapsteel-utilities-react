import React, { Component } from 'react';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class HomePagePart2 extends Component {

    render() {
        const { homepageCard, handleClickLink } = this.props;

        return (
            <div className="container container-homepage-part2">
                <hr className="mt-5 mb-5"></hr>
                <h2 className="mb-5">Applications</h2>
                <div className="card-deck">
                    {homepageCard.map((element, index) => (
                        <div key={index} className="card">
                            <img className="card-img-top" src={REACT_APP_SERVER_ADDRESS_FULL + element.url} alt={element.alt} style={{width:"20%", marginLeft:"auto", marginRight:"auto"}}/>
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                                <p className="card-text">{element.description}</p>
                            </div>
                            <div className="card-footer">
                                {element.isActived !== 0
                                    ? <button id={index + 1} className="btn btn-primary" onClick={handleClickLink}>Accéder à l'application</button>
                                    : <button id={index + 1} className={"btn btn-secondary"}>indisponible</button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default HomePagePart2;

