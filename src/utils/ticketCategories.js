import React from 'react';

//@# this utility file is used for creating coordinated select service forms along with the watch method on react hook forms;  They really make more logical sense to also belong in a constants file so that all of our inputs for select elements live in single place when we need to tweak them in the future;  It wouldn't be a massive reworking, but just changing a number of the imports;   WK 5-4-2021

export function subServiceTypes(mainCategoryId) {
  switch (mainCategoryId) {
    case '1':
      return <Building />;
    case '2':
      return <IT />;
    case '3':
      return <Communications />;
    case '4':
      return <GIS />;
    case '5':
      return <Employee />;
    case '6':
      return <Wasp />;
    case '7':
      return <SurveilanceSystem />;
    case '8':
      return <Training />;
    case '9':
      return <Thermoscan />;
    case '10':
      return <Freshmarket />
    case '11':
      return <Safety />
    case '12':
      return <Documentationscanning />
    default:
      break;
  }
}

function Building(props) {
  return (
    <>
      <option value="1">Maintenance</option>
      <option value="2">Electrical Issues</option>
      <option value="3">Air Conditioning Issue</option>
      <option value="4">Safety Issues</option>
    </>
  );
}

function IT(props) {
  return (
    <>
      <option value="5">Email</option>
      <option value="6">Printer</option>
      <option value="7">Zoom</option>
      <option value="8">Website</option>
      <option value="9">Microsoft</option>
      <option value="10">Computer</option>
      <option value="43">VOIP Phone</option>
      <option value="44">Copier Copy Machine</option>
      <option value="45">Network</option>
    </>
  );
}
function Communications(props) {
  return (
    <>
      <option value="11">Cell</option>
      <option value="12">Mifi Issues</option>
      <option value="13">ATHOC</option>
      <option value="14">Monitors/TV</option>
      <option value="15">Direct TV Issues</option>
    </>
  );
}
function GIS(props) {
  return (
    <>
      <option value="16">Map Requests</option>
      <option value="17">WebEOC Issues</option>
      <option value="18">CrisisTrack</option>
      <option value="19">Special Projects Request</option>
    </>
  );
}
function Employee(props) {
  return (
    <>
      <option value="20">New Mema</option>
      <option value="21">New Disaster Reservist</option>
    </>
  );
}
function Wasp(props) {
  return (
    <>
      <option value="22">WASP Account Issues</option>
      <option value="23">WASP Software Issues</option>
    </>
  );
}

function SurveilanceSystem(props) {
  return (
    <>
      <option value="24">System Malfunctions</option>
      <option value="25">Software Access</option>
      <option value="26">Camera Requests</option>
      <option value="27">Video Footage Requests</option>
    </>
  );
}
function Training(props) {
  return (
    <>
      <option value="28">Office 365 Training</option>
      <option value="29">Microsoft Teams Training</option>
      <option value="30">Zoom Training</option>
      <option value="31">CrisisTrack Training</option>
      <option value="32">Radio Training</option>
      <option value="33">Misc; Training</option>
    </>
  );
}
function Thermoscan(props) {
  return (
    <>
      <option value="34">Photo Access</option>
      <option value="35">Account Removal</option>
    </>
  );
}

function Freshmarket(props) {
  return (
    <>
      <option value="36">Payment Error</option>
      <option value="37">Add Items</option>
      <option value="38">Account Help</option>
    </>
  );
}

function Safety(props) {
  return (
    <>
      <option value="39">Hazard Outside </option>
      <option value="40">Hazard Inside</option>
      <option value="41">Hazard Parking Lot</option>
    </>
  );
}

function Documentationscanning(props) {
  return (
    <>
      <option value="42">Document Error </option>
    </>
  );
}
export function PrimaryServiceCategories() {
  return (
    <>
      <option value="1">Building</option>
      <option value="2">IT</option>
      <option value="3">Communications</option>
      <option value="4">GIS</option>
      <option value="5">Employee Setup</option>
      <option value="6">Wasp Inventory System</option>
      <option value="7">Surveilance Camera System</option>
      <option value="8">Training</option>
      <option value="9">Thermoscan Account</option>
      <option value="10">Freshmarket</option>
      <option value="11">Safety</option>
      <option value="12">Documentation Scanning</option>
    </>
  );
}


