
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Award, TrendingUp } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Trust & Transparency",
      description: "We believe in complete transparency in all our dealings and maintain the highest standards of trust."
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. We prioritize their financial goals above all."
    },
    {
      icon: <Award className="h-12 w-12 text-purple-600" />,
      title: "Excellence",
      description: "We strive for excellence in service delivery and continuously improve our offerings."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-orange-600" />,
      title: "Growth Focused",
      description: "We help our clients achieve their financial goals through strategic investment planning."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Equisculpt Ventures</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in mutual fund investments, helping Indians build wealth through smart investment choices.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a mission to make mutual fund investing accessible to every Indian, Equisculpt Ventures has been helping individuals and families achieve their financial goals through systematic investment planning.
              </p>
              <p className="text-gray-600 mb-4">
                We understand that investing can be overwhelming, which is why we've simplified the process and made it more rewarding with our unique gift card program.
              </p>
              <p className="text-gray-600">
                Our team of financial experts carefully curates investment options and provides personalized guidance to help you make informed decisions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎁 Our Unique Promise</h3>
              <p className="text-gray-700 text-lg">
                We reward your investment journey with <strong>0.2% of your equity mutual fund investments</strong> as gift cards every year - our way of saying thank you for trusting us with your financial future.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Equisculpt Ventures?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="opacity-90">Professional advice from certified financial experts</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Reward Program</h3>
              <p className="opacity-90">Earn 0.2% gift cards on your equity investments annually</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Regular Funds</h3>
              <p className="opacity-90">Access to all major mutual fund schemes with professional support</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
