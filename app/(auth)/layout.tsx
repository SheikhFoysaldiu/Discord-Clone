const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <main>{children}</main>
    </div>
  );
};
export default AuthLayout;
