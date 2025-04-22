export const IconAlertTriangle = ({
  width = 24,
  height = 24,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"
      ></path>
    </svg>
  );
};
