import React from 'react';

export default function subServiceTypes(mainCategoryId) {
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
    </>
  );
}
function Communications(props) {
  return (
    <>
      <option value="11">Telephone</option>
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
