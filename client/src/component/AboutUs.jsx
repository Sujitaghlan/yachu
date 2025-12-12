import React from "react";

// React Icons
import { LuLeaf } from "react-icons/lu";
import { FiSearch, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaHandsHelping,
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationCity } from "react-icons/md";

import Mam from "../assets/saroj.jpg";
import logo from "../assets/logo.png";

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">
                About Us
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                We are in the business of trust and transformation. Our company
                is more than a product; it is a trusted, natural solution deeply
                rooted in values. Our motto,{" "}
                <span className="font-semibold">"Quality in Every Detail"</span>{" "}
                is our founding promise, and the gratitude of over 50,000
                satisfied customers is the proof that drives us forward.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <img
                  src={Mam}
                  alt="Our product showcase"
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-800 rounded-lg shadow-md p-2">
                  <img
                    src={logo}
                    alt="Product detail"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <img
                src={Mam}
                alt="Our mission"
                className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-balance">
                Our Mission & Our Promise
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                At the heart of our company lies a simple, powerful mission: to
                harness the ancient wisdom of nature, creating authentic, pure
                natural solutions that restore health, renew confidence, and
                honor our heritage.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                This purpose fuels our ambitious path forward. We are committed
                to transforming 200,000 lives through natural wellness by 2026,
                solidifying our place as nature's trusted wellness champion.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  "Quality in Every Detail"
                </span>{" "}
                is our sacred promise—ensuring every ingredient remains natural,
                effective, and sourced with integrity. Ultimately, our vision
                extends beyond borders; we aspire to share the power of nature
                with the world, establishing ourselves as a global symbol of
                natural effective self-care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-balance">
                Our Story
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                From a passion rooted in transforming hair care solutions, we
                have grown into a trusted name that has changed over 50,000
                lives. With a clear mission: to create an authentic, natural
                solution for hair problems using nature's precious herbs and
                hairdribs.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                Starting with our unique 33-herb formula, we have become a
                beacon of hope for those suffering from hairfall, dandruff,
                baldness, and alopecia. Each success story fuels our commitment
                to quality and effectiveness, making us one of Nepal's most
                trusted natural hair care brands.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Our numbers tell the story: 2 years of dedicated service,
                50,000+ satisfied customers, 33 powerful natural ingredients.
                Countless smiles restored through healthy hair.
              </p>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <img
                src={Mam}
                alt="Our story"
                className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center text-balance">
            Founder of Our Company
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src={Mam}
                  alt="Company founder"
                  className="w-full max-w-sm h-auto rounded-lg shadow-lg object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white dark:bg-[#003366] rounded-lg p-4 shadow-lg">
                  <p className="text-sm font-semibold text-foreground text-[#FFFFFF]">
                    Founder & Visionary
                  </p>
                  <p className="text-xs text-muted-foreground text-[#FFFFFF]">
                    Natural Care Pioneer
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Meet the Visionary
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                Born with a deep respect for nature's ancient traditions and
                driven by a passion to solve modern hair care challenges, our
                founder envisioned creating a product that would blend
                traditional wisdom with contemporary manufacturing excellence.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                With years of dedicated research and collaboration with
                traditional herbalists, the founder developed a proprietary
                blend of 33 natural herbs—the essence of centuries-old remedies.
                This dedication to quality and authenticity has positioned our
                brand as a household name for those seeking effective, natural
                solutions.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                <span className="font-semibold text-foreground">
                  Key Achievements:
                </span>
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Successfully developed a proprietary blend of 33 natural herbiniduts",
                  "Created a sustainable supply chain supporting local herb collectors",
                  "Built a state-of-the-art manufacturing facility in Nepal",
                  "Helped over 50,000 customers overcome hair challenges",
                ].map((achievement, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-muted-foreground text-base md:text-lg">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                "At the core of our mission is the belief in the power of
                nature. Every bottle carries the essence of Nepal's heritage,
                crafted with care to bring health and vitality to your hair. We
                stand behind our product because we've seen the results it
                delivers, transforming not just hair but the confidence of our
                customers."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg">
              These principles guide every decision we make and define who we
              are as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Natural & Authentic",
                description:
                  "We believe in the power of nature. Every ingredient is carefully sourced from Nepal's heritage to ensure authenticity and purity.",
                icon: <LuLeaf className="text-4xl" />,
              },
              {
                title: "Transparency",
                description:
                  "We're honest about what goes into our products. No hidden chemicals, no compromises—just pure, natural solutions.",
                icon: <FiSearch className="text-4xl" />,
              },
              {
                title: "Community First",
                description:
                  "Supporting local farmers and communities is at our core. We create sustainable supply chains that benefit everyone.",
                icon: <FaHandsHelping className="text-4xl" />,
              },
              {
                title: "Quality Promise",
                description:
                  "Each bottle is crafted with meticulous care. We ensure the highest standards in every step of production.",
                icon: <FaStar className="text-4xl" />,
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-[#F8F9FA] p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-4 text-gray-700">{value.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-green">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Satisfied Customers" },
              { number: "33", label: "Natural Herbs & Ingredients" },
              { number: "2+", label: "Years of Dedicated Service" },
              { number: "200,000+", label: "Lives Transformed by 2026" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.number}
                </div>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-background bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg">
              Talented individuals united by a passion for natural wellness and
              customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ujiwol Manandhar",
                role: "Founder & CEO",
                image: Mam,
              },
              {
                name: "Sarah Chen",
                role: "Head of Operations",
                image: Mam,
              },
              {
                name: "Raj Patel",
                role: "Head of Research & Development",
                image: Mam,
              },
              {
                name: "Maya Kumar",
                role: "Head of Marketing",
                image: Mam,
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 md:py-24 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Locations
            </h2>
            <p className="text-muted-foreground text-lg">
              Rooted in Nepal, serving customers worldwide with authentic
              natural solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {[
              {
                country: "Nepal",
                city: "Kathmandu",
                address: "Yachu Headquarters, Kathmandu",
                coordinates: { lat: 27.7172, lng: 85.324 },
              },
              {
                country: "Nepal",
                city: "Pokhara",
                address: "Yachu Manufacturing Facility",
                coordinates: { lat: 28.2096, lng: 83.9856 },
              },
            ].map((location, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {location.city}, {location.country}
                </h3>
                <p className="text-muted-foreground mb-4">{location.address}</p>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {location.coordinates.lat}°N
                  </span>
                  <span>{location.coordinates.lng}°E</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5047969699!2d85.32403!3d27.717164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307bacc7%3A0xb5137c1bf59db4c1!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1234567890"
              title="Company Location Map"
            />
          </div>

          <div className="mt-8 bg-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Visit Us
            </h3>
            <p className="text-muted-foreground mb-4">
              We welcome customers, partners, and wellness enthusiasts to visit
              our facilities in Nepal. Experience our commitment to quality and
              natural wellness firsthand.
            </p>
            <a
              href="https://maps.app.goo.gl/dYVS1d8oDguJzz7g9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get In Touch
              </h2>
              <p className="text-muted-foreground text-lg">
                Have questions? We'd love to hear from you. Reach out to our
                team anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Email */}
              <div className="text-center flex flex-col items-center">
                <div className="text-3xl mb-4">
                  <FiMail />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:info@yachu.com"
                  className="text-primary hover:underline"
                >
                  info@yachu.com
                </a>
              </div>

              {/* Phone */}
              <div className="text-center flex flex-col items-center">
                <div className="text-3xl mb-4">
                  <FiPhone />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                <a
                  href="tel:+977-1-1234567"
                  className="text-primary hover:underline"
                >
                  +977-1-1234567
                </a>
              </div>

              {/* Address */}
              <div className="text-center flex flex-col items-center">
                <div className="text-3xl mb-4">
                  <MdLocationCity />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Address</h3>
                <p className="text-muted-foreground">Kathmandu, Nepal</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="bg-[#003366] p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4 text-[#FFFFFF]">
                Follow Us
              </h3>
              <div className="flex justify-center gap-6 text-2xl text-[#FFFFFF]">
                <a href="#" className="hover:text-[#F8F9FA]/80">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-[#F8F9FA]/80">
                  <FaXTwitter />
                </a>
                <a href="#" className="hover:text-[#F8F9FA]/80">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-[#F8F9FA]/80">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
