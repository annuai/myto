export function Sk({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl ${className}`}
      style={{ background: "rgba(0,0,0,0.07)" }}
    />
  );
}
