import { Button } from "@/components/ui/button";
import { Lock, Zap, Building2, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663599686036/5X5kTwk8346JqMBGvyzKtd/uae-sadad-logo-Q2qeSz6GvuLP5zKPDB42W9.webp"
              alt="سداد الإمارات"
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900">سداد</span>
              <span className="text-xs text-gray-600">الإمارات</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">الخدمات</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">عن البوابة</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">الدعم</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663599686036/5X5kTwk8346JqMBGvyzKtd/uae-payment-hero-2XJZcrb3Zyy2TSA7doAW5o.webp)',
            opacity: 0.15
          }}
        />
        <div className="relative container py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              مرحباً بك في بوابة سداد الإمارات
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              منصة آمنة وموثوقة لسداد فواتيرك الحكومية والخاصة بكل سهولة
            </p>
            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8"
            >
              بدء الخدمة
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-blue-100 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              لماذا تختار بوابة سداد الإمارات؟
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                    <Lock className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">سداد آمن وموثوق</h3>
                  <p className="text-gray-600">جميع معاملاتك محمية بأحدث معايير الأمان والتشفير</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                    <Zap className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">خدمات متعددة</h3>
                  <p className="text-gray-600">سداد الفواتير الحكومية والخدمات والرسوم من مكان واحد</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                    <Smartphone className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">سهولة الاستخدام</h3>
                  <p className="text-gray-600">واجهة بسيطة وسهلة الاستخدام لجميع المستخدمين</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Building2 className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">بنوك موثوقة</h3>
              <p className="text-gray-600">تعاون مع جميع البنوك الإماراتية الرئيسية</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">سداد فوري</h3>
              <p className="text-gray-600">تأكيد فوري للعملية والحصول على الإيصال</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Smartphone className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">متاح دائماً</h3>
              <p className="text-gray-600">استخدم الخدمة في أي وقت ومن أي مكان</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banks Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663599686036/5X5kTwk8346JqMBGvyzKtd/uae-banks-illustration-Je8AskikromQuCQUqBJAeo.webp"
              alt="البنوك الإماراتية والخدمات المالية"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ابدأ رحلتك مع سداد الإمارات اليوم
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            استمتع بتجربة سداد آمنة وسهلة وسريعة لجميع احتياجاتك المالية
          </p>
          <Button 
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8"
          >
            بدء الخدمة الآن
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">عن البوابة</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">من نحن</a></li>
                <li><a href="#" className="hover:text-white">خدماتنا</a></li>
                <li><a href="#" className="hover:text-white">الأخبار</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">الدعم</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-white">تواصل معنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">القانون</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-white">شروط الاستخدام</a></li>
                <li><a href="#" className="hover:text-white">سياسة الأمان</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">تابعنا</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">فيسبوك</a></li>
                <li><a href="#" className="hover:text-white">تويتر</a></li>
                <li><a href="#" className="hover:text-white">إنستجرام</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 بوابة سداد الإمارات. جميع الحقوق محفوظة.</p>
            <p className="mt-2 text-gray-400">منصة آمنة وموثوقة للسداد الإلكتروني</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
