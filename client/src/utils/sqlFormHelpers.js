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
