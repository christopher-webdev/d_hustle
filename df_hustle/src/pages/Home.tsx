import { Button } from "@/components/ui/button";
import { Play, Download, Users, MapPin, Volume2, VolumeX, Cpu, Wrench, Sword, Trophy, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";

// ─── Reusable Show More / Show Less toggle ───────────────────────────────────
const ShowMore = ({
  children,
  label = "Read More",
}: {
  children: React.ReactNode;
  label?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <div
        style={{ maxHeight: open ? "9999px" : "0px", overflow: "hidden", transition: "max-height 0.7s ease-in-out, opacity 0.5s ease-in-out", opacity: open ? 1 : 0 }}
      >
        <div className="pt-1">{children}</div>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-yellow-400 font-black text-sm uppercase tracking-widest hover:text-yellow-300 transition-colors"
      >
        <span>{open ? "Show Less" : label}</span>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const Home = () => {
  const [isMuted, setIsMuted]           = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [videoError, setVideoError]     = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── video paths — rename your files to match ─────────────────────────────
  const thrillerVideo  = "/video/thrill.mp4";     // hero background
  const lagosMapVideo  = "/video/lagos_map.mp4";  // Lagos map section
  const thrillerVideo2 = "/video/thriller2.mp4";  // cinematic section

  const platforms = [
    { name: "iOS",     icon: "📱", color: "from-blue-500 to-blue-600"   },
    { name: "Android", icon: "🤖", color: "from-green-500 to-green-600" },
  ];

  const gameplayScreenshots = [
    { id: 1, title: "Lagos Downtown",      src: "/img/img2.png", description: "Feel the pulse of Lagos city life",           category: "City Life"  },
    { id: 2, title: "Jailbreak the Danfo", src: "/img/img3.png", description: "Upgrade your bus into a weapon",              category: "Upgrades"   },
    { id: 3, title: "Night Ops",           src: "/img/img4.png", description: "Run missions after dark",                     category: "Night Life" },
    { id: 4, title: "Rush Hour",           src: "/img/img5.png", description: "Navigate the daily hustle of Lagos traffic",  category: "Gameplay"   },
    { id: 5, title: "Street Politics",     src: "/img/img6.png", description: "Outsmart agberos, police, and fuel crises",   category: "Street Life" },
    { id: 6, title: "Character Moments",   src: "/img/img7.png", description: "Meet your crew and the colorful characters of Lagos", category: "Characters" }
  ];

  const features = [
    { icon: Sword,  title: "STORY-DRIVEN MISSIONS",   description: "Take on the role of Tobi Adekunle — engineer, driver, system breaker — and expose TransGlobe Mobility's syndicate.",          color: "from-yellow-400 to-orange-500", highlight: "Full Narrative" },
    { icon: Wrench, title: "JAILBREAK YOUR DANFO",    description: "Turn your late father's rusty bus into a weapon. EMP bursts, stealth coatings, route upgrades and more.",                     color: "from-orange-400 to-red-500",    highlight: "50+ Upgrades"   },
    { icon: Cpu,    title: "AI SURVEILLANCE NETWORK", description: "TransGlobe's AI buses and LASMA cameras hunt you. Outsmart the system or get swallowed by it.",                               color: "from-blue-400 to-blue-600",     highlight: "Real-time AI"   },
    { icon: Users,  title: "BUILD YOUR CREW",         description: "Recruit Kofi, Ijeaku, Didi, and Baba Oro — each with unique street abilities to help you bring the syndicate down.",           color: "from-purple-400 to-purple-600", highlight: "5 Characters"   },
    { icon: MapPin, title: "EXPLORE LASGIDI",         description: "From Oshodi to Yaba, CMS to Surulere — a hyper-stylized Lagos full of motor parks, no-go zones, and hidden districts.",       color: "from-green-400 to-green-600",   highlight: "50+ Routes"     },
    { icon: Trophy, title: "STREET POLITICS",         description: "Navigate agberos, police seizures, fuel crises, and broken-down buses. Failure has consequences here.",                       color: "from-red-400 to-red-600",       highlight: "No Excuses"     },
  ];

  const characters = [
    { name: "Tobi Adekunle",     role: "The Wheelman",   ability: "Jailbreak Tech — EMP / Stealth",       bio: "Engineer. Driver. System Breaker. Framed by TransGlobe and forced back to the streets — armed with his father's Danfo and one notebook full of rebellion.", color: "from-yellow-400 to-orange-500", image: "/img/tobi.png" },
    { name: "Kofi 'Iron Teeth'", role: "The Enforcer",   ability: "Durability Boost / Intimidation",      bio: "Street muscle with iron resolve. When negotiations fail, Kofi handles the rest.",                                                                             color: "from-red-500 to-red-700",       image: null            },
    { name: "Ijeaku",            role: "The Intel",      ability: "Mission Unlock / Server Tracking",     bio: "Investigative journalist turned undercover operator. Every move TransGlobe makes, she knows before they do.",                                                 color: "from-blue-400 to-blue-600",     image: null            },
    { name: "Didi",              role: "The Garage Girl",ability: "Vehicle Durability & Repair Bonuses",  bio: "Garage-raised and mechanically gifted. She turns scrap into speed and broken buses into battle-ready machines.",                                              color: "from-purple-400 to-purple-600", image: "/img/didi.png" },
  ];

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.addEventListener("error", () => setVideoError(true));
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {!videoError ? (
            <video ref={videoRef} autoPlay loop muted={isMuted} playsInline
              className="absolute w-full h-full object-cover" style={{ filter: "brightness(0.55)" }}>
              <source src={thrillerVideo} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/img/img.png)" }}>
              <div className="absolute inset-0 bg-black/60" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20" />
        </div>

        <button onClick={toggleMute}
          className="absolute top-32 right-8 z-20 bg-black/50 backdrop-blur-md p-4 rounded-full border border-white/20 hover:border-yellow-400 transition-all group"
          aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted
            ? <VolumeX className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
            : <Volume2  className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />}
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 mt-20">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-400/20 backdrop-blur-xl border border-yellow-400/40 rounded-full">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-sm font-black text-yellow-400 tracking-widest uppercase">Coming Soon — iOS & Android</span>
            </div>

            <div>
              <h1 className="text-7xl md:text-9xl font-black leading-none">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">DANFO</span>
                <br /><span className="text-white">HUSTLE</span>
              </h1>
              <p className="text-yellow-400/80 text-lg font-bold tracking-widest mt-2 uppercase">Lasgidi Payback</p>
            </div>

            {/* Always-visible tagline */}
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
              The Streets are Vibrant. The Hustle is Real.<br />
              In the heart of Lasgidi, survival is not given — it is{" "}
              <span className="text-yellow-400 font-black">driven.</span>
            </p>

            {/* Show More — full hero copy from PDF */}
            <ShowMore label="Read Full Description">
              <div className="space-y-4 text-gray-300 text-base leading-relaxed max-w-2xl">
                <p>
                  Danfo Hustle: Lasgidi Payback is a{" "}
                  <span className="text-yellow-400 font-bold">story-driven action driving mobile game</span>{" "}
                  that throws players into a hyper-stylized Lagos where chaos, culture, street politics, and rebellion collide.
                </p>
                <p>
                  Danfo Hustle is not just a game. It is the rhythm of survival. The chaos of traffic. The grind of ambition.{" "}
                  <span className="text-white font-bold">The story of millions chasing tomorrow inside a yellow bus.</span>
                </p>
                <p>
                  In Danfo Hustle, you don't just drive — you navigate chaos, outsmart agberos, fight street politics, and turn a rusty yellow bus into a legend.
                </p>
                <p>
                  Set in a hyper-stylized version of Lagos, this high-energy arcade driving game blends{" "}
                  <span className="text-yellow-400 font-bold">
                    high-speed arcade driving, narrative progression, vehicle upgrades, street humor, emotional storytelling,
                  </span>{" "}
                  and explosive action into one bold mobile experience.
                </p>
                <p className="text-white font-black text-lg">
                  This is not just about transport.<br />
                  This is about resistance.<br />
                  This is Lagos. This is hustle. This is Danfo Hustle.
                </p>
              </div>
            </ShowMore>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* <Button size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-lg px-10 py-6 border-0"
                asChild>
                <a href="/download">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform" />
                  WATCH TRAILER
                </a>
              </Button> */}
              <Button size="lg" variant="outline"
                className="border-2 border-white/30 bg-black/30 backdrop-blur-md text-white hover:bg-white/10 hover:border-yellow-400 text-lg px-10 py-6 font-bold"
                asChild>
                <a href="/download">
                  <Download className="w-5 h-5 mr-2" />
                  COMING SOON — iOS & Android
                </a>
              </Button>
            </div>

            <div className="flex gap-3 flex-wrap">
              {platforms.map((p) => (
                <div key={p.name} className={`px-4 py-2 rounded-lg bg-gradient-to-r ${p.color} bg-opacity-20 backdrop-blur-md border border-white/10 text-sm font-bold text-white`}>
                  {p.icon} {p.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT THE GAME ════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-sm font-black text-yellow-400 tracking-widest uppercase">
                About the Game
              </div>
              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                <span className="text-white">The Streets Are</span><br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">Vibrant.</span><br />
                <span className="text-white">The Hustle Is</span><br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">Real.</span>
              </h2>

              <div className="space-y-5 text-gray-300 text-base leading-relaxed">
                <p>
                  Danfo Hustle: Lasgidi Payback is a{" "}
                  <span className="text-yellow-400 font-bold">story-driven action driving mobile game</span>{" "}
                  that throws players into a hyper-stylized Lagos where chaos, culture, street politics, and rebellion collide.
                </p>
                <p>
                  Danfo Hustle is not just a game. It is the rhythm of survival. The chaos of traffic. The grind of ambition.{" "}
                  <span className="text-white font-bold">The story of millions chasing tomorrow inside a yellow bus.</span>
                </p>

                <ShowMore label="Read More">
                  <div className="space-y-5 text-gray-300 text-base leading-relaxed">
                    <p>
                      In Danfo Hustle, you don't just drive — you navigate chaos, outsmart agberos, fight street politics, and turn a rusty yellow bus into a legend.
                    </p>
                    <p>
                      Set in a hyper-stylized version of Lagos, this high-energy arcade driving game blends{" "}
                      <span className="text-yellow-400 font-bold">
                        high-speed arcade driving, narrative progression, vehicle upgrades, street humor, emotional storytelling,
                      </span>{" "}
                      and explosive action into one bold mobile experience.
                    </p>
                    <p className="text-white font-black text-lg">
                      This is not just about transport.<br />
                      This is about resistance.<br />
                      This is Lagos. This is hustle. This is Danfo Hustle.
                    </p>
                  </div>
                </ShowMore>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "High-Speed Arcade Driving", icon: "🚗" },
                  { label: "Earn Tokens & Intel",        icon: "💰" },
                  { label: "Upgrade & Jailbreak",        icon: "🔧" },
                  { label: "Take Down a Syndicate",      icon: "⚔️" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-yellow-400/50 transition-all">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white text-sm font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src="/img/img2.png" alt="Lagos Life"    className="rounded-2xl border-2 border-white/10 hover:border-yellow-400 transition-all duration-300" />
              <img src="/img/img3.png" alt="Lagos Night"   className="rounded-2xl border-2 border-white/10 hover:border-yellow-400 transition-all duration-300 mt-8" />
              <img src="/img/img4.png" alt="Lagos Traffic" className="rounded-2xl border-2 border-white/10 hover:border-yellow-400 transition-all duration-300" />
              <img src="/img/img5.png" alt="Lagos Culture" className="rounded-2xl border-2 border-white/10 hover:border-yellow-400 transition-all duration-300 mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STORY ═════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(250,204,21,0.3) 40px, rgba(250,204,21,0.3) 41px)"
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm font-black text-red-400 tracking-widest uppercase mb-6">
              The Story
            </div>
            <h2 className="text-5xl md:text-6xl font-black">
              <span className="text-white">If System No Work</span><br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">For You — Build Your Own.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Tobi image */}
            <div className="relative flex justify-center lg:sticky lg:top-24">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/30 to-orange-500/10 blur-2xl scale-110" />
                <img src="/img/tobi.png" alt="Tobi Adekunle"
                  className="relative z-10 rounded-2xl border-2 border-yellow-400/40 shadow-[0_0_60px_rgba(250,204,21,0.2)] w-full max-w-sm object-cover" />
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/70 backdrop-blur-md rounded-xl p-4 border border-yellow-400/30">
                  <p className="text-yellow-400 font-black text-lg">Tobi Adekunle</p>
                  <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Engineer · Driver · System Breaker</p>
                </div>
                <div className="absolute top-3 left-3  w-6 h-6 border-t-2 border-l-2 border-yellow-400 z-20 pointer-events-none" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-yellow-400 z-20 pointer-events-none" />
              </div>
            </div>

            {/* Story text */}
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Tobi Adekunle was on the verge of revolutionizing urban mobility when he was framed for a cybercrime linked to{" "}
                <span className="text-red-400 font-bold">TransGlobe Mobility</span>. Within days — his job vanished, his scholarship was revoked, his name was destroyed.
              </p>
              <p>
                Forced out of the formal economy, he returns to the only thing left behind: his late father's old rusting Danfo bus. Under the dashboard are handwritten repair notes. Route sketches. Fare logic. Mechanical hacks.
              </p>
              <div className="border-l-4 border-yellow-400 pl-6 py-2">
                <p className="text-xl text-yellow-400 font-black italic">
                  "This bus isn't just transport. It's inheritance. It's memory. It's rebellion."
                </p>
                <p className="text-sm text-gray-500 mt-1">— Tobi's father's notebook</p>
              </div>

              <ShowMore label="Continue the Story">
                <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
                  <p>The bus becomes more than transport. It becomes his weapon. His resistance. His redemption.</p>
                  <p>
                    TransGlobe isn't just a tech company. It's a front for a powerful syndicate using heavy tech taxes, AI surveillance buses, and illegal influence over drivers to control the city.
                  </p>
                  <p>
                    To take them down, Tobi builds a crew — each member bringing a unique ability, a different piece of the puzzle, and their own reason to fight back.
                  </p>
                  <div className="p-5 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                    <p className="text-yellow-400 font-black text-lg">
                      "If system no work for you, build your own."
                    </p>
                    <p className="text-sm text-gray-400 mt-1">— The line at the heart of Danfo Hustle.</p>
                  </div>
                </div>
              </ShowMore>

              <div className="flex flex-wrap gap-3 pt-2">
                {["His Weapon", "His Resistance", "His Redemption"].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-black">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCREENSHOTS ═══════════════════════════════════════════════════════ */}
      <section id="gameplay" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">SCREENSHOTS</span>{" "}
              <span className="text-white">& MEDIA</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              City driving scenes, Danfo upgrades, character moments, and high-speed chase gameplay
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {gameplayScreenshots.map((s) => (
              <div key={s.id} className="group relative cursor-pointer" onClick={() => setSelectedImage(s)}>
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-yellow-400 transition-all duration-500">
                  <img src={s.src} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-xs font-black text-yellow-400 uppercase tracking-wider">{s.category}</span>
                      <h3 className="text-xl font-bold text-white mt-2">{s.title}</h3>
                      <p className="text-sm text-gray-300 mt-1">{s.description}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LAGOS MAP VIDEO ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm font-black text-green-400 tracking-widest uppercase mb-6">
                <MapPin className="w-4 h-4" /> World: Lasgidi
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="text-white">Explore the</span>{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Map of Lasgidi</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
                Motor parks, AI surveillance networks, no-go zones, and city districts — the world of Danfo Hustle is alive.
              </p>
              <div className="max-w-2xl mx-auto">
                <ShowMore label="See Full World Details">
                  <div className="mt-3 text-left space-y-4 text-gray-300 text-base leading-relaxed">
                    <p>
                      The world of Lasgidi is divided into city districts, each with its own culture, enemies, allies, and secrets. Some zones are locked down by TransGlobe's AI surveillance network — you'll need stealth, bribes, or brute force to pass through.
                    </p>
                    <p>
                      Motor parks serve as your safe houses and crew meeting points. No-go zones are exactly that — until you're strong enough to take them back. Every district you unlock expands your reach and your crew's power.
                    </p>
                    <p>
                      Future updates will expand the map beyond Lagos:{" "}
                      <span className="text-yellow-400 font-bold">Accra Hustle (Trotro buses), Nairobi Jam (Matatu culture), Jo'burg Express (Minibus taxis).</span>
                    </p>
                  </div>
                </ShowMore>
              </div>
            </div>

            {/* Lagos Map Video — /video/lagos_map.mp4 */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 hover:border-yellow-400 transition-all duration-500 bg-gray-900 aspect-video">
              <video autoPlay={false} loop muted playsInline controls className="w-full h-full object-cover" poster="/img/thumb.png">
                <source src={lagosMapVideo} type="video/mp4" />
              </video>
              <div className="absolute top-4 left-4   w-8 h-8 border-t-2 border-l-2 border-yellow-400 pointer-events-none" />
              <div className="absolute top-4 right-4  w-8 h-8 border-t-2 border-r-2 border-yellow-400 pointer-events-none" />
              <div className="absolute bottom-4 left-4  w-8 h-8 border-b-2 border-l-2 border-yellow-400 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-yellow-400 pointer-events-none" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Motor Parks",           icon: "🚏" },
                { label: "AI Surveillance Zones", icon: "👁️"  },
                { label: "No-Go Districts",       icon: "⛔"  },
                { label: "City Districts",        icon: "🏙️"  },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-white text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CORE GAMEPLAY ═════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="text-white">CORE</span>{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">GAMEPLAY</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
              Drive Missions → Earn Tokens/Intel → Upgrade & Jailbreak → Take Down Syndicate Tiers
            </p>
            <div className="max-w-2xl mx-auto">
              <ShowMore label="See Full Core Loop">
                <div className="mt-3 text-left space-y-4 text-gray-300 text-base leading-relaxed">
                  <p className="text-white font-black">THE CORE LOOP:</p>
                  <ol className="space-y-2">
                    {[
                      "Choose a route across Lasgidi",
                      "Pick up passengers and earn tokens",
                      "Complete missions and events",
                      "Upgrade your Danfo",
                      "Unlock new districts and allies",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-yellow-400 font-black">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p>Rise from a struggling driver to a legendary street operator. Every route is a decision. Every upgrade is a statement.</p>
                  <p className="text-white font-black">CORE ACTIONS:</p>
                  <p>Third-person driving with street-survival choices: Steering / Acceleration / Speed Boost / Drift / Attacks / Stealth / Bribe / Fight / Fuel Refill.</p>
                  <p className="text-red-400 font-black">FAILURE STATES — No Excuses on These Streets:</p>
                  <ul className="space-y-1">
                    {["Bus breakdown (damage)", "Police seizure", "Fuel finishes mid-route"].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-red-400">✕</span><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ShowMore>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-yellow-400/50 transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">{feature.description}</p>
                  <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <span className="text-sm font-black text-yellow-400">{feature.highlight}</span>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CHARACTERS ════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-black text-purple-400 tracking-widest uppercase mb-6">
              Character Spotlights
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="text-white">Meet the</span>{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">Crew</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Every member brings a unique ability to take down the syndicate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {characters.map((char) => (
              <div key={char.name}
                className="group bg-gradient-to-br from-gray-900 to-black border-2 border-white/10 hover:border-yellow-400 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.15)]">
                {char.image ? (
                  <div className="relative h-56 overflow-hidden">
                    <img src={char.image} alt={char.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>
                ) : (
                  <div className="h-56 relative flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${char.color} flex items-center justify-center`}>
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-black text-white mb-1">{char.name}</h3>
                  <p className={`text-sm font-black uppercase tracking-wider mb-1 bg-gradient-to-r ${char.color} bg-clip-text text-transparent`}>{char.role}</p>
                  <p className="text-xs text-yellow-400/70 font-bold mb-3 italic">⚡ {char.ability}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{char.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VEHICLES ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-black text-orange-400 tracking-widest uppercase mb-8">
              🚌 The Vehicles
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">Danfo Buses —</span>{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">The Real Hero</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Choose from rugged Danfo variants and build them into monsters — worn yellow paint, graffiti, stickers, and upgrades that scream Lagos.
            </p>
            <ShowMore label="See Jailbreak Upgrades">
              <div className="mt-4 text-left space-y-5 text-gray-300 text-base leading-relaxed">
                <p className="text-white font-black text-lg">JAILBREAK THE DANFO</p>
                <p>Tobi turns engineering into warfare. Use collectibles from Story Mode to unlock tech upgrades:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "EMP Bursts",           desc: "Shut down AI surveillance buses mid-chase",  icon: "⚡" },
                    { name: "Stealth Coatings",     desc: "Avoid LASMA and AI camera detection zones",  icon: "👁️"  },
                    { name: "Speed Upgrades",       desc: "Outrun enforcement on any route",            icon: "💨" },
                    { name: "Armor Reinforcement",  desc: "Tank damage and keep the route alive",       icon: "🛡️" },
                  ].map((u) => (
                    <div key={u.name} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-yellow-400/50 transition-all">
                      <span className="text-2xl">{u.icon}</span>
                      <div>
                        <p className="text-yellow-400 font-black text-sm">{u.name}</p>
                        <p className="text-gray-400 text-xs mt-1">{u.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ShowMore>
          </div>
        </div>
      </section>

      {/* ══ THRILLER VIDEO 2 ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm font-black text-red-400 tracking-widest uppercase mb-6">
                <Play className="w-4 h-4" /> Cinematic
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="text-white">Drive the</span>{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">Rebellion</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Expose the truth. Become a legend. The future of Lasgidi is in your hands.
              </p>
            </div>
            {/* Thriller Video 2 — /video/thriller2.mp4 */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 hover:border-red-500 transition-all duration-500 bg-gray-900 aspect-video">
              <video autoPlay={false} loop muted playsInline controls className="w-full h-full object-cover" poster="/img/thumb.png">
                <source src={thrillerVideo2} type="video/mp4" />
              </video>
              <div className="absolute top-4 left-4   w-8 h-8 border-t-2 border-l-2 border-red-500 pointer-events-none" />
              <div className="absolute top-4 right-4  w-8 h-8 border-t-2 border-r-2 border-red-500 pointer-events-none" />
              <div className="absolute bottom-4 left-4  w-8 h-8 border-b-2 border-l-2 border-red-500 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY WE BUILT IT ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-sm font-black text-yellow-400 tracking-widest uppercase mb-6">
                Why We Built Danfo Hustle
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-white">To Honor</span><br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">the Danfo.</span>
              </h2>
            </div>

            <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
              <p>
                Danfo Hustle was built from lived experience. The yellow bus is more than transportation — it represents hustle, dignity, and daily survival. Millions of Nigerians wake up every day and enter that bus to chase something: school, work, opportunity, survival.
              </p>
              <p>In this game, the Danfo is not background art.{" "}<span className="text-yellow-400 font-bold">It is a character.</span></p>

              <ShowMore label="Read Full Vision">
                <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
                  <p>
                    We built Danfo Hustle because African stories deserve global platforms. Lagos hustle deserves digital preservation. Authentic Afrocentric narrative belongs on the global gaming stage. And we want to build ours.
                  </p>
                  <p>
                    Danfo Hustle represents our commitment to showcasing African creativity and innovation. We've poured countless hours into ensuring every detail — from authentic Lagos Pidgin dialogue to realistic traffic patterns and AI surveillance systems — rings true for anyone who knows and loves this city.
                  </p>
                  <div className="p-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl border-2 border-yellow-400/30">
                    <p className="text-white text-xl font-bold text-center leading-relaxed">
                      Danfo Hustle is culture. It is documentation. It is pride. It is proof that{" "}
                      <span className="text-yellow-400">African urban life is worthy of AAA-level storytelling.</span>
                    </p>
                  </div>
                </div>
              </ShowMore>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {[
                "African stories deserve global platforms.",
                "Lagos hustle deserves digital preservation.",
                "Authentic Afrocentric narrative belongs on the global gaming stage.",
                "We want to build ours.",
              ].map((reason, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-yellow-400/50 transition-all">
                  <span className="text-yellow-400 font-black text-xl mt-0.5">→</span>
                  <p className="text-white font-bold">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/img/thumb.png" alt="Lagos Skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-white">THE FUTURE OF</span><br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">LASGIDI</span><br />
            <span className="text-white">IS IN YOUR HANDS.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">Drive the rebellion. Expose the truth. Become a legend.</p>
          <p className="text-lg text-yellow-400 font-black mb-12 tracking-widest uppercase">Danfo Hustle: Lasgidi Payback — Coming Soon to Mobile</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-xl px-14 py-8 border-0 group"
              asChild>
              <a href="/download"><Download className="w-6 h-6 mr-3 group-hover:animate-bounce" /> APP STORE</a>
            </Button>
            <Button size="lg"
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-black text-xl px-14 py-8 border-0 group"
              asChild>
              <a href="/download"><Download className="w-6 h-6 mr-3 group-hover:animate-bounce" /> GOOGLE PLAY</a>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span>✓ Free to Play</span>
            <span>✓ Story-Driven</span>
            <span>✓ Made in Nigeria</span>
            <span>✓ Cultural Authenticity</span>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">FAQ</span>
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "What kind of game is Danfo Hustle?",  a: "A story-driven arcade driving game with missions, upgrades, and street-survival systems set in a hyper-stylized Lagos." },
                { q: "What platforms will it launch on?",   a: "Mobile — iOS and Android." },
                { q: "What makes it unique?",               a: '"The Lagos Factor" — chaos, resilience, and humor — plus AI surveillance vs traditional transport culture, authentic Pidgin dialogue, and a deeply African narrative at its core.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all">
                  <h3 className="text-white font-black mb-2">{item.q}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl w-full">
            <img src={selectedImage.src} alt={selectedImage.title}
              className="w-full h-auto max-h-[90vh] rounded-2xl shadow-2xl border-2 border-white/20" />
            <Button variant="outline"
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}>✕</Button>
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