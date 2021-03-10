import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../context/dbUserContext';
import SubServiceType from '../utils/ticketCategories';
import { WarningIcon } from './Icons';
import {
  departmentWordToValue,
  locationWordToValue,
  priorityWordToNumID,
  serviceDetailsWordToNumId,
} from '../utils/sqlFormHelpers';

export default function TicketForm({
  children,
  handleSubmit,
  onSubmit,
  ...restProps
}) {
  return <form className="classnames" onSubmit={handleSubmit(onSubmit)}></form>;
}

TicketForm.Header = function TicketFormHeader({ children, ...restProps }) {
  return (
    <h2
      {...restProps}
      className="mx-auto mb-2 text-2xl font-bold text-white max-w-max"
    >
      {children}
    </h2>
  );
};

TicketForm.Header = function TicketFormHeader({ children, ...restProps }) {
  return (
    <h2
      {...restProps}
      className="mx-auto mb-2 text-2xl font-bold text-white max-w-max"
    >
      {children}
    </h2>
  );
};

TicketForm.Input = function TicketFormInput({...restProps }) {
	return (
	  <label>
		  {labelText}
		  <input type={type} defaultValue={defaultValue} name={name} placeholder={placeholder} ref={register(registerOptions)} className='mx-auto mb-2 text-2xl font-bold text-white max-w-max'/>
	  </label>
	  >
		
	
	);
  };