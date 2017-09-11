import { Component, h } from 'preact'

export default class Unknown extends Component {
  render ({ label, type }) {
    return (
      <h1 style={{ color: 'red' }}>
        {label}: unknown Options Type {type}
      </h1>
    )
  }
}
