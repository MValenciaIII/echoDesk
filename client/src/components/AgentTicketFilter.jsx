import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/dbUserContext';
// import { TicketContext } from '../ticketContext.js';

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
  ...rest
}) {
  console.log(watch);
  return (
    <label className={labelClassNames}>
      {name}
      <input name={name} ref={register} {...rest} className={inputClassNames} />
    </label>
  );
};

AgentTicketFilterForm.css = function AgentTicketFiltercss({ ...rest }) {
  return <input className="block w-56 p-1 rounded-sm" />;
};

AgentTicketFilterForm.Select = function AgentTicketFilterSelect({
  register,
  options,
  name,
  labelClassNames,
  inputClassNames,
  ...rest
}) {
  return (
    <label htmlFor={name}>
      {name}
      <select
        defaultValue=""
        placeholder="any"
        className={inputClassNames}
        name={name}
        ref={register}
        {...rest}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
};

AgentTicketFilterForm.Heading = function AgentTicketFilterHeading({
  inputClassNames,
  ...rest
}) {
  return <h2 className="mx-auto text-lg text-center">Filter Tickets</h2>;
};
