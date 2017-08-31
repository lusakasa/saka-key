import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import OptionItem from './OptionItem';
import ErrorItem from './ErrorItem';
import transformOptions from 'storage/transform';
import { setOption, setBuiltInOption } from 'pages/options/actions';

class OptionsList extends Component {
  render ({ visibleOptions, values, errors, setOption, isBuiltInProfile }) {
    return (
      <ul
        className='mdc-list mdc-list--dense'
        style={{ backgroundColor: Object.keys(errors).length === 0 ? 'inherit' : 'rgba(243, 188, 188, 0.44)' }}
      >
        { visibleOptions.length === 0
          ? 'No settings to configure'
          : visibleOptions.map((option) => (
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
          ))
        }
      </ul>
    );
  }
}

export function isConfigItemVisible (key, configList, values) {
  if (key === undefined) return true;
  const option = configList.find((o) => o.key === key);
  if (!option.hasOwnProperty('visible')) return true;
  if (option.visible === true) return true;
  if (option.visible === false) return false;
  return option.visible
    .split('&&')
    .map((clause) => clause.trim())
    .every((clause) => {
      const [ckey, op, value] = clause.split(' ').map((s) => s.trim());
      switch (op) {
        case '=':
          return values[ckey] === JSON.parse(value);
        case '!=':
          return values[ckey] !== JSON.parse(value);
        case 'is':
          return isConfigItemVisible(ckey, configList, values);
        case 'not':
          return !isConfigItemVisible(ckey, configList, values);
        default:
          throw Error(`Option '${key}' has invalid visible condition: '${option.visible}'`);
      }
    });
}

const mapStateToProps = ({ config, categories, activeProfiles, options }, { category, activeProfile }) => {
  const allOptions = {};
  for (const category of categories) {
    const profile = activeProfiles[category];
    Object.assign(allOptions, options[`${category}_${profile}`]);
  }
  const configList = config[category];
  const values = options[`${category}_${activeProfile}`];
  const visibleOptions = configList.filter((item) => isConfigItemVisible(item.key, configList, values));
  const { errors } = transformOptions(allOptions, config);
  const hasErrors = Object.keys(errors).length === 0;
  return {
    visibleOptions,
    values,
    errors,
    hasErrors
  };
};

const mapDispatchToProps = (dispatch, { category, activeProfile, isBuiltInProfile }) => ({
  setOption: (component) => (key, value) => {
    if (isBuiltInProfile) {
      dispatch(setBuiltInOption(category, activeProfile, `${activeProfile}_copy_${Date.now()}`, key, value));
    } else {
      dispatch(setOption(category, activeProfile, key, value));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList);
