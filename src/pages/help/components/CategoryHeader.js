import { Component, h } from 'preact'

export default class CategoryHeader extends Component {
  render ({ category }) {
    return (
      <div>
        <h2>{category}</h2>
      </div>
    )
  }
}
