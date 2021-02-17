import React from "react";
import {useForm} from "react-hook-form"
import { Link } from "react-router-dom";

function TicketCreate() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(JSON.stringify(data));
  return (
  <>
<form onSubmit={handleSubmit(onSubmit)}>
    <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2">
            Full Name
        </label>
         <input  name="Full Name" ref={register}  type="text" class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" placeholder="Full Name"/>
    </div>
    <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2"> 
            Type
            <select name="Type" ref={register} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
            <option name="na"> --</option>
            <option name="executive"> Executive</option>
            <option name="preparedness">Preparedness</option>
            <option name="mitigation">Mitigation</option>
            <option name="warehouse">Warehouse</option>
            <option name="support">Support Services</option>
            <option name="human">Human Resources</option>
            <option name="maintenance">Maintenance</option>
            <option name="recovery">Recovery</option>
            <option name="field">Field Services</option>
            <option name="external">External Affairs</option>
            <option name="logistics">Logistics</option>
            <option name="operations">Operations</option>
            <option name="assistance">Individual Assistance</option>
            <option name="technolog">Information Technology</option>
            </select> 
        </label>
    </div>
     <div class="mb-4">
        <label  class="block text-grey-darker text-sm font-bold mb-2"> 
        Location
        <select name= "Location" ref={register} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
        <option name="na"> --</option>
        <option name="pearl"> HQ (Pearl)</option>
        <option name="warehouse">Warehouse (Byram)</option>
        <option name="bolton">Bolton Building (Biloxi)</option>
        </select> 
        </label>
     </div>
     <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2">
        Contact
        </label>
        <input name= "Contact" ref={register} type="text" class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" placeholder=""/>
     </div>
    <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2">
        Phone Number
        </label>
        <input name ="Phone Number" ref={register} type="number" class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" placeholder=""/>
    </div>
    <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2">
        Subject
        </label>
        <input name ="Subject" ref={register} type="text" class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker"  placeholder=""/>
    </div>
    <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
        Service Type
        <select  name = "Service Type" ref={register} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
        <option name="na"> --</option>
        <option name="executive"> Executive</option>
        <option name="preparedness">Preparedness</option>
        <option name="mitigation">Mitigation</option>
        <option name="warehouse">Warehouse</option>
        <option name="support">Support Services</option>
        <option name="human">Human Resources</option>
        <option name="maintenance">Maintenance</option>
        <option name="recovery">Recovery</option>
        <option name="field">Field Services</option>
        <option name="external">External Affairs</option>
        <option name="logistics">Logistics</option>
        <option name="operations">Operations</option>
        <option name="assistance">Individual Assistance</option>
        <option name="technolog">Information Technology</option>
        </select> 
        </label>
    </div>
    <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
        Status
        <select  name="Status" ref={register} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
        <option name="na"> Open</option>
        <option name="pending"> Pending</option>
        <option name="resolved">Resolved</option>
        <option name="closed">Closed</option>
        </select> 
        </label>
    </div>
    <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
        Priority
        <select name ="Priority" ref={register} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" >
        <option name="na"> Low</option>
        <option name="medium"> Medium</option>
        <option name="high">High</option>
        <option name="urgent">Urgent</option>
        </select> 
        </label>
    </div>
    <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
        Group
        <select name="Group" ref={register} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
        <option name="na"> --</option>
        <option name="maintenance"> Building Maintenance</option>
        <option name="commmunications">Communications</option>
        <option name="gis">GIS</option>
        <option name="info">IT Department</option>
        </select> 
        </label>
    </div>
        <Link to="/dashboard" >     </Link>  
        <input type="submit" class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white" />
    </form>
  </>
  );
}
export default TicketCreate;