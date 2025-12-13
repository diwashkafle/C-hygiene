import { Leaf, ShieldCheck, Sprout, Truck } from 'lucide-react';

const AboutUs = () => {
  const themeColor = '#0C8033';

  const services = [
    {
      title: "सरसफाई तथा स्वच्छता",
      description: "स्वच्छ र स्वस्थ वातावरणका लागि गुणस्तरीय सरसफाईका सामग्रीहरू तथा स्वास्थ्य स्वच्छताका वस्तुहरूको उत्पादन र वितरण।",
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
    },
    {
      title: "प्रांगारिक कृषि उत्पादन",
      description: "माटोको उर्वरा शक्ति बढाउन परम्परागत तथा आधुनिक प्रविधि प्रयोग गरी प्रांगारिक मल र जैविक विषादीहरूको उत्पादन।",
      icon: <Leaf className="w-8 h-8 text-white" />,
    },
    {
      title: "किसानसँग सहकार्य",
      description: "किसानले उत्पादन गरेका कृषिजन्य उत्पादन तथा जडिबुटीहरू खरिद गरी, प्रशोधन तथा प्याकेजिङ गरेर बजारसम्म पुर्‍याउने।",
      icon: <Sprout className="w-8 h-8 text-white" />,
    },
    {
      title: "व्यापार तथा निर्यात",
      description: "नेपालमा उत्पादित खाद्य वस्तुहरूको निर्यात गर्ने तथा कृषि औजार र सरसफाईका लागि आवश्यक कच्चा पदार्थहरूको आयात गर्ने।",
      icon: <Truck className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <section id='about' className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <div 
        className="relative py-20 px-6 text-center"
        style={{ backgroundColor: themeColor }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            सी. हाईजिन इण्डस्ट्रिज प्रा.लि.
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            स्वच्छ जीवन र दिगो कृषिको लागि एक भरपर्दो नाम
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold" style={{ color: themeColor }}>
              हाम्रो उद्देश्य
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              ललितपुर-२८ मा अवस्थित यस कम्पनीको मुख्य उद्देश्य भनेको समुदायलाई स्वस्थ राख्नु र कृषिलाई आधुनिकीकरण गर्नु हो।
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              हामी एकातिर सरसफाईका सामग्रीहरू उत्पादन गरेर स्वच्छ वातावरण निर्माणमा टेवा पुर्‍याउँछौं भने, अर्कोतिर किसानहरूलाई प्रांगारिक मल उपलब्ध गराएर र उनीहरूको कृषि उपज खरिद गरेर कृषि क्षेत्रलाई सबल बनाउँछौं।
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8 h-full flex items-center justify-center">
             <div className="text-center">
                <div className="inline-block p-4 rounded-full mb-4 bg-white shadow-sm">
                  <Sprout size={48} style={{ color: themeColor }} />
                </div>
                <h3 className="text-xl font-semibold">अर्गानिक र स्थानीय उत्पादन</h3>
                <p className="text-gray-500 mt-2">ललितपुर, नेपाल</p>
             </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: themeColor }}>
              हाम्रा सेवा तथा कार्यहरू
            </h2>
            <p className="text-gray-600">
              उद्योगदेखि खेतबारीसम्म, खेतबारीदेखि घरसम्म, हामी हरेक चरणमा तपाईंको साथमा छौं।
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border-t-4"
                style={{ borderColor: themeColor }}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: themeColor }}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;