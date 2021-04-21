import { WarningIcon } from './Icons';

export default function ErrorMessage({ message }) {
  return (
    <p className="text-warning">
      <WarningIcon />
      {message}
    </p>
  );
}
