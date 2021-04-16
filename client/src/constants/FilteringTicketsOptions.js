import React, { useContext } from 'react';
import { UserContext } from '../context/dbUserContext';

export function FilterLocationOptions() {
  return (
    <>
      <option value="">Any</option>
      <option value="1">HQ(Pearl)</option>
      <option value="2">Bolton Building (Biloxi)</option>
      <option value="3">Warehouse(Byram)</option>
    </>
  );
}
export function FilterPriorityOptions() {
  return (
    <>
      <option value="">Any</option>
      <option value="1">Low</option>
      <option value="2">Medium</option>
      <option value="3">High</option>
      <option value="4">Urgent</option>
    </>
  );
}
export function FilterDepartmentOptions() {
  return (
    <>
      <option value="">Any</option>
      <option value="1">Executive</option>
      <option value="2">Preparedness</option>
      <option value="3">Mitigation</option>
      <option value="4">Warehouse</option>
      <option value="5">Support Services</option>
      <option value="6">Human Resources</option>
      <option value="7">Maintenance</option>
      <option value="8">Recovery</option>
      <option value="9">Field Services</option>
      <option value="10">External Affairs</option>
      <option value="11">Logistics</option>
      <option value="12">Operations</option>
      <option value="13">Individual Assistance</option>
      <option value="14">Information Technology</option>
    </>
  );
}

export function FilterPrimaryServiceCategories() {
  return (
    <>
      <option value="">Any</option>
      <option value="1">Building</option>
      <option value="2">IT</option>
      <option value="3">Communications</option>
      <option value="4">GIS</option>
      <option value="5">Employee Setup</option>
      <option value="6">Wasp Inventory System</option>
      <option value="7">Surveilance Camera System</option>
      <option value="8">Training</option>
      <option value="9">Thermoscan Account</option>
    </>
  );
}
export function FilterAgentOptions() {
  // todo: remove  when needed
  // ;
  const { mysqlUser } = useContext(UserContext);

  let currentAgent = mysqlUser && mysqlUser.agent_id ? mysqlUser.agent_id : '';
  return (
    <>
      <option value="">Any</option>
      {/* todo: create Assigned to me value that at submit fills value with currently loggedin Mysql user */}
      <option value={currentAgent}>Assigned to Me</option>
      <option value="1">Alisha Torrence</option>
      <option value="2">Bob Buseck</option>
      <option value="3">Casey Donovan Mott</option>
      <option value="4">Charllieya Smith</option>
      <option value="5">Chris Watts</option>
      <option value="6">James Dear Jr.</option>
      <option value="7">James Montgomery</option>
      <option value="8">Latoya Lofton</option>
      <option value="9">Lenard Brent</option>
      <option value="10">Marti Calhoun</option>
      <option value="11">Preston White</option>
      <option value="12">Scott Davis</option>
      <option value="13">Wesley Edwards</option>
    </>
  );
}

export function FilterStatusOptions() {
  return (
    <>
      <option value="">Any</option>
      <option value="1">Open</option>
      <option value="2">Pending</option>
      <option value="3">Resolved</option>
      <option value="4">Closed</option>
    </>
  );
}

export function FilterCreatedAtDate() {
  return (
    <>
      <option value="1 Day">1 Day</option>
      <option value="7 Day">1 Week</option>
      <option value="14 Day">2 Weeks</option>
      <option value="1 Month">1 Month</option>
      <option value="3 Month">3 Month</option>
      <option value="6 Month">6 Month</option>
      <option value="12 Month">1 Year</option>
      <option value="5 Year">5 Year</option>
    </>
  );
}
