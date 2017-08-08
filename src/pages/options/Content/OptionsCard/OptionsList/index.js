import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import OptionItem from './OptionItem';
import ErrorItem from './ErrorItem';
import transformOptions from 'options/transform';
import { setOption } from 'pages/options/actions';

class OptionsList extends Component {
  render ({ options, values, errors, setOption, isBuiltInProfile }) {
    return (
      <ul
        className='mdc-list mdc-list--dense'
      >
        { options.length === 0
          ? 'No settings to configure'
          : options.map((option) => (
            this.isOptionVisible(option)
            ? (
              <div>
                { errors && errors[option.key]
                  ? <ErrorItem message={errors[option.key]} />
                  : undefined
                }
                <OptionItem
                  {...option}
                  _key={option.key}
                  values={values}
                  value={values && values[option.key]}
                  setOption={setOption(this)}
                />
              </div>
              )
            : undefined
            ))
        }
      </ul>
    );
  }
  isOptionVisible = (option) => {
    if (!option.hasOwnProperty('visible')) return true;
    if (option.visible === true) return true;
    if (option.visible === false) return false;
    return option.visible
      .split('&&')
      .map((clause) => clause.trim())
      .every((clause) => {
        const [key, op, value] = clause.split(' ').map((s) => s.trim());
        switch (op) {
          case '=':
            return this.props.values[key] === JSON.parse(value);
          case '!=':
            return this.props.values[key] !== JSON.parse(value);
          case 'is':
            return this.isOptionVisible(this.props.options.find((o) => o.key === key));
          case 'not':
            return !this.isOptionVisible(this.props.options.find((o) => o.key === key));
          default:
            throw Error(`Option '${option.key}' has invalid visible condition: '${option.visible}'`);
        }
      });
  }
}

const mapStateToProps = ({ config, categories, activeProfiles, options }, { category, activeProfile }) => {
  const allOptions = {};
  for (const category of categories) {
    const profile = activeProfiles[category];
    Object.assign(allOptions, options[`${category}_${profile}`]);
  }
  return {
    options: config[category],
    values: options[`${category}_${activeProfile}`],
    errors: transformOptions(allOptions, config).errors
  };
};

const mapDispatchToProps = (dispatch, { category, activeProfile, isBuiltInProfile }) => ({
  setOption: (component) => (key, value) => {
    if (isBuiltInProfile) {
      component.forceUpdate();
      alert(`${activeProfile} is a built-in profile that cannot be modified. To customize your options, create a new profile using the toolbar above.`);
    } else {
      dispatch(setOption(category, activeProfile, key, value));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList);
