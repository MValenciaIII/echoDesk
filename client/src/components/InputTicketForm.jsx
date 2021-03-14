// !NOTE: copied and pasted from here to make forms modular;
// todo: modularize from here;  Tickets filter on the agent side is built like this at the moment:  https://react-hook-form.com/advanced-usage#SmartFormComponent;

import React from 'react';
import { useForm } from 'react-hook-form';

// export default function App() {
//   const onSubmit = data => console.log(data);

//   return (
//     <Form onSubmit={onSubmit}>
//       <Input name="firstName" />
//       <Input name="lastName" />
//       <Select name="gender" options={["female", "male", "other"]} />

//       <Input type="submit" value="Submit" />
//     </Form>
//   );
// }

export function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

export function Input({ register, name, ...rest }) {
  return <input name={name} ref={register} {...rest} />;
}

export function Select({ register, options, name, ...rest }) {
  return (
    <select name={name} ref={register} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
