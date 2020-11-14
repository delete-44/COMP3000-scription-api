import React, { Component } from "react";
import NotebookDataService from "../../services/notebook.service";
import Editable from "../editable.component";
import InlineEditor from "../inline-editor.component";

export default class Notebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      summary: null,
      notes: [],
    }
  }

  componentDidMount() {
    this.retrieveNotebook();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.id !== this.props.id) {
      this.retrieveNotebook();
    }
  }

  retrieveNotebook() {
    NotebookDataService.get(this.props.id)
      .then(response => {
        const notebook = response.data

        this.setState({
          name: notebook.name,
          summary: 'MOCK SUMMARY',
          notes: notebook.notes
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { name, summary, notes } = this.state;

    return (
      <div>
        <Editable defaultValue={name} id={this.props.id}></Editable>
        <InlineEditor displayValue={name}></InlineEditor>
        <h2>{summary}</h2>

        {notes &&
          notes.map((note, index) => (
            <li
              key={index}
            >
              {note.content}
            </li>
          ))}
      </div>
    );
  }
}