import { Component, h } from 'preact';
import './style.css';

export default class Tutorial extends Component {
  render () {
    return (
      <div className='mdc-layout-grid'>
        <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-2' />
        <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-8 content-region'>

          <div className='mdc-card saka-tutorial-card'>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>scroll down by pressing J</h1>
              {/*<h2 className='mdc-card__subtitle'>Coming Soon</h2>*/}
            </section>
            <section className='mdc-card__supporting-text'>
              <div className='arrow-container'>
                <svg class='arrows'>
                  <path class='a1' d='M0 0 L30 32 L60 0' />
                  <path class='a2' d='M0 20 L30 52 L60 20' />
                  <path class='a3' d='M0 40 L30 72 L60 40' />
                </svg>
              </div>
            </section>
          </div>

          <div className='mdc-card saka-tutorial-card'>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>scroll down faster with Shift + J</h1>
            </section>
            <section className='mdc-card__supporting-text'>
              <div className='arrow-container'>
                <svg class='arrows'>
                  <path class='a1' d='M0 0 L30 32 L60 0' />
                  <path class='a2' d='M0 20 L30 52 L60 20' />
                  <path class='a3' d='M0 40 L30 72 L60 40' />
                </svg>
              </div>
            </section>
          </div>

          <div className='mdc-card saka-tutorial-card'>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>scroll back up with K and faster with Shift + K</h1>
              <h2 className='mdc-card__subtitle'>But scroll back down when you're tired of going up...</h2>
            </section>
            <section className='mdc-card__supporting-text'>
              <div className='arrow-container' style={{ transform: 'scaleY(-1)' }}>
                <svg class='arrows'>
                  <path class='a1' d='M0 0 L30 32 L60 0' />
                  <path class='a2' d='M0 20 L30 52 L60 20' />
                  <path class='a3' d='M0 40 L30 72 L60 40' />
                </svg>
              </div>
            </section>
          </div>

          <div className='mdc-card saka-tutorial-card'>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>scroll to the top by pressing G twice</h1>
              <h2 className='mdc-card__subtitle'>and to the bottom with Shift + G, but save that for later</h2>
            </section>
            <section className='mdc-card__supporting-text'>
              <div className='arrow-container' style={{ transform: 'scaleY(-1)' }}>
                <svg class='arrows'>
                  <path class='a1' d='M0 0 L30 32 L60 0' />
                  <path class='a2' d='M0 20 L30 52 L60 20' />
                  <path class='a3' d='M0 40 L30 72 L60 40' />
                </svg>
              </div>
            </section>
          </div>

          <div className='mdc-card saka-tutorial-card'>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>scroll to the top by pressing G twice</h1>
              <h2 className='mdc-card__subtitle'>and to the bottom with Shift + G, but save that for later</h2>
            </section>
            <section className='mdc-card__supporting-text'>
              <div className='arrow-container' style={{ transform: 'scaleY(-1)' }}>
                <svg class='arrows'>
                  <path class='a1' d='M0 0 L30 32 L60 0' />
                  <path class='a2' d='M0 20 L30 52 L60 20' />
                  <path class='a3' d='M0 40 L30 72 L60 40' />
                </svg>
              </div>
            </section>
          </div>

          <div className='mdc-card saka-tutorial-card'>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>interact with the page by pressing F</h1>
            </section>
            <section className='mdc-card__supporting-text'>
              <input type='text' placeholder='type something here' />
              <input type='button' value='click this button' />
            </section>
          </div>


        </div>
        <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-2' />
      </div>
    );
  }
}
