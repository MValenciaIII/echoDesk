import { WarningIcon } from './Icons';

export default function ErrorMessage({ message }) {
  return (
    <p className="text-red-700">
      <WarningIcon />
      {message}
    </p>
  );
}
