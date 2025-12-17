import { Shield, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-dark overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
             <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 animate-fade-in-up">
            Redefining Mobility in Ethiopia
          </h1>
          <p className="text-xl text-gray-300 animate-fade-in-up delay-100">
            More than just a car rental. We are your partner in every journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        
        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
                { 
                    icon: Target, 
                    title: "Our Mission", 
                    desc: "To solve the transportation gap in Addis Ababa by providing reliable, premium, and accessible vehicles for everyone." 
                },
                { 
                    icon: Shield, 
                    title: "Safety First", 
                    desc: "Every vehicle is rigorously inspected and insured. We prioritize your safety and peace of mind above all else." 
                },
                { 
                    icon: Users, 
                    title: "Customer Centric", 
                    desc: "We believe in building relationships. Our 24/7 support ensures you are never alone on the road." 
                }
            ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                        <item.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {item.desc}
                    </p>
                </div>
            ))}
        </div>

        {/* Founder Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-[500px] md:h-auto relative group">
                    <img 
                        src="/founder.png" 
                        alt="Feben Getachew" 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Feben Getachew</h3>
                            <p className="text-primary-light font-medium">Founder & CEO</p>
                        </div>
                    </div>
                </div>
                <div className="p-12 md:p-16 flex flex-col justify-center bg-white">
                    <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-sm mb-6 w-fit">
                        Leadership
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        Meet the Founder
                    </h2>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Feben Getachew</h3>
                    <p className="text-primary font-medium mb-8">Founder & CEO, Phevon</p>
                    
                    <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                        <p>
                            "I started Phevon with a simple yet powerful vision: to make car rental in Ethiopia as seamless as ordering a meal."
                        </p>
                        <p>
                            Recognizing the difficulty tourists and locals faced in finding reliable, quality vehicles, Feben set out to build a platform that bridges the gap between premium service and accessibility.
                        </p>
                        <p>
                            Today, Phevon stands as a testament to that vision, offering a fleet that ranges from economical city cars to high-end luxury SUVs, all backed by world-class support.
                        </p>
                    </div>
                    
                    
                    <div className="mt-10">
                        <span className="font-signature text-5xl text-gray-800 opacity-80 rotate-[-5deg] block">
                            Feben Getachew
                        </span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
