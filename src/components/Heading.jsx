export default function Heading({ children, size = "lg", className = "" }) {
  const sizes = {
    sm: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl",
  };

  return (
    <h2 className={`${sizes[size]} font-bold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
}
