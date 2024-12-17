export function Loading({
  size = 30,
  strokeWidth = 6,
}: {
  size?: number;
  fill?: string;
  dark?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      style={{}}
      className="animate-spin"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        className="stroke-neutral-950 dark:stroke-neutral-50"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth={strokeWidth}
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
}
