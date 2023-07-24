type ButtonProps = {
  isDisable?: boolean;
  label: string;
  className?: string;
  isLoading?: boolean;
  [x: string]: any;
};
export const Button = ({
  isDisable,
  label,
  className,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${className} flex items-center rounded-medium justify-center ${
        isDisable
          ? "opacity-50 cursor-not-allowed bg-dark-200 text-dark-high"
          : `relative before:z-0  text-dark-high hover:before:bg-light-100/20 bg-dark-200 before:h-full before:w-full before:absolute before:top-0 before:left-0 before:rounded-medium`
      } ${isLoading ? '!text-dark-200' : ''}`}
      disabled={isDisable}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin w-20 h-20 text-light-100 absolute"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 0C10.6497 0 11.1765 0.526724 11.1765 1.17647V4.11765C11.1765 4.76739 10.6497 5.29412 10 5.29412C9.35025 5.29412 8.82353 4.76739 8.82353 4.11765V1.17647C8.82353 0.526724 9.35025 0 10 0Z"
              fill="#ffffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 14.7059C10.6497 14.7059 11.1765 15.2326 11.1765 15.8824V18.8235C11.1765 19.4733 10.6497 20 10 20C9.35025 20 8.82353 19.4733 8.82353 18.8235V15.8824C8.82353 15.2326 9.35025 14.7059 10 14.7059Z"
              fill="#ffffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.93281 2.92497C3.39225 2.46553 4.13715 2.46553 4.59659 2.92497L6.67502 5.0034C7.13446 5.46284 7.13446 6.20774 6.67502 6.66718C6.21558 7.12662 5.47068 7.12662 5.01124 6.66718L2.93281 4.58875C2.47337 4.12931 2.47337 3.38441 2.93281 2.92497Z"
              fill="#ffffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.325 13.325C13.7844 12.8655 14.5293 12.8655 14.9887 13.325L17.0672 15.4034C17.5266 15.8628 17.5266 16.6077 17.0672 17.0672C16.6077 17.5266 15.8628 17.5266 15.4034 17.0672L13.325 14.9887C12.8655 14.5293 12.8655 13.7844 13.325 13.325Z"
              fill="#ffffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 10C0 9.35025 0.526724 8.82353 1.17647 8.82353H4.11765C4.76739 8.82353 5.29412 9.35025 5.29412 10C5.29412 10.6497 4.76739 11.1765 4.11765 11.1765H1.17647C0.526724 11.1765 0 10.6497 0 10Z"
              fill="#ffffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.7059 10C14.7059 9.35025 15.2326 8.82353 15.8824 8.82353H18.8235C19.4733 8.82353 20 9.35025 20 10C20 10.6497 19.4733 11.1765 18.8235 11.1765H15.8824C15.2326 11.1765 14.7059 10.6497 14.7059 10Z"
              fill="#ffffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.67502 13.325C7.13446 13.7844 7.13446 14.5293 6.67502 14.9887L4.59659 17.0672C4.13715 17.5266 3.39225 17.5266 2.93281 17.0672C2.47337 16.6077 2.47337 15.8628 2.93281 15.4034L5.01124 13.325C5.47068 12.8655 6.21558 12.8655 6.67502 13.325Z"
              fill="#ffffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.0672 2.92497C17.5266 3.38441 17.5266 4.12931 17.0672 4.58875L14.9887 6.66718C14.5293 7.12662 13.7844 7.12662 13.325 6.66718C12.8655 6.20774 12.8655 5.46284 13.325 5.0034L15.4034 2.92497C15.8628 2.46553 16.6077 2.46553 17.0672 2.92497Z"
              fill="#ffffff"
            />
          </svg>
          {label}
        </>
      ) : (
        label
      )}
    </button>
  );
};
