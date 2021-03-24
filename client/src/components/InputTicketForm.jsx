import React from 'react';
import { useForm } from 'react-hook-form';
import { subServiceTypes } from '../utils/ticketCategories';
import ErrorMessage from '../components/ErrorMessage';
export default function InputTicketForm({
  children,
  onSubmit,
  classNames,
  defaultValues,
  resolver,
  ...restProps
}) {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver,
  });
  const {
    handleSubmit,
    watch,
    errors,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;
  const mainServicetype = watch('service_id', '1');

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...defaultValues });
    }
  }, [defaultValues, isSubmitSuccessful, reset]);

  return (
    //onSubmit will be invoked from parent when form and inputs are put together;
    <form
      {...restProps}
      className={classNames}
      onSubmit={handleSubmit(onSubmit)}
    >
      {React.Children.map(children, (child) => {
        return child && child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                errors,
                mainServicetype,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
}

InputTicketForm.Input = function InputTicketFormInput({
  register,
  name,
  label,
  labelClassNames,
  inputClassNames,
  type,
  watch,
  errors,
  mainServicetype, //ERR message since spreading on restprops onto dom and mainservice type is not an html prop.  Hence destructuring off here to avoid that err;
  ...rest
}) {
  return (
    <React.Fragment>
      <label className={labelClassNames}>
        {label}
        <input
          name={name}
          ref={register}
          {...rest}
          className={inputClassNames}
        />
      </label>
      {errors[name]?.message && <ErrorMessage message={errors[name].message} />}
    </React.Fragment>
  );
};

InputTicketForm.Select = function InputTicketFormSelect({
  label,
  register,
  options,
  name,
  labelClassNames,
  inputClassNames,
  useWatchOptions,
  mainServicetype, //ERR message since spreading on restprops onto dom and mainservice type is not an html prop.  Hence destructuring off here to avoid that err;
  ...rest
}) {
  function whichOptions() {
    if (useWatchOptions) {
      return subServiceTypes(mainServicetype);
    } else {
      return options;
    }
  }

  return (
    <label htmlFor={name} className={labelClassNames}>
      {label}
      <select className={inputClassNames} name={name} ref={register} {...rest}>
        {whichOptions()}
      </select>
    </label>
  );
};

InputTicketForm.TextArea = function InputTicketFormTextArea({
  register,
  name,
  label,
  labelClassNames,
  errors,
  ...rest
}) {
  return (
    <React.Fragment>
      <label className={labelClassNames}>
        {label}
        <textarea
          name={name}
          ref={register}
          className={'block p-2 text-black py-0.5 px-1'}
          cols="38"
          rows="5"
        />
      </label>
      {errors[name]?.message && <ErrorMessage message={errors[name].message} />}
    </React.Fragment>
  );
};

InputTicketForm.Heading = function InputTicketFormHeading({
  inputClassNames,
  ...rest
}) {
  return (
    <h2 className="mx-auto text-lg font-bold text-center">Submit a Ticket</h2>
  );
};
InputTicketForm.Submit = function InputTicketFormSubmit({
  name,
  classNames,
  register,
  ...rest
}) {
  return (
    <input
      ref={register}
      name={name}
      type="submit"
      className={classNames}
      value="Submit"
    />
  );
};
