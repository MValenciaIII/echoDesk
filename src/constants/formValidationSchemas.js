import * as yup from 'yup';

// FOUND ON THE INTERNET...  I THINK IT BASICALLY VALIDATES 7 OR 10 DIGIT NUMBERS
export const phoneValidationRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

//SUPPORTED FORMATS FOR FILES
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

//READ THE YUP DOCUMENTATION TO SEE HOW THESE WORK... GET CALLED BEOFRE SUBMISSION ON FORM SUBMISSIONS
export const profileSchema = yup.object().shape({
  fname: yup
    .string()
    .required('First name is required')
    .trim()
    .max(25, 'The max length is 25'),
  lname: yup
    .string()
    .required('Last name is required')
    .trim()
    .max(25, 'The max length is 25'),
  title: yup.string().required('Title is required').trim().max(25),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required')
    .trim()
    .max(35),
  department_id: yup.string().required(),
  location_id: yup.string().required(),
  mobile_phone: yup
    .string()
    .required()
    .trim()
    .matches(phoneValidationRegex, 'Must be a valid phone'),
  office_phone: yup
    .string()
    .required()
    .trim()
    .matches(phoneValidationRegex, 'Must be a valid phone number'),
  //https://stackoverflow.com/questions/52483260/validate-phone-number-with-yup
});

// ! For inputting Tickets
export const inputTicketSchema = yup.object().shape({
  client_full_name: yup
    .string()
    .required('Full Name is required')
    .trim()
    .max(45, 'The max length is 45'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required')
    .trim()
    .max(35),
  department_id: yup.number().required('Department is required'),
  location_id: yup.number().required('Location is required'),
  client_phone_number: yup
    .string()
    .required('Phone number is required')
    .trim()
    .matches(phoneValidationRegex, 'Must be a valid phone'),
  //https://stackoverflow.com/questions/52483260/validate-phone-number-with-yup
  subject: yup.string().required('Subject is required').trim().max(55),
  service_id: yup.number().required('Service Type is required'),
  service_details_id: yup.number().required('Subservice type is required'),
  priority_id: yup.number().required('Priority is required'),
  description: yup
    .string()
    .required('A brief description of your problem is required')
    .trim()
    .max(1000),
  files: yup
    .mixed()
    .test(
      'length',
      'The max number of files is 3',
      (value) => value.length <= 3
    )
    .test(
      'fileFormat',
      'Unsupported Format; Must be an image of JPG, PNG type',
      function checkType(fileList) {
        let filesArr = [...fileList];
        return filesArr.every((file) => SUPPORTED_FORMATS.includes(file.type));
      }
    ),
});
