interface ControlErrorProps {
  error?: string;
}

export default function ControlError({ error }: ControlErrorProps) {
  return error ? <p className="italic text-destructive">{error}</p> : null;
}
