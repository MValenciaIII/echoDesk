// THESE ARE NOT ACTUALLY CALLED ANYWEHRE (5/4/2021);  THIS FILE WAS CREATED WHEN I PLAYED WITH THE REACT SELECT OPTIONS;

export let departmentProfileOptions = [
  { value: '1', label: 'Executive Branch' },
  { value: '2', label: 'Preparedness Branch' },
  { value: '3', label: 'Mitigation Branch' },
  { value: '4', label: 'Warehouse Branch' },
  { value: '5', label: 'Support Services Branch' },
  { value: '6', label: 'Human Resources Branch' },
  { value: '7', label: 'Maintenance Branch' },
  { value: '8', label: 'Recovery Branch' },
  { value: '9', label: 'Field Services Branch' },
  { value: '10', label: 'External Affairs Branch' },
  { value: '11', label: 'Logistics Branch' },
  { value: '12', label: 'Operations Branch' },
  { value: '13', label: 'Individual Assistance' },
  { value: '14', label: 'Information Technology' },
];

export function departmentProfileNamesHelper(num) {
  switch (num) {
    case 1:
      return 'Executive Branch';
    case 2:
      return 'Preparedness Branch';
    case 3:
      return 'Mitigation Branch';
    case 4:
      return 'Warehouse Branch';
    case 5:
      return 'Support Services Branch';
    case 6:
      return 'Human Resources Branch';
    case 7:
      return 'Maintenance Branch';
    case 8:
      return 'Recovery Branch';
    case 9:
      return 'Field Services Branch';
    case 10:
      return 'External Affairs Branch';
    case 11:
      return 'Logistics Branch';
    case 12:
      return 'Operations Branch';
    case 13:
      return 'Individual Assistance';
    case 14:
      return 'Information Technology';
    default:
      break;
  }
}

/* <option value="1">Executive Branch</option>
<option value="2">Preparedness Branch</option>
<option value="3">Mitigation Branch</option>
<option value="4">Warehouse Branch</option>
<option value="5">Support Services Branch</option>
<option value="6">Human Resources Branch</option>
<option value="7">Maintenance Branch</option>
<option value="8">Recovery Branch</option>
<option value="9">Field Services Branch</option>
<option value="10">External Affairs Branch</option>
<option value="11">Logistics Branch</option>
<option value="12">Operations Branch</option>
<option value="13">Individual Assistance</option>
<option value="14">Information Technology</option> */

// { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
