import { h } from 'preact';
import StandardLayout from 'pages/layout/StandardLayout';
import StandardContentCard from 'pages/layout/StandardContentCard';
import './style.css';

const MainView = () => (
  <section className='content-section'>
    {/*<h1 className='mdc-typography--display1'>New Users</h1>
    <h2 class='mdc-card__subtitle'>Subhead</h2>*/}
    <ul class='mdc-list mdc-list--two-line'>
      <li class='mdc-list-item'>
        <span class='mdc-list-item__text'>
          <span class='mdc-list-item__text__primary'>
            <a
              className='mdc-button mdc-button--primary'
              href='http://saka-key.lusakasa.com/tutorial'>
              Tutorial
            </a>
          </span>
          <span class='mdc-list-item__text__secondary'>Learn how to use Saka Key</span>
        </span>
      </li>
      <li class='mdc-list-item'>
        <span class='mdc-list-item__text'>
          <span class='mdc-list-item__text__primary'>
            <a
              className='mdc-button mdc-button--primary'
              href='http://saka-key.lusakasa.com/tutorial/settings.html'>
              Customize
            </a>
          </span>
          <span class='mdc-list-item__text__secondary'>
            Modify keybindings and adjust Saka Key's appearance
          </span>
        </span>
      </li>
      <li class='mdc-list-item'>
        <span class='mdc-list-item__text'>
          <span class='mdc-list-item__text__primary'>
            <a
              className='mdc-button mdc-button--primary'
              href='http://saka-key.lusakasa.com/getting_started/feedback.html'>
              Feedback
            </a>
          </span>
          <span class='mdc-list-item__text__secondary'>Report bugs, request features, and give 5-star ratings</span>
        </span>
      </li>
      <li class='mdc-list-item'>
        <span class='mdc-list-item__text'>
          <span class='mdc-list-item__text__primary'>
            <a
              className='mdc-button mdc-button--primary'
              href='https://github.com/lusakasa/saka-key/releases'>
              Release Notes
            </a>
          </span>
          <span class='mdc-list-item__text__secondary'>Find out what's changed in recent releases</span>
        </span>
      </li>
      <li class='mdc-list-item'>
        <span class='mdc-list-item__text'>
          <span class='mdc-list-item__text__primary'>
            <a
              className='mdc-button mdc-button--primary'
              href='https://github.com/lusakasa/saka-key'>
              Contribute
            </a>
          </span>
          <span class='mdc-list-item__text__secondary'>Developer? Help Make Saka Key better</span>
        </span>
      </li>
    </ul>
  </section>
);

const Header = () => (
  <div class='header-section'>
    <img
      alt='Saka Key'
      className='mdc-card__media main-logo-background'
      src='logo.png'
    />
    <section className='info-section'>
      <h1 className='mdc-card__title mdc-card__title--large'>Saka Key</h1>
      <h2 class='mdc-card__subtitle'>A keyboard interface to the web</h2>
      <h2 class='mdc-card__subtitle'>Version { SAKA_VERSION }</h2>
      <h2 class='mdc-card__subtitle'>By <a href='http://dawoodjee.com'>Sufyan</a></h2>
      {/*<a
        className='mdc-button mdc-button--primary'
        href='http://saka-key.lusakasa.com'>
        Handbook
      </a>
      <a
        className='mdc-button mdc-button--primary'
        href='https://github.com/lusakasa/saka-key'>
        Github
      </a>*/}
      {/*<a
        className='mdc-button mdc-button--primary'
        style='display:block'
        href='mailto:lusakasa.dev@gmail.com'>
        lusakasa.dev@gmail.com
      </a>*/}
    </section>
  </div>
);

export default () => (
  <Provider store={store}>
    <StandardLayout view='Extensions'>
      <StandardContentCard>
        <Header />
        <MainView />
      </StandardContentCard>
    </StandardLayout>
);

/* export default class Main extends Component {
  render () {
    return (
      <main className='mdc-layout-grid'>
        <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-3' />
        <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-6'>
          <Card>
            <Header />
            <MainView />
          </Card>
        </div>
        <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-3' />
      </main>
    );
  }
}*/
