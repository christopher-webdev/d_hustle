import { Button } from "@/components/ui/button";
import { Play, Download, Users, Trophy, Facebook, Twitter, Instagram, Youtube, Star, Shield, Zap, MapPin, Volume2, VolumeX, ChevronDown, Award, Gamepad2, Globe, Wind, Sparkles, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";

// No imports for images/video - using public directory paths

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Define image paths (from public folder)
  const gameImages = {
    hero: "/img/img.png",
    gameplay: ["/img/img2.png", "/img/img3.png", "/img/img4.png"],
    features: ["/img/img5.png", "/img/img6.png"],
  };

  const thrillerVideo = "/video/thrill.mp4";

  const platforms = [
    { name: "iOS", available: true, icon: "📱", color: "from-blue-500 to-blue-600" },
    { name: "Android", available: true, icon: "🤖", color: "from-green-500 to-green-600" },
    { name: "PS5", available: true, icon: "🎮", color: "from-indigo-500 to-indigo-600" },
    { name: "Xbox Series X", available: true, icon: "🎯", color: "from-green-600 to-green-700" },
    { name: "Steam", available: true, icon: "💻", color: "from-gray-600 to-gray-700" },
    { name: "Nintendo Switch", available: true, icon: "🎆", color: "from-red-500 to-red-600" },
  ];

  const gameplayScreenshots = [
    { 
      id: 1, 
      title: "Lagos Downtown", 
      src: "/img/img2.png",
      description: "Feel the pulse of Lagos city life",
      category: "City Life"
    },
    { 
      id: 2, 
      title: "Custom Danfo", 
      src: "/img/img3.png",
      description: "Personalize your Danfo with Lagos flair",
      category: "Customization"
    },
    { 
      id: 3, 
      title: "Night Vibes", 
      src: "/img/img4.png",
      description: "Experience Lagos nightlife and culture",
      category: "Night Life"
    },
    { 
      id: 4, 
      title: "Rush Hour", 
      src: "/img/img5.png",
      description: "Navigate the daily hustle of Lagos traffic",
      category: "Gameplay"
    },
  ];

  const features = [
    {
      icon: Crown,
      title: "OPEN WORLD LAGOS",
      description: "Explore every corner of Lagos with unprecedented freedom and detail.",
      color: "from-yellow-400 to-yellow-600",
      highlight: "100+ km²"
    },
    {
      icon: Zap,
      title: "DYNAMIC WEATHER",
      description: "Experience realistic weather patterns from Harmattan to tropical storms.",
      color: "from-blue-400 to-blue-600",
      highlight: "Real-time"
    },
    {
      icon: Users,
      title: "LIVING COMMUNITY",
      description: "Interact with thousands of NPCs with unique AI behaviors and routines.",
      color: "from-purple-400 to-purple-600",
      highlight: "2000+ NPCs"
    },
    {
      icon: Trophy,
      title: "CAREER MODE",
      description: "Build your empire from a single danfo to a transport magnate.",
      color: "from-orange-400 to-orange-600",
      highlight: "50+ Hours"
    },
    {
      icon: Shield,
      title: "CUSTOMIZATION",
      description: "Personalize your vehicles with authentic Lagos style and upgrades.",
      color: "from-green-400 to-green-600",
      highlight: "1000+ Parts"
    },
    {
      icon: MapPin,
      title: "REAL LANDMARKS",
      description: "Visit accurately recreated Lagos landmarks and hidden spots.",
      color: "from-red-400 to-red-600",
      highlight: "50+ Locations"
    },
  ];

  const stats = [
    { value: "10M+", label: "Downloads", icon: Download },
    { value: "4.8★", label: "App Store Rating", icon: Star },
    { value: "2M+", label: "Daily Players", icon: Users },
    { value: "100+", label: "Hours of Gameplay", icon: Gamepad2 },
  ];

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle video load error
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('error', () => {
        setVideoError(true);
        console.error('Video failed to load');
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute w-full h-full object-cover"
              style={{ filter: 'brightness(0.6)' }}
            >
              <source src={thrillerVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div 
              className="absolute w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${gameImages.hero})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20"></div>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute top-32 right-8 z-20 bg-black/50 backdrop-blur-md p-4 rounded-full border border-white/20 hover:border-primary transition-all group"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
          ) : (
            <Volume2 className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
          )}
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-xl border border-white/20 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-sm font-bold text-white tracking-wider">NOW AVAILABLE WORLDWIDE</span>
              </div>

              {/* Game Title */}
              <div>
                <h1 className="text-7xl md:text-8xl font-black">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    DANFO
                  </span>
                  <br />
                  <span className="text-white">HUSTLE</span>
                </h1>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-black"></div>
                    ))}
                  </div>
                  <span className="text-white/80">Join 2M+ players</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-white/90 max-w-xl leading-relaxed">
                Welcome to the most authentic open-world experience set in the heart of Lagos, Nigeria. Live the hustle, build your legacy.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 text-lg px-8 py-6"
                  asChild
                >
                  <a href="/download">
                    <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    PLAY FREE NOW
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 bg-black/30 backdrop-blur-md text-white hover:bg-white/20 text-lg px-8 py-6 group"
                  onClick={() => document.getElementById('gameplay').scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  WATCH GAMEPLAY
                </Button>
              </div>

              {/* Platform Tags */}
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className={`px-4 py-2 rounded-lg bg-gradient-to-r ${platform.color} bg-opacity-20 backdrop-blur-md border border-white/10 text-sm font-bold text-white`}
                  >
                    {platform.icon} {platform.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Featured Image */}
            {/* <div className="hidden lg:block relative animate-fade-in">
              <div className="relative">
                <img
                  src="/img/img6.png"
                  alt="Danfo Hustle Featured"
                  className="rounded-2xl shadow-2xl border-2 border-white/20"
                />
                <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-4">
                    <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">#1</p>
                      <p className="text-sm text-white/60">Top Grossing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {/* <section className="relative bg-gradient-to-b from-black to-gray-900 py-12 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Gameplay Screenshots Section */}
      <section id="gameplay" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                VISUAL
              </span>{" "}
              <span className="text-white">MASTERPIECE</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience Lagos like never before with stunning next-gen graphics
            </p>
          </div>

          {/* Screenshots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {gameplayScreenshots.map((screenshot, index) => (
              <div
                key={screenshot.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedImage(screenshot)}
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-primary transition-all duration-500">
                  <img
                    src={screenshot.src}
                    alt={screenshot.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {screenshot.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2">{screenshot.title}</h3>
                      <p className="text-sm text-gray-300 mt-1">{screenshot.description}</p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="text-white">WORLD-</span>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                CLASS
              </span>
              <br />
              <span className="text-white">FEATURES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-3">{feature.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                  
                  {/* Highlight */}
                  <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <span className="text-sm font-bold text-primary">{feature.highlight}</span>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Lagos */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-white">LIVE THE</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  LAGOS DREAM
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                From the bustling streets of Oshodi to the serene beaches of Lekki, experience the most detailed and vibrant open-world Nigeria has ever seen.
              </p>
              
              <div className="space-y-4">
                {[
                  { label: "Authentic Voice Acting", value: "50+ Characters" },
                  { label: "Real Lagos Radio Stations", value: "10+ Stations" },
                  { label: "Dynamic Day/Night Cycle", value: "24hr Cycle" },
                  { label: "Weather System", value: "4 Seasons" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-white font-bold">{item.label}</span>
                    <span className="text-primary font-black">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img src="/img/img2.png" alt="Lagos Life" className="rounded-2xl border-2 border-white/10 hover:border-primary transition-all duration-300" />
              <img src="/img/img3.png" alt="Lagos Night" className="rounded-2xl border-2 border-white/10 hover:border-primary transition-all duration-300 mt-8" />
              <img src="/img/img4.png" alt="Lagos Traffic" className="rounded-2xl border-2 border-white/10 hover:border-primary transition-all duration-300" />
              <img src="/img/img5.png" alt="Lagos Culture" className="rounded-2xl border-2 border-white/10 hover:border-primary transition-all duration-300 mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/img/img.png"
            alt="Lagos Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-white">START YOUR</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              JOURNEY TODAY
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join millions of players already experiencing the hustle. Download now and begin your legacy in Lagos.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 text-xl px-12 py-8 group"
              asChild
            >
              <a href="/download">
                <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                DOWNLOAD FREE
                <Sparkles className="w-5 h-5 ml-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 bg-black/50 backdrop-blur-md text-white hover:bg-white/20 text-xl px-12 py-8 group"
              onClick={toggleMute}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-6 h-6 mr-3" />
                  UNMUTE TRAILER
                </>
              ) : (
                <>
                  <Volume2 className="w-6 h-6 mr-3" />
                  MUTE TRAILER
                </>
              )}
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>✓ Free to Play</span>
            <span>✓ No Pay-to-Win</span>
            <span>✓ Regular Updates</span>
            <span>✓ Cross-Platform</span>
          </div>
        </div>
      </section>

      {/* Modal for Full Image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full animate-fade-in">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[90vh] rounded-2xl shadow-2xl border-2 border-white/20"
            />
            
            {/* Close Button */}
            <Button
              variant="outline"
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </Button>
            
            {/* Image Info */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;