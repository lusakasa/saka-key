import 'lib/browser_polyfill'
import { render, h } from 'preact'
import { initialize } from 'client'
import Main from './Main'

initialize('page')

render(<Main />, document.body)
