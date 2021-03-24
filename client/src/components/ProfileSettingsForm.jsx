import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
export default function ProfileSettingsForm({
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
    errors,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;
  const [isEditing, setisEditing] = useState(false);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setisEditing(false);
    }
  }, [isSubmitSuccessful, reset]);

  function cancelProfileEdits() {
    if (isEditing) {
      reset();
      setisEditing(!isEditing);
    }
  }

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
                key: child.props.name,
                isEditing,
              },
            })
          : child;
      })}
      <button
        type="button" //!IMPORTANT; must have type = button, or otherwise the submit type is automatically given and runs the api call
        className={` mt-3 px-2 py-1 font-bold rounded-md hover:bg-green-900 hover:text-white  bg-gray-200 mx-auto text-black ${
          isEditing ? 'hidden' : 'block'
        }`}
        onClick={(event) => {
          setisEditing(!isEditing);
        }}
      >
        Edit
      </button>
      <button
        type="button" //!IMPORTANT; must have type = button, or otherwise the submit type is automatically given and runs the api call
        className={`mt-3 px-2 py-1 font-bold rounded-md hover:bg-green-900 hover:text-white  bg-gray-200 mx-auto text-black ${
          isEditing ? 'block' : 'hidden'
        }`}
        onClick={(event) => {
          cancelProfileEdits();
        }}
      >
        Cancel Edits
      </button>
      <input
        className={`mt-3 px-2 py-1 font-bold rounded-md hover:bg-green-900 hover:text-white  bg-gray-200 mx-auto text-black ${
          isEditing ? 'block' : 'hidden'
        }`}
        name="Submit"
        type="submit"
      />
    </form>
  );
}

ProfileSettingsForm.Input = function InputTicketFormInput({
  register,
  name,
  label,
  labelClassNames,
  inputClassNames,
  type,
  errors,
  isEditing,
  ...rest
}) {
  return (
    <React.Fragment>
      <label className={labelClassNames}>
        {label}
        <input
          readOnly={isEditing ? false : true}
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

ProfileSettingsForm.Select = function InputTicketFormSelect({
  label,
  register,
  options,
  name,
  labelClassNames,
  inputClassNames,
  useWatchOptions,
  isEditing,
  ...rest
}) {
  return (
    <label htmlFor={name} className={labelClassNames}>
      {label}
      <select
        disabled={isEditing ? false : true}
        className={inputClassNames}
        name={name}
        ref={register}
        {...rest}
      >
        {options}
      </select>
    </label>
  );
};

ProfileSettingsForm.TextArea = function InputTicketFormTextArea({
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

ProfileSettingsForm.Heading = function InputTicketFormHeading({
  inputClassNames,
  ...rest
}) {
  return (
    <h2 className="mx-auto text-lg font-bold text-center">
      Update your profile settings
    </h2>
  );
};
ProfileSettingsForm.Submit = function InputTicketFormSubmit({
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
