import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-right" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="container flex flex-col items-center">
          <div className="bg-amber-500 p-3 rounded-full mb-2">
            <span className="text-white font-bold text-xl">سداد</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">بوابة سداد الإمارات</h1>
          <p className="text-sm text-gray-500">منصة السداد الإلكترونية الموحدة</p>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow container flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">مرحباً بك في بوابة سداد الإمارات</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            منصة آمنة وموثوقة لسداد فواتيرك الحكومية والخاصة بكل سهولة ويسر. 
            نحن هنا لخدمتك وتسهيل معاملاتك المالية بأعلى معايير الأمان.
          </p>
          <Button 
            onClick={() => setLocation("/user-data")}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xl py-8 px-12 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            بدء الخدمة
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center">
        <p className="text-gray-400 text-sm">© 2024 بوابة سداد الإمارات. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
