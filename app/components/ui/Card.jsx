export function Card({ children, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl shadow-md p-6 bg-white cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="mt-4 text-gray-700">{children}</div>;
}
