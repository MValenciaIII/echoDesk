import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';

export default function AgentCreateForm ({
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

    const [isAddingAdmin, setisAddingAdmin] = useState(false)

    React.useEffect(() => {
        if (isSubmitSuccessful) {
          setisAddingAdmin(false);
        }
      }, [isSubmitSuccessful]);
    
      function cancelProfileEdits() {
        if (isAddingAdmin) {
          reset();
          setisAddingAdmin(!isAddingAdmin);
        }
      }

    return (
        <form
        {...restProps}
        className={classNames}
        >
            <button
        type="button" //!IMPORTANT; must have type = button, or otherwise the submit type is automatically given and runs the api call
        className={` mt-3 px-2 py-1 font-bold rounded-md hover:bg-action hover:text-text-base  bg-light-base mx-auto text-text-base-inverted ${
          isAddingAdmin ? 'hidden' : 'block'
        }`}
        onClick={(event) => {
          setisAddingAdmin(!isAddingAdmin);
        }}
      >
        Click to Add Admin
      </button>
      <button
        type="button" //!IMPORTANT; must have type = button, or otherwise the submit type is automatically given and runs the api call
        className={` mt-3 px-2 py-1 font-bold rounded-md hover:bg-action hover:text-text-base  bg-light-base mx-auto text-text-base-inverted ${
          isAddingAdmin ? 'block' : 'hidden'
        }`}
        onClick={(event) => {
          cancelProfileEdits();
        }}
      >
        Cancel 
      </button>
        </form>
    )
}