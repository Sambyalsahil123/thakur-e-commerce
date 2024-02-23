import { Suspense } from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "E-Shop Admin",
  description: "Thakur E-Shop Admin Dashboard",
};
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      <Suspense fallback={<>Loading...</>}>{children}</Suspense>
    </div>
  );
};

export default AdminLayout;
