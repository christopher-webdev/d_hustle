import { Button } from "@/components/ui/button";
import { Apple, Smartphone, Gamepad2, Monitor } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download as DownloadIcon, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Download = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Thanks for subscribing! You'll receive our latest updates.");
          setEmail("");
        } else {
          toast.error(data.error || "Failed to subscribe");
        }
      } catch (error) {
        toast.error("Failed to subscribe");
      }
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Download</span> Danfo Hustle
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience Lagos street racing on your favorite platform
            </p>
          </div>

          {/* Mobile Downloads - Available */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-2">Play Now on Mobile</h2>
              <p className="text-muted-foreground">Available for download today</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* iOS */}
              <div className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Apple className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">iOS</h3>
                    <p className="text-muted-foreground mb-4">
                      Download from the App Store for iPhone and iPad
                    </p>
                    <Button variant="hero" size="lg" className="w-full gap-2">
                      <Apple className="w-5 h-5" />
                      App Store
                    </Button>
                  </div>
                </div>
              </div>

              {/* Android */}
              <div className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">Android</h3>
                    <p className="text-muted-foreground mb-4">
                      Get it on Google Play for Android devices
                    </p>
                    <Button variant="hero" size="lg" className="w-full gap-2">
                      <Smartphone className="w-5 h-5" />
                      Google Play
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Console & PC - Coming Soon */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-2">Coming Soon</h2>
              <p className="text-muted-foreground">We're bringing Danfo Hustle to more platforms</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* PlayStation */}
              <div className="bg-muted/20 border-2 border-muted rounded-2xl p-8 opacity-60">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gamepad2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">PlayStation 4 & 5</h3>
                    <p className="text-muted-foreground mb-4">
                      Coming to PlayStation Store
                    </p>
                    <div className="px-4 py-3 bg-muted/30 rounded-lg text-center">
                      <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Xbox */}
              <div className="bg-muted/20 border-2 border-muted rounded-2xl p-8 opacity-60">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gamepad2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">Xbox Series X|S</h3>
                    <p className="text-muted-foreground mb-4">
                      Coming to Microsoft Store
                    </p>
                    <div className="px-4 py-3 bg-muted/30 rounded-lg text-center">
                      <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nintendo Switch */}
              <div className="bg-muted/20 border-2 border-muted rounded-2xl p-8 opacity-60">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gamepad2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">Nintendo Switch</h3>
                    <p className="text-muted-foreground mb-4">
                      Coming to Nintendo eShop
                    </p>
                    <div className="px-4 py-3 bg-muted/30 rounded-lg text-center">
                      <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PC/Steam */}
              <div className="bg-muted/20 border-2 border-muted rounded-2xl p-8 opacity-60">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">PC (Steam)</h3>
                    <p className="text-muted-foreground mb-4">
                      Coming to Steam Store
                    </p>
                    <div className="px-4 py-3 bg-muted/30 rounded-lg text-center">
                      <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <section className="mb-20">
            <Card className="p-8 md:p-12 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="font-display text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground">
                  Get the latest news, updates, and exclusive content delivered to your inbox
                </p>
              </div>
              <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12"
                />
                <Button type="submit" variant="default" size="lg">
                  Subscribe
                </Button>
              </form>
            </Card>
          </section>

          {/* System Requirements */}
          <div className="max-w-4xl mx-auto mt-16 p-8 bg-card/50 border border-border rounded-2xl">
            <h3 className="text-2xl font-black mb-4">Minimum Requirements</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-primary mb-2">iOS</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• iOS 13.0 or later</li>
                  <li>• iPhone 6s or newer</li>
                  <li>• 2GB RAM minimum</li>
                  <li>• 1.5GB free storage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-accent mb-2">Android</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Android 8.0 or later</li>
                  <li>• 3GB RAM minimum</li>
                  <li>• 1.5GB free storage</li>
                  <li>• ARMv7 or ARM64 processor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Download;