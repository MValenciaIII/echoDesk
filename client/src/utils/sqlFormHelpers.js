import React from 'react';

// @#  a collection of helper functions for mySql word and value conversions;

export function departmentWordToValue(word) {
  switch (word) {
    case 'Executive Branch':
      return 1;
    case 'Preparedness Branch':
      return 2;
    case 'Mitigation Branch':
      return 3;
    case 'Warehouse Branch':
      return 4;
    case 'Support Services Branch':
      return 5;
    case 'Human Resources Branch':
      return 6;
    case 'Maintenance Branch':
      return 7;
    case 'Recovery Branch':
      return 8;
    case 'Field Services Branch':
      return 9;
    case 'External Affairs Branch':
      return 10;
    case 'Logistics Branch':
      return 11;
    case 'Operations Branch':
      return 12;
    case 'Individual Assistance':
      return 13;
    case 'Information Technology':
      return 14;
    default:
      break;
  }
}

export function departmentIdToValue(val) {
  switch (val) {
    case '1':
      return 'Executive Branch';
    case '2':
      return 'Preparedness Branch';
    case '3':
      return 'Mitigation Branch';
    case '4':
      return 'Warehouse Branch';
    case '5':
      return 'Support Services Branch';
    case '6':
      return 'Human Resources Branch';
    case '7':
      return 'Maintenance Branch';
    case '8':
      return 'Recovery Branch';
    case '9':
      return 'Field Services Branch';
    case '10':
      return 'External Affairs Branch';
    case '11':
      return 'Logistics Branch';
    case '12':
      return 'Logistics Branch';
    case '13':
      return 'Individual Assistance';
    case '14':
      return 'Information Technology';
    default:
      break;
  }
}

export function locationWordToValue(word) {
  switch (word) {
    case 'HQ(Pearl)':
      return 1;
    case 'Warehouse(Byram)':
      return 2;
    case 'Bolton Building (Biloxi)':
      return 3;
    default:
      break;
  }
}

export function locationIdToWord(word) {
  switch (word) {
    case '1':
      return 'HQ(Pearl)';
    case '2':
      return 'Warehouse(Byram)';
    case '3':
      return 'Bolton Building (Biloxi)';
    default:
      break;
  }
}

export function serviceWordValueToNumberValue(word) {
  switch (word) {
    case 'BUILDING':
      return 1;
    case 'IT':
      return 2;
    case 'COMMUNICATIONS':
      return 3;
    case 'GIS':
      return 4;
    case 'EMPLOYEE SETUP':
      return 5;
    case 'WASP INVENTORY SYSTEM':
      return 6;
    case 'SURVEILLANCE CAMERA SYSTEM':
      return 7;
    case 'TRAINING':
      return 8;
    case 'THERMOSCAN ACCOUNT':
      return 9;
    default:
      break;
  }
}

export function serviceIDToWord(val) {
  switch (val) {
    case '1':
      return 'BUILDING';
    case '2':
      return 'IT';
    case '3':
      return 'COMMUNICATIONS';
    case '4':
      return 'GIS';
    case '5':
      return 'EMPLOYEE SETUP';
    case '6':
      return 'WASP INVENTORY SYSTEM';
    case '7':
      return 'SURVEILLANCE CAMERA SYSTEM';
    case '8':
      return 'TRAINING';
    case '9':
      return 'THERMOSCAN ACCOUNT';
    default:
      break;
  }
}

export function subserviceIDToWord(val) {
  switch (val) {
    case '1':
      return 'Building Maintenance';
    case '2':
      return 'Electrical Issues';
    case '3':
      return 'Air Conditioning Issue';
    case '4':
      return 'Safety Issues';
    case '5':
      return 'Email Account';
    case '6':
      return 'Printer Issues';
    case '7':
      return 'Zoom Issues';
    case '8':
      return 'Website Update/Problems';
    case '9':
      return 'Software Issues';
    case '10':
      return 'Computer Issues';
    case '11':
      return 'Telephone Issues';
    case '12':
      return 'Mifi Issues';
    case '13':
      return 'ATHOC';
    case '14':
      return 'Monitor/TV Issues';
    case '15':
      return 'Direct TV Issues';
    case '16':
      return 'Map Requests';
    case '17':
      return 'WebEOC Issues';
    case '18':
      return 'CrisisTrack Issues';
    case '19':
      return 'Special Projects Request';
    case '20':
      return 'New Mema';
    case '21':
      return 'New DR';
    case '22':
      return 'WASP Account Issues';
    case '23':
      return 'WASP Software Issues';
    case '24':
      return 'System Malfunctions';
    case '25':
      return 'Software Access';
    case '26':
      return 'Camera Requests';
    case '27':
      return 'Video Footage Requests';
    case '28':
      return 'Office 365 Training';
    case '29':
      return 'Microsoft TEAMS Training';
    case '30':
      return 'Zoom Training';
    case '31':
      return 'CrisisTrack Training';
    case '32':
      return 'Radio Training';
    case '33':
      return 'MISC Training';
    case '34':
      return 'Photo Access';
    case '35':
      return 'Account Removal';
    default:
      break;
  }
}

export function priorityWordToNumID(word) {
  switch (word) {
    case 'Low':
      return 1;
    case 'Medium':
      return 2;
    case 'High':
      return 3;
    case 'Urgent':
      return 4;
    default:
      break;
  }
}

export function priorityIDtoWord(word) {
  switch (word) {
    case '1':
      return 'Low';
    case '2':
      return 'Medium';
    case '3':
      return 'High';
    case '4':
      return 'Urgent';
    default:
      break;
  }
}

export function statusIdToWord(id) {
  switch (id) {
    case '1':
      return 'Open';
    case '2':
      return 'Pending';
    case '3':
      return 'Resolved';
    case '4':
      return 'Closed';
    default:
      break;
  }
}

// todo: move these to the constants folder to use for refactoring forms;
export function AssignToAgentSelect() {
  return (
    <>
      <option value="">Not yet Assigned</option>
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

export function TicketLocationsOptions() {
  return (
    <>
      <option value="1">HQ - Pearl</option>
      <option value="2">Bolton Building (Biloxi)</option>
      <option value="3">Warehouse (Byram)</option>
    </>
  );
}

// export function getAgentGroup(word) {
//   switch (word) {
//     case 'Low':
//       return 1;
//     case 'Medium':
//       return 2;
//     case 'High':
//       return 3;
//     case 'Urgent':
//       return 4;
//     default:
//       break;
//   }
// }