export function DepartmentOptions() {
  return (
    <>
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

export function LocationOptions() {
  return (
    <>
      <option value="1">SEOC(Pearl)</option>
      <option value="3">Bolton Building (Biloxi)</option>
      <option value="2">SELOC(Byram)</option>
    </>
  );
}
export function PriorityOptions({ classNames }) {
  return (
    <>
      <option className={classNames} value="1">
        Low
      </option>
      <option className={classNames} value="2">
        Medium
      </option>
      <option className={classNames} value="3">
        High
      </option>
      <option className={classNames} value="4">
        Urgent
      </option>
    </>
  );
}
// export function PriorityOptions() {
//   return (
//     <>
//       <option value="1">Low</option>
//       <option value="2">Medium</option>
//       <option value="3">High</option>
//       <option value="4">Urgent</option>
//     </>
//   );
// }

export function StatusOptions({ classNames }) {
  return (
    <>
      <option className={classNames} value="1">
        Open
      </option>
      <option className={classNames} value="2">
        Pending
      </option>
      <option className={classNames} value="3">
        Resolved
      </option>
      <option className={classNames} value="4">
        Closed
      </option>
    </>
  );
}

export function AgentOptions() {
  return (
    <>
      <option value="">Not yet Assigned</option>
      <option value="1">Alisha Torrence</option>
      <option value="2">Bob Buseck</option>
      <option value="3">Casey Donovan Mott</option>
      <option value="4">Charllieya Smith</option>
      <option value="5">Chris Watts</option>
      <option value="6">Gray Macoy</option>
      <option value="7">James Dear Jr.</option>
      <option value="8">Holly Tran</option>
      <option value="9">Latoya Lofton</option>
      <option value="10">Lenard Brent</option>
      <option value="11">Margarito Valencia</option>
      <option value="12">Preston White</option>
      <option value="13">Scott Davis</option>
      <option value="14">Wesley Edwards</option>
      <option value="15">Brent Bennett</option>
      <option value="16">Donald McDuffey</option>
      <option value="17">Terry Breland</option>
      <option value="18">Lily Victory</option>
      <option value="19">Drew Minga</option>
    </>
  );
}

export function ThirdLevelServiceDetails(secondaryCategoryId) {
  switch (secondaryCategoryId) {
    case '1':
      return <BuildingMaintenanceOptions />;
    case '2':
      return <BuildingElectricalOptions />;
    case '3':
      return <BuildingAirOptions />;
    case '4':
      return null;
    case '5':
      return <ItEmailOptions />;
    case '6':
      return <ItPrinterOptions />;
    case '7':
      return <ItZoomOptions />;
    case '8':
      return <ItWebsiteOptions />;
    case '9':
      return <ItSoftwareOptions />;
    case '10':
      return <ItComputerOptions />;
    default:
      return null;
  }
}

function BuildingMaintenanceOptions() {
  return (
    <>
      {/* Building Maintenance */}
      <option value="1">Door Hardware Issues</option>
      <option value="2">Key Request</option>
      <option value="3">Janitor/Cleaning Request</option>
    </>
  );
}

function BuildingElectricalOptions() {
  return (
    <>
      {/* Electrical Issues */}
      <option value="">Lighting Problems</option>
      <option value="">Switch/Outlet Problems</option>
      <option value="">Power Outage</option>
    </>
  );
}

function BuildingAirOptions() {
  return (
    <>
      {/* Air Conditioning Issues */}
      <option value="">Leak/Condensation Problem</option>
      <option value="">Vent Problem</option>
      <option value="">No AC</option>
    </>
  );
}

function ItEmailOptions() {
  return (
    <>
      {/* Air Conditioning Issues */}
      <option value="">New Account</option>
      <option value="">Name Change</option>
      <option value="">Delete Account</option>
    </>
  );
}
function ItPrinterOptions() {
  return (
    <>
      {/* Air Conditioning Issues */}
      <option value="">Need Toner</option>
      <option value="">Printer Malfunction</option>
      <option value="">Service Request Indication on Device</option>
      <option value="">New Device Install</option>
      <option value="">Scan Folder Install</option>
    </>
  );
}
function ItZoomOptions() {
  return (
    <>
      {/* Air Conditioning Issues */}
      <option value="">Account Problem</option>
      <option value="">Account Request</option>
    </>
  );
}
function ItWebsiteOptions() {
  return (
    <>
      {/* Air Conditioning Issues */}
      <option value="">(www.msema.org) Problem</option>
      <option value="">(my.msema.org) MB3 Problem</option>
      <option value="">(mema.freshdesk.com) Problem</option>
    </>
  );
}
function ItSoftwareOptions() {
  return (
    <>
      {/* Air Conditioning Issues */}
      <option value="">Microsoft O365 Issues</option>
      <option value="">Microsoft Teams Issues</option>
      <option value="">Windows Update Problems</option>
    </>
  );
}
function ItComputerOptions() {
  return (
    <>
      {/* Air Conditioning Issues */}
      <option value="">Monitor Problems</option>
      <option value="">Device will not Power On</option>
      <option value="">Device Compatibility Issue</option>
    </>
  );
}
