import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Heart, Lightbulb, Globe, Rocket, Shield, Sparkles, CheckCircle } from "lucide-react";

const Developers = () => {
  const [showNoOpenings, setShowNoOpenings] = useState(false);
  const team = [
    {
      role: "Game Director",
      name: "Adebayo Johnson",
      bio: "15+ years in game development, passionate about showcasing African culture through gaming.",
    },
    {
      role: "Lead Developer",
      name: "Chioma Nwosu",
      bio: "Expert in mobile game optimization and real-time multiplayer systems.",
    },
    {
      role: "Art Director",
      name: "Tunde Okonkwo",
      bio: "Award-winning artist specializing in vibrant, culturally authentic game environments.",
    },
    {
      role: "Sound Designer",
      name: "Folake Adeyemi",
      bio: "Creating authentic Lagos soundscapes that bring the city to life.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Cultural Authenticity",
      description: "We're committed to representing Lagos and Nigerian culture with respect and accuracy.",
      color: "primary",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pushing boundaries in mobile gaming while staying true to our African roots.",
      color: "secondary",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Sharing African stories and experiences with players around the world.",
      color: "accent",
    },
    {
      icon: Code,
      title: "Quality First",
      description: "Delivering a polished, engaging experience that players love.",
      color: "primary",
    },
  ];

  const achievements = [
    { number: "5K+", label: "Downloads" },
    { number: "4.0", label: "App Rating" },
    { number: "50+", label: "Routes" },
    { number: "1K+", label: "Daily Players" },
  ];

  const handleViewOpenings = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNoOpenings(true);
    setTimeout(() => setShowNoOpenings(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* No Openings Notification */}
      {showNoOpenings && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-[0_0_30px_hsl(var(--primary)/0.3)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-black text-foreground">Thank you for your interest!</h4>
                <p className="text-sm text-muted-foreground">
                  Currently no open positions, but we're always looking for talented people.
                </p>
              </div>
            </div>
            <div className="mt-3 text-xs text-primary font-bold">
              Feel free to send your resume to careers@danfohustle.com
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-background to-background"></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                hsl(var(--primary) / 0.1) 35px,
                hsl(var(--primary) / 0.1) 70px
              )`,
            }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-bold text-primary mb-8 animate-pulse-glow">
            <Sparkles className="w-4 h-4" />
            MEET THE TEAM
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 text-glow animate-fade-in">
            Built by <span className="gradient-text">Passionate</span> Creators
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A team of developers, artists, and storytellers dedicated to bringing the spirit of Lagos to mobile gaming.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{achievement.number}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-bold">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-bold text-secondary mb-6">
                <Rocket className="w-4 h-4" />
                OUR JOURNEY
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8">
                The Story Behind <span className="gradient-text">Danfo Hustle</span>
              </h2>
            </div>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Danfo Hustle was born from a simple idea to celebrate the vibrant, chaotic, and beautiful spirit of Lagos through gaming. Our team, comprising talented developers from across Nigeria, came together with a shared vision of creating something unique.
              </p>
              <p>
                We saw the iconic yellow Danfo buses not just as vehicles, but as symbols of resilience, hustle, and the everyday magic of Lagos life. Every route in our game, every character you meet, and every challenge you face is inspired by real experiences on the streets of Lagos.
              </p>
              <p>
                Our mission goes beyond entertainment—we want to showcase African culture, creativity, and innovation to the world. Danfo Hustle is more than a game; it's a love letter to Lagos and all who call it home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-bold text-accent mb-6">
              <Shield className="w-4 h-4" />
              CORE TEAM
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Meet the <span className="gradient-text">Creators</span> at
            </h2>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8">
              <span className="gradient-text">Okilo Integrated Hub</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We are a passionate team dedicated to creating innovative digital experiences that celebrate African culture and creativity.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-12">
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                At Okilo Integrated Hub, we believe in the power of technology to tell authentic African stories. Danfo Hustle is our love letter to Lagos—capturing the energy, resilience, and spirit of millions who navigate the city's streets every day.
              </p>
              <p>
                We're committed to creating games that entertain while celebrating our culture, creating jobs, and inspiring the next generation of African game developers.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-foreground text-center">
              Why We Built <span className="gradient-text">Danfo Hustle</span>
            </h3>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Growing up in Lagos, the yellow Danfo bus was more than just transportation—it was where stories were shared, friendships were formed, and the true pulse of the city could be felt. We wanted to capture that magic in a game.
              </p>
              <p>
                Danfo Hustle represents our commitment to showcasing African creativity and innovation on the global gaming stage. We've poured countless hours into ensuring every detail—from the authentic Lagos slang to the realistic traffic patterns—rings true for anyone who knows and loves this city.
              </p>
              <p>
                This is just the beginning. Through Okilo Integrated Hub, we're building a portfolio of games and digital experiences that celebrate African culture, create opportunities for local talent, and prove that world-class games can come from anywhere.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="bg-background rounded-2xl p-8 border-2 border-border hover:border-primary transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-accent mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"></div>
                <h3 className="text-xl font-black text-foreground text-center mb-2">{member.name}</h3>
                <p className="text-primary text-center text-sm font-bold uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              What We <span className="gradient-text">Stand For</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`bg-${value.color}/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 border-2 border-${value.color}/20 group-hover:shadow-[0_0_30px_hsl(var(--${value.color})/0.3)]`}
                >
                  <value.icon className={`h-10 w-10 text-${value.color}`} />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-purple-950/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Join Our <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of the team shaping the future of African gaming
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleViewOpenings}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all hover:scale-105"
            >
              View Open Positions
            </button>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-border hover:border-primary text-foreground font-bold rounded-lg transition-all"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Developers;