import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieSettingsButton from '@/components/ui/CookieSettingsButton';

export default function WebsiteLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <CookieSettingsButton />
        </div>
    );
}