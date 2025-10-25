export default function Paragraph({ children, size = "md", className = "" }) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <p className={`${sizes[size]} mt-2 text-gray-600 ${className}`}>
      {children}
    </p>
  );
}
