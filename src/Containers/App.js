import React, { Component, useImperativeHandle } from 'react';
import Scroll from '../Components/Scroll';
import './App.css';
import '../Components/ExampleCard.css';

class App extends Component {
constructor(){
  super();
  this.state = {
    username : '',
    avatar_url : null,
    public_repos : null,
    repositories : []
  }
}

  getUser(kayttaja){
    return fetch(`https://api.github.com/users/${kayttaja}`)
    .then(response => response.json())
    .then(response => {
      return response
    })
  }

  async handleSubmit(e){
    e.preventDefault();
    let user = await this.getUser(this.refs.username.value);
    this.setState({username: user.login,
      avatar_url : user.avatar_url,
      public_repos : user.public_repos
    })
    this.handleUser(e);
  }

  fetchRepos(repo){
    return fetch(`https://api.github.com/users/${repo}/repos`)
    .then(response => response.json())
    .then(response => {
      return response
    })
  }

  async handleUser(e){
    e.preventDefault();
    let repo = await this.fetchRepos(this.refs.username.value);
    this.setState({repositories : repo})

  }
  
  render() {
    return (
      <div className="Container">
        <header className="tc pv4 pv5-ns">
          <h1 className="f5 f4-ns fw6 white hover-red tracked">GitHub - Finder</h1>
          <h2 className="f5 f4-ns fw6 white hover-red">Aleksi Aalto</h2>
          <h3 className="f6 white fw2 ttu tracked hover-red">Tampere</h3>
          <a className="f6 grow no-underline br-pill ph5 pv2 mb1 dib white bg-red" href="https://github.com/AleksiAalto">GitHub</a>
        </header>
        <form onSubmit={e => this.handleSubmit(e)} className="pa4 white-80">
          <div className="measure">
            <label htmlFor="name" className="tc f6 b db mb2">Käyttäjätunnus <span className="normal white-60">(Kirjoita käyttäjätunnus ja paina enter)</span></label>
            <input ref='username' id="name" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"></input>
          </div>
        </form>
        <Scroll>
          <div className="Box">

            <div className="Context">
              <div className="Kortti">
                <div className="pic">
                  <img src={this.state.avatar_url}></img>
                </div>
                <div className="Otsikko">
                  {this.state.username}<br/>
                  {this.state.public_repos}
                </div>
              </div>

              <div className="repos">
                <ul>
                    {this.state.repositories.map((a => 
                      <li className="ph3 pv3 bb b--light-silver">
                        <br/><a href={a.html_url} className="f4 fw7 dib pa2 no-underline bg-animate hover-bg-light-blue white">{a.name}</a>
                        <br/>Kuvaus: "{a.description}"
                        <br/>Repo luotu: {a.created_at}
                        <br/>Repo päivitetty: {a.updated_at}
                        <br/>{a.commits_url}
                        <br/>Koko nimi: {a.full_name}
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

export default App;
