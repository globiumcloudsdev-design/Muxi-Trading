import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from '../common/WhatsAppFloat';
import DiscountModal from '@/components/common/DiscountModal';

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="animate-page-enter relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.10),transparent_40%)] animate-gradient-drift" />
        <div className="relative">{children}</div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <DiscountModal />
    </>
  );
}
