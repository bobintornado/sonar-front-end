import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get('/api/components/search?qualifiers=TRK', {
        auth: {
          username: '1133c49d0d41ff6760fd45fd03cf81bd0ad2f377',
          password: ''
        }
      })
      .then(res => {
        const projects = res.data.components;
        this.setState({
          projects
        });
      });
  }

  render() {
    var projectList = this.state.projects.map(function(project, idx){
      return (<li key={project.key}>
                <NavLink to={"projects/" + project.key}>{project.name} </NavLink> 
              </li>)
    })

    return ( <div className = "App" >
      <div className = "App-header" >
      <img src = {
        logo  
      }
      className = "App-logo"
      alt = "logo" / >
      <h2> Sonar React Front-end </h2> </div>
      <ul> {projectList} </ul>
      </div>
    );
  }
}

export default App;
