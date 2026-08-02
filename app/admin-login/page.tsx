import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdminLoginForm } from '@/components/ui/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <div className="glass rounded-xl p-6">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Admin
          </p>
          <h1 className="font-display text-2xl text-blue-dark mb-4">Admin login</h1>
          <AdminLoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
