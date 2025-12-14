import AdminLogin from '@/components/Admin/sign-in'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | C. Hygiene Industries',
  description: 'Secure admin access portal',
};

export default function LoginPage() {
  return <AdminLogin />;
}