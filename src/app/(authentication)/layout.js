export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}