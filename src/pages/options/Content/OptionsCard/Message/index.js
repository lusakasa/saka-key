import { h } from 'preact'
import './style.css'

export default ({ isBuiltInProfile }) =>
  isBuiltInProfile ? (
    <section className="options-card-message">
      To customize your options, create a new profile using the toolbar above.
    </section>
  ) : (
    undefined
  )
