
import React, { Component } from 'react';
import DisplayAddTitle from '../tableau/DisplayAddTitle';
import moment from "moment";
import DisplayAddNews from '../tableau/DisplayAddNews';


class NewsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNews: [],
            titleNews: "",
            getTitle: [],
            titleTextNews: "",
            textNews: "",
            currentIdToEditTextNews: null,
            arrayId: null,

            editTitleTextNews: "",
            editTextNews: "",
            editTitleNews: ""

        }
    }

    handlerChangeInput = (event) => {
        switch (event.target.id) {
            case "titleNewsInput":
                this.setState({ titleNews: event.target.value });
                break;

            case "newsInput":
                this.setState({ textNews: event.target.value });
                break;

            case "titleTextNewsInput":
                this.setState({ titleTextNews: event.target.value });
                break;

            case "editNewsInput":
                this.setState({ editTextNews: event.target.value });
                break;

            case "editTitleTextNewsInput":
                this.setState({ editTitleTextNews: event.target.value });
                break;

            case "editTitleNewsInput":
                this.setState({ editTitleNews: event.target.value });
                break;

            default:
                break;
        }
    }

    getData = () => {
        fetch(process.env.REACT_APP_NEWS +'?section=news-card', {
            method: "GET",
            json: true,
        })
            .then(response => response.json())
            .then(response => {

                let array = [];
                if (response.length > 0) {
                    for (let object of response) {
                        let descriptionParse = JSON.parse(object.description);
                        object.description = descriptionParse;
                        array.push(object);
                    }
                }

                this.setState({ dataNews: array.reverse() })
            })


            .catch(error => console.log(error))

        fetch(process.env.REACT_APP_NEWS + '?section=news-title', {
            method: "GET",
            json: true,
        })
            .then(response => response.json())
            .then(response => this.setState({ getTitle: response, titleNews: "", titleTextNews: "", textNews: "" }))
            .catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.getData();
    }

    sendNews = (event) => {

        let date = moment(new Date()).format("DD-MM-YYYY");
        let objDescriptionNews = {
            "date": date,
            "description": this.state.textNews
        }

        let obj_data = {
            "title": this.state.titleNews,
            "subtitle": this.state.titleNews === "" ? this.state.titleTextNews : "",
            "description": this.state.titleNews === "" ? JSON.stringify(objDescriptionNews) : "",
            "section": event.target.id,
        }

         var requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            }),
            body: JSON.stringify(obj_data),
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_NEWS, requestOptions)
            .then(response => response.json())
            .then(response => this.getData())
            .catch(err => console.log({ 'ERROR': err.message })) 
    }

    editTitle = () => {
        let obj_data = {
            "title": this.state.editTitleNews,
            "subtitle": "",
            "description": "",
            "section": "news-title",
        }

        let requestOptions = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            }),
            body:JSON.stringify(obj_data)
        };


        fetch(process.env.REACT_APP_NEWS + '/' + this.state.getTitle[0].id, requestOptions)
            .then(response => response.json())
            .then(response => this.getData())
            .catch(err => console.log({ 'ERROR': err }))

    }

    editTextNews = () => {
        const { arrayId, dataNews, currentIdToEditTextNews, editTextNews, editTitleTextNews } = this.state;
        let dateMaj = moment(new Date()).format("DD-MM-YYYY");
        let description = dataNews[arrayId].description;
        description.maj = dateMaj;
        description.description = editTextNews;

        let obj_data = {
            "title": "",
            "subtitle": editTitleTextNews,
            "description": JSON.stringify(description),
            "section": "news-card",
        }


        var requestOptions = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            }),
            body: JSON.stringify(obj_data),
            redirect: 'follow'
        };

        let url = process.env.REACT_APP_NEWS + '/' + currentIdToEditTextNews;


        fetch(url, requestOptions)
            .then(response => response.json())
            .then(response => { this.getData() })
            .catch(err => console.log({ 'ERROR': err.message }))
    }

    getIdToEditText = (index, event) => {
        this.setState({
            currentIdToEditTextNews: this.state.dataNews[index].id,
            editTitleTextNews: this.state.dataNews[index].subtitle,
            editTextNews: this.state.dataNews[index].description.description,
            arrayId: index
        });
    }

    deleteNews = () => {

        var requestOptions = {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            })
        };

        fetch(process.env.REACT_APP_NEWS +'/'+ this.state.currentIdToEditTextNews, requestOptions)
            .then(response => response.json())
            .then(response => { this.getData() })
            .catch(err => console.log({ 'ERROR': err.message }))
    }



    render() {

        const placeholderTitle = this.state.getTitle.length > 0 && this.state.getTitle[0].title.toString();
        const title = placeholderTitle;

        return (
            <div className="div-container">
                <div id="div-title">

                    {!this.state.getTitle.length > 0 && <button type="button" className="btn btn-primary mb-3" data-toggle="modal" data-target="#modalAddtitleNewsAdmin">
                        Ajouter un titre
                    </button>}

                </div>

                <div className="tab">
                    {title !== undefined && <DisplayAddTitle title={title} />}
                </div>

                <hr></hr>


                <div id="div-news" className="p-5">
                    <button type="button" className="btn btn-primary mb-3" data-toggle="modal" data-target="#modalAddNewsAdmin">
                        Ajouter une news
                    </button>
                </div>

                <div className="tab">
                    {this.state.dataNews.length > 0 && <DisplayAddNews dataNews={this.state.dataNews} getIdToEditText={this.getIdToEditText} />}
                </div>



                {/*add title modal*/}
                <div className="modal fade" id="modalAddtitleNewsAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ajouter un title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="d-flex justify-content-center">
                                    <div className="form-group mr-2">
                                        <input id="titleNewsInput" placeholder="Titre de la section" className="form-control" value={this.state.titleNews} onChange={this.handlerChangeInput} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    id="news-title"
                                    onClick={this.sendNews.bind(this)}
                                >Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*modify title modal*/}
                <div className="modal fade" id="modalEditTitleNewsAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier un title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="d-flex justify-content-center">
                                    <div className="form-group mr-2">
                                        <input id="editTitleNewsInput" placeholder={`${placeholderTitle}`} className="form-control" value={this.state.editTitleNews} onChange={this.handlerChangeInput} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    id="description-news-section"
                                    onClick={this.editTitle}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*add news modal*/}
                <div className="modal fade" id="modalAddNewsAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ajouter une news</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="d-flex flex-column">
                                    <div className="div-titleTextNews mb-3">
                                        <input
                                            type="texte"
                                            className="form-control"
                                            placeholder="Titre de la description"
                                            value={this.state.titleTextNews}
                                            id="titleTextNewsInput"
                                            onChange={this.handlerChangeInput}
                                        />

                                    </div>
                                    <div className="form-group mr-2" style={{ width: "100%", height: "3rem" }}>
                                        <textarea
                                            id="newsInput"
                                            placeholder="description de la news"
                                            className="form-control"
                                            value={this.state.textNews}
                                            onChange={this.handlerChangeInput}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    id="news-card"
                                    onClick={this.sendNews.bind(this)}>
                                    Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*modify text News modal*/}
                <div className="modal fade" id="modalEditTextNewsAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier une news</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="d-flex flex-column">
                                    <div className="div-titleTextNews mb-3">
                                        <input
                                            type="texte"
                                            className="form-control"
                                            placeholder="Titre de la description"
                                            value={this.state.editTitleTextNews}
                                            id="editTitleTextNewsInput"
                                            onChange={this.handlerChangeInput}
                                        />

                                    </div>
                                    <div className="form-group mr-2" style={{ width: "100%", height: "3rem" }}>
                                        <textarea
                                            id="editNewsInput"
                                            placeholder="description de la news"
                                            className="form-control"
                                            value={this.state.editTextNews}
                                            onChange={this.handlerChangeInput}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    id="description-news-section"
                                    onClick={this.editTextNews}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*delete text news modal*/}
                <div className="modal fade" id="modalDeleteTextNewsAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">supprimer une news</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Etes vous certain de vouloir supprimer cette news ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    id="description-news-section"
                                    onClick={this.deleteNews}>supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsAdmin;