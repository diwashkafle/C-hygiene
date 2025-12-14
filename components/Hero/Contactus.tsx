import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import Footer from './Footer';

const ContactPage = () => {
  const themeColor = '#0C8033';

  return (
    <div id='contact' className="min-h-screen flex flex-col font-sans text-gray-800">
      
      <div 
        className="py-16 px-6 text-center text-white"
        style={{ backgroundColor: themeColor }}
      >
        <h1 className="text-4xl font-bold mb-4">सम्पर्क विवरण</h1>
        <p className="text-lg text-green-50 max-w-3xl mx-auto">
          हाम्रो कार्यालय भ्रमण गर्न वा फोन मार्फत सिधा कुराकानी गर्न तलका विवरणहरू प्रयोग गर्नुहोस्।
        </p>
      </div>

      <div className="grow w-full px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-4 bg-green-50 rounded-full mb-4">
                <MapPin className="w-7 h-7" style={{ color: themeColor }} />
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: themeColor }}>
                कार्यालय ठेगाना
              </h3>
              <p className="text-gray-600 leading-relaxed">
                ललितपुर महानगरपालिका<br />
                वडा नं. २८,<br />
                ललितपुर, नेपाल
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-4 bg-green-50 rounded-full mb-4">
                <Phone className="w-7 h-7" style={{ color: themeColor }} />
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: themeColor }}>
                फोन नम्बर
              </h3>
              <a 
                href="tel:+9779851098395" 
                className="text-gray-600 hover:text-green-700 transition-colors text-lg font-medium"
              >
                +९७७ ९८५१०९८३९५
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-4 bg-green-50 rounded-full mb-4">
                <MessageCircle className="w-7 h-7" style={{ color: themeColor }} />
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: themeColor }}>
                ह्वाट्सएप
              </h3>
              <a 
                href="https://wa.me/9779860571937" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-700 transition-colors text-lg font-medium mb-2"
              >
                +९७७ ९८६०५७१९३७
              </a>
              <p className="text-sm text-gray-500">सिधै म्यासेज गर्नुहोस्</p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-4 bg-green-50 rounded-full mb-4">
                <Mail className="w-7 h-7" style={{ color: themeColor }} />
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: themeColor }}>
                इमेल
              </h3>
              <a 
                href="mailto:info.chygiene@gmail.com"
                className="text-gray-600 hover:text-green-700 transition-colors text-sm sm:text-base font-medium break-all"
              >
                info.chygiene@gma<wbr />il.com
              </a>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;