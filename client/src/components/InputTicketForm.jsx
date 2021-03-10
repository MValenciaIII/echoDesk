// !NOTE: copied and pasted from here to make forms modular;
import React from 'react';
import { useForm } from 'react-hook-form';

// todo: example top level Form from components:  REVISIT LATER WK - 3/10

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
