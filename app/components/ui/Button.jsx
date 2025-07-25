export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium bg-orange-600 hover:bg-orange-700 text-white transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
