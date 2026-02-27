import { Button } from "@/components/ui/button";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error(data.error || "Failed to send message");
    }
  } catch (error) {
    toast.error("Failed to send message");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Get in Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-primary transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-black mb-2">Email Us</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Our team is here to help
                </p>
                <a href="mailto:support@danfohustle.com" className="text-primary font-bold hover:underline">
                  support@danfohustle.com
                </a>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-accent transition-all">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-black mb-2">Office</h3>
                <p className="text-muted-foreground text-sm">
                  Shop D312, Road 2, Ikota Shopping Complex<br />
                  Lekki, Lagos, Nigeria
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border-2 border-border rounded-2xl p-8">
                <h2 className="text-3xl font-black mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-black text-center mb-10">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <h3 className="font-black mb-2">How do I download the game?</h3>
                <p className="text-sm text-muted-foreground">
                  Visit our Download page to get Danfo Hustle on iOS or Android. Console versions coming soon!
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <h3 className="font-black mb-2">Is the game free to play?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Danfo Hustle is free to download and play with optional in-game purchases.
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <h3 className="font-black mb-2">How do I win weekly perks?</h3>
                <p className="text-sm text-muted-foreground">
                  Play the Math Multiplier game in our Community section and rank on the leaderboard!
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <h3 className="font-black mb-2">Can I suggest new features?</h3>
                <p className="text-sm text-muted-foreground">
                  Absolutely! We love hearing from our community. Send us your ideas using the form above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;