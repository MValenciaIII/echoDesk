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
    return (
        <form
        {...restProps}
        className={classNames}
        >
            <button
            type="button"
            className={` mt-3 px-2 py-1 font-bold rounded-md hover:bg-action hover:text-text-base  bg-light-base mx-auto text-text-base-inverted`}
            >
                Click to Add Admin
            </button>
        </form>
    )
}