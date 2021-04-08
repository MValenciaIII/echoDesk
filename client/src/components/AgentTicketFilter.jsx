import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

// @# USED TO COMPOSE FILTER FORM;  NEED TO SEE IF COMPOUND SELECT IS ACTUALLY NEEDED;

export default function AgentTicketFilterForm({
  defaultValues,
  children,
  onSubmit,
  classNames,
  ...restProps
}) {
  const methods = useForm({ defaultValues });

  const { handleSubmit } = methods;

  return (
    //onSubmit will be invoked from parent when form and inputs are put together;
    <form
      {...restProps}
      className={classNames}
      onSubmit={handleSubmit(onSubmit)}
    >
      {React.Children.map(children, (child) => {
        // ! MUST HAVE NAME PROP PASSED IN DUE TO TERNARY!
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
                reset: methods.reset,
                handleSubmit,
                methods,
              },
            })
          : child;
      })}
    </form>
  );
}

AgentTicketFilterForm.Input = function AgentTicketFilterInput({
  register,
  name,
  labelClassNames,
  inputClassNames,
  type,
  watch,
  label,
  ...rest
}) {
  return (
    <label className={labelClassNames}>
      {label && label}
      <input
        name={name}
        ref={register}
        className={inputClassNames}
        type={type}
      />
    </label>
  );
};

AgentTicketFilterForm.Select = function AgentTicketFilterSelect({
  register,
  options,
  name,
  labelClassNames,
  inputClassNames,
  label,
  ...rest
}) {
  return (
    <label htmlFor={name} className={labelClassNames}>
      {label && label}
      <select
        defaultValue=""
        placeholder="any"
        className={inputClassNames}
        name={name}
        ref={register}
      >
        {options}
      </select>
    </label>
  );
};

AgentTicketFilterForm.ReactSelect = function AgentTicketFilterReactSelect({
  register,
  options,
  name,
  labelClassNames,
  inputClassNames,
  label,
  methods,
  ...rest
}) {
  const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, state) => {
      // debugger;
      const color = state.data.color;
      return {
        ...styles,
        ...dot(state.data.color),
        color: 'black',
        ':hover': {
          borderColor: 'red',
          color: 'red',
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles, state) => ({ ...styles, ...dot() }),
    singleValue: (styles, state) => {
      return {
        ...styles,
        ...dot(state.data.color),
      };
    },
  };

  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     borderBottom: '1px dotted pink',
  //     color: state.isSelected ? 'red' : 'blue',
  //     padding: 20,
  //   }),
  //   control: (provided, state) => ({
  //     // none of react-select's styles are passed to <Control />
  //     ...provided,
  //     width: '200',
  //     marginTop: '90px',
  //   }),
  //   valueContainer: (provided, state) => ({
  //     // none of react-select's styles are passed to <Control />
  //     ...provided,
  //     background: ' #cddacd',
  //   }),

  //   // singleValue: (provided, state) => {
  //   //   const opacity = state.isDisabled ? 0.5 : 1;
  //   //   const transition = 'opacity 300ms';

  //   //   return { ...provided, opacity, transition };
  //   // },
  // };

  return (
    <>
      <p>Ice Cream!</p>
      {/* <Controller
        name={name}
        control={methods.control}
        defaultValue={''}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={[
              { value: '', label: 'Any', color: '#ccc' },
              { value: 'chocolate', label: 'Chocolate', color: 'brown' },
              { value: 'strawberry', label: 'Strawberry', color: 'pink' },
              { value: 'vanilla', label: 'Vanilla', color: 'blue' },
            ]}
            // styles={customStyles}
            styles={colourStyles}
          />
        )}
      /> */}
      <Controller
        // There is newer docs using render props instead of "as" prop but the render prop pattern was not passing through the data on submission  while testing it- ~ WK Wednesday April 07, 2021 04:30PM
        as={
          <Select
            options={[
              { value: '', label: 'Any', color: '#ccc' },
              { value: 'chocolate', label: 'Chocolate', color: 'brown' },
              { value: 'strawberry', label: 'Strawberry', color: 'pink' },
              { value: 'vanilla', label: 'Vanilla', color: 'blue' },
            ]}
            defaultValue=""
            styles={colourStyles}
          />
        }
        name={name}
        control={methods.control}
        defaultValue=""
      />
    </>
  );
};

AgentTicketFilterForm.Heading = function AgentTicketFilterHeading({
  inputClassNames,
  ...rest
}) {
  return (
    <h2 className="mx-auto text-lg font-bold text-center">Filter Tickets</h2>
  );
};

AgentTicketFilterForm.Button = function AgentTicketFilterButton({
  register,
  reset,
  defaultValues,
  onSubmit,
  handleSubmit,
  ...rest
}) {
  // debugger;

  return (
    <button
      onClick={(e) => reset(defaultValues)}
      type="submit" //submit will trigger the submitForm and thus call All Tickets again after since all Default values will be empty;
      className="px-2 py-1 mt-3 text-center text-black bg-gray-100 hover:bg-red-400 hover:text-white "
    >
      Reset Form
    </button>
  );
};

// For flexbox panes in form;
AgentTicketFilterForm.FlexPane = function AgentTicketFilterFlexPane({
  classNames,
  children,
  ...restProps //props from the from
}) {
  return (
    <div className={classNames}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { ...child.props, ...restProps });
      })}
    </div>
  );
};
