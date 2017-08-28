import React, {
  Component
} from 'react';
import axios from 'axios';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        x : 'x',
        columns: [],
        type: 'bar'
      },
      axis: {
        x: {
            type: 'category',
            tick: {
                rotate: 75,
                multiline: false
            },
            height: 130
        }
      }
    }
  };

  componentDidMount() {
    axios.get('/api/issues/search?componentKeys=' + this.props.match.params.key + '&types=VULNERABILITY', {
        auth: {
          username: '1133c49d0d41ff6760fd45fd03cf81bd0ad2f377',
          password: ''
        }
      })
      .then(res => {
        const issues = res.data.issues;
        var issue_counts = {
          'BLOCKER': 0,
          'CRITICAL': 0,
          'MAJOR': 0,
          'MINOR': 0,
          'INFO': 0
        }
        // construct a map based on severity, show all categories
        issues.forEach(function (issue) {
          issue_counts[issue.severity] = issue_counts[issue.severity] + 1;
        })

        this.setState((prevState) => {
          var newState = JSON.parse(JSON.stringify(prevState));
          newState.data.columns = [
            ['x', 'BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'INFO'],
            ['Number of Issues', issue_counts['BLOCKER'], issue_counts['CRITICAL'], issue_counts['MAJOR'],  issue_counts['MINOR'],  issue_counts['INFO']],
          ]

          return newState;
        });


      });
  }

  render() {
    return ( <div>
      <h1> { this.props.match.params.key } </h1>
      <h2> VULNERABILITY issues bar chart </h2>
      <C3Chart data={this.state.data} axis={this.state.axis}/>
      </div>
    );
  }
}

export default App;
