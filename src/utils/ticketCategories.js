import React from 'react';

export default function ticketCategories(mainCategory) {
  switch (mainCategory) {
    case 'Building':
      return <Building />;
    case 'IT':
      return <IT />;
    case 'Communications':
      return <Communications />;
    case 'GIS':
      return <GIS />;
    case 'Employee Setup':
      return <Employee />;

    default:
      break;
  }
}

function Building(props) {
  return (
    <>
      <option value="Maintenance">Maintenance</option>
      <option value="Security">Security</option>
      <option value="Safety">Safety</option>
    </>
  );
}

function IT(props) {
  return (
    <>
      <option value="Email">Email</option>
      <option value="Printer">Printer</option>
      <option value="Zoom">Zoom</option>
      <option value="Website">Website</option>
      <option value="Microsoft">Microsoft</option>
      <option value="Computer">Computer</option>
    </>
  );
}
function Communications(props) {
  return (
    <>
      <option value="Cellphone">Cellphone</option>
      <option value="Telephone">Telephone</option>
      <option value="ATHOC">ATHOC</option>
    </>
  );
}
function GIS(props) {
  return (
    <>
      <option value="MAP">MAP</option>
      <option value="webEOC">webEOC</option>
      <option value="CrisisTrack">CrisisTrack</option>
      <option value="WASP">WASP</option>
    </>
  );
}
function Employee(props) {
  return (
    <>
      <option value="New_Mema">New Mema</option>
      <option value="New_Disaster_Reservist">New Disaster Reservist</option>
    </>
  );
}
