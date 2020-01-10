import React from 'react';

export class CommitTest extends React.Component{

    constructor(){
        super();
        this.state = {
            name : null,
            date : null,
            message : null,
            avatar_url : null
        }
    }

    haeCommitit(){
        return fetch('https://api.github.com/repos/AleksiAalto/Grid/commits')
        .then(response => response.json())
        .then(response => {
            return response;
        })
    }

    async commitFinder(e){
        e.preventDefault();
        let user = await this.haeCommitit();
        this.setState({ name : user[0].commit.author.name,
            date : user[0].commit.author.date,
            message : user[0].commit.message,
            avatar_url : user[1].author.avatar_url

        })
        console.log(user);
        console.log(user[0].commit.author)
    }
    render (){
        return (
            <div>
                <h1>Moro</h1>
                <button onClick ={e => this.commitFinder(e)}>nappi</button>
                {this.state.name}
                {this.state.date}
                {this.state.message}
                <img src={this.state.avatar_url}></img>
            </div>
        );
    }
}
export default CommitTest;