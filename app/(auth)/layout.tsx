const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <body>{children}</body>
    </div>
  );
};
export default AuthLayout;
