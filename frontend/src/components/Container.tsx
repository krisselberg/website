interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`w-full px-8 md:px-12 lg:px-16 ${className}`}>
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}
