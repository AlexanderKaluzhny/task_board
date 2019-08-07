/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import qs from 'query-string';

import TaskListItem from './TaskListItem';

class TaskList extends React.Component {
  state = {
    isLoaded: false,
    tasksList: [],
  }

  componentDidMount() {
    this.fetchTasks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.fetchTasks();
    }
  }

  fetchTasks() {
    fetch(`api/tasks/?${qs.stringify(this.props.query)}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            tasksList: result.results,
          });
        },
        error => this.setState({ isLoaded: false, error }),
      );
  }

  render() {
    const { error } = this.state;
    const { currentUserId, tasksList } = this.state;

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <tbody>
              <tr id="task-table-header" className="active">
                <th className="text-center">Name</th>
                <th className="text-center">Owner</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
              {tasksList.length > 0
                && tasksList.map(listItem => (
                  <TaskListItem
                    id={listItem.id}
                    key={listItem.id}
                    data={listItem}
                    currentUserId={currentUserId}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TaskList;
