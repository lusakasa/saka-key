import { h, Component } from 'preact'
import StandardLayout from 'pages/layout/StandardLayout'
import StandardContentCard from 'pages/layout/StandardContentCard'
import releaseNotesHTML from '../../../docs/docs/about/release-notes.md'
import './style.css'

const Item = ({ title, href, description }) => (
  <li className='mdc-list-item'>
    <span className='mdc-list-item__text'>
      <span className='mdc-list-item__text__primary'>
        <a
          className='mdc-button mdc-button--primary'
          href={href}
          target='_blank'
        >
          {title}
        </a>
      </span>
      <span className='mdc-list-item__text__secondary'>{description}</span>
    </span>
  </li>
)

const MainView = () => (
  <section className='content-section'>
    <ul className='mdc-list mdc-list--two-line'>
      <Item
        title='Tutorial'
        href='https://key.saka.io/tutorial'
        description='Learn how to use Saka Key'
      />
      <Item
        title='Customize'
        href='https://key.saka.io/tutorial/options'
        description="Modify keybindings and adjust Saka Key's appearance"
      />
      <Item
        title='Feedback'
        href='https://key.saka.io/getting_started/feedback.html'
        description='Report bugs, request features, and give 5-star ratings'
      />
      <Item
        title='Contribute'
        href='https://github.com/lusakasa/saka-key'
        description='Developer? Help Make Saka Key better'
      />
    </ul>
  </section>
)

const capitalize = str => str[0].toUpperCase() + str.slice(1)

const Header = () => (
  <div className='header-section'>
    <img
      alt='Saka Key'
      className='mdc-card__media main-logo-background'
      src='logo.png'
    />
    <section className='info-section'>
      <h1 className='mdc-card__title mdc-card__title--large'>Saka Key</h1>
      <h2 className='mdc-card__subtitle'>A keyboard interface to the web</h2>
      <h2 className='mdc-card__subtitle'>
        Version {SAKA_VERSION} for {capitalize(SAKA_PLATFORM)}
      </h2>
      <h2 className='mdc-card__subtitle'>
        By <a href='https://dawoodjee.com'>Sufyan</a>
      </h2>
    </section>
  </div>
)

class ReleaseNotes extends Component {
  render () {
    return (
      <section
        id='release-notes-section'
        style='margin-top: 40px; text-align: left; max-width: 600px'
        className='mdc-typography--body1'
        ref={e => {
          e.innerHTML = '<h1>Release Notes</h1>' + releaseNotesHTML.substr(89)
        }}
      />
    )
  }
}

export default () => (
  <StandardLayout view='Info'>
    <StandardContentCard>
      <div style='width: 100%; height: 100%; display: flex; flex-flow: row wrap; justify-content: space-around;'>
        <div>
          <Header />
          <MainView />
        </div>
        <ReleaseNotes />
      </div>
    </StandardContentCard>
  </StandardLayout>
)
