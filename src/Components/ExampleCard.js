import React from 'react';
import Scroll from './Scroll';
import CommitTest from './CommitTest';

import './ExampleCard.css';



export class ExampleCard extends React.Component {

    constructor() {
        super();
        this.state = {
            username : '',
            avatar_url : null,
            public_repos: null,
            repositories : [],
            html_url : null,
            commit_message : null

        }
    }

    fetchRepository(){
        return fetch('https://api.github.com/users/AleksiAalto/repos')
        .then(response => response.json())
        .then(response => {
          return response
        })
    }

    async processAleksiRepo(e){
        e.preventDefault();
        let repo = await this.fetchRepository();
        this.setState({repositories : repo});
    }

    getUser(kayttaja){
        return fetch(`https://api.github.com/users/${kayttaja}`)
        .then(response => response.json())
        .then(response => {
            return response;
        })
    }

    async processAleksi(e){
        e.preventDefault();
        let user = await this.getUser("AleksiAalto");
        this.setState({avatar_url :  user.avatar_url,
            username : user.login,
            public_repos : user.public_repos,
            html_url : user.html_url
        });
        this.processAleksiRepo(e); 
    }

    getCommit(kayttaja){
        return fetch(`https://api.github.com/repos/${kayttaja}/Grid/commits`)
        .then(response => response.json())
        .then(response => {
            return response;
        })
    }

    async haeCommit(z){
        z.preventDefault();
        let x = await this.getCommit(this.refs.username.value);
        this.setState({
            commit_message : x[0].commit.message
        })
        
    }

    render() {
        return (
            <div>
                <CommitTest/>
                <Scroll>
                    <div className="Container">
                        <div className="header">
                            <h2 className="">Esimerkkinäkymä</h2>
                            <form onSubmit={e => this.processAleksi(e)} className="pa4 white-80">
                                <div className="measure">
                                    <label htmlFor="name" className="tc f6 b db mb2">Käyttäjätunnus <span className="normal white-60">(Kirjoita käyttäjätunnus ja paina enter)</span></label>
                                    <input ref='username' id="name" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"></input>
                                </div>
                            </form>
                        </div>
                        <div className="Context">
                            <div className="Kortti">
                                <div className="pic">
                                    <img src={this.state.avatar_url}></img>    
                                </div>
                                <div className="Otsikko">
                                    {this.state.username}<br/>{this.state.public_repos}
                                </div>
                            </div>
                            <div className="repos">
                                <ul>
                                    {this.state.repositories.map((a => 
                                        <li className= "ph3 pv3 bb b--light-silver">
                                            <br/><a href={a.html_url} className="f4 fw7 dib pa2 no-underline bg-animate hover-bg-light-blue white">{a.name}</a>
                                            <br/>Kuvaus: "{a.description}"
                                            <br/>Repo luotu: {a.created_at}
                                            <br/>Repo päivitetty: {a.updated_at}<br/>
                                            <br/>
                                            <br/>Commit message: {this.state.commit_message}
                                        </li>
                                    ))}
                                </ul>
                            </div>   
                        </div>
                    </div>  
                </Scroll>
                
            </div>
        );
    }
}
export default ExampleCard;