import React from 'react';
import { useForm } from 'react-hook-form';
// import { UserContext } from '../context/dbUserContext';

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
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
                reset: methods.reset,
                handleSubmit,
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
  console.log(watch);
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
      onClick={(e) => reset()}
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
