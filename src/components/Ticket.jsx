import React from "react";
import { Link } from "react-router-dom";

function Ticket() {
  return (
  <>
    <div class="main-background">
      <div class="container">
        <div className="grid md:grid-cols-12 gap-2">
          <div class="col-span-12 px-8 pt-6 pb-8 mb-4 flex flex-wrap content-center flex flex-col bg-white shadow-md rounded">
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                Full Name
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="username" type="text" placeholder="Username"/>
           </div>
             <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
              Type
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
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
              Location
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
                <option name="na"> --</option>
                <option name="pearl"> HQ (Pearl)</option>
                <option name="warehouse">Warehouse (Byram)</option>
                <option name="bolton">Bolton Building (Biloxi)</option>
                </select> 
              </label>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
               Contact
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="username" type="text" placeholder=""/>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
               Phone Number
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="phoneNum" type="number" placeholder=""/>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
               Subject
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="username" type="text" placeholder=""/>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
              Service Type
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
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
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
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
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
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
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
                <option name="na"> --</option>
                <option name="maintenance"> Building Maintenance</option>
                <option name="commmunications">Communications</option>
                <option name="gis">GIS</option>
                <option name="info">IT Department</option>
                </select> 
              </label>
           </div>
            <div class="flex items-center justify-between">
            {/* <div><Link>Cancel</Link>
                 <Link> Create</Link>
                 </div> */}
              <button class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white" type="button">
               <div>
                  <Link>Cancel </Link>
                  <Link> Create</Link>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
export default Ticket;
