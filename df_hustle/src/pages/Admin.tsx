import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Trophy, LogOut } from "lucide-react";
import { toast } from "sonner";

interface LeaderboardEntry {
  rank: number;
  name: string;
  email: string;
  score: number;
  time: string;
}

interface Subscriber {
  email: string;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        toast.success("Login successful");
        fetchData();
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [leaderboardRes, subscribersRes] = await Promise.all([
        fetch("http://localhost:3000/api/leaderboard"),
        fetch("http://localhost:3000/api/subscribers"),
      ]);
      const leaderboardData = await leaderboardRes.json();
      const subscribersData = await subscribersRes.json();
      setLeaderboard(leaderboardData);
      setSubscribers(subscribersData);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setLeaderboard([]);
    setSubscribers([]);
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Admin Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage subscribers and leaderboard data
            </p>
          </div>

          {!isAuthenticated ? (
            <Card className="max-w-md mx-auto p-8">
              <h2 className="text-2xl font-black mb-6">Admin Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">
                    Username
                  </label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">
                    Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Card>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-end mb-6">
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Subscribers List */}
                <Card className="p-6">
                  <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <Mail className="w-6 h-6 text-primary" />
                    Subscribers
                  </h2>
                  <div className="space-y-3">
                    {subscribers.map((subscriber, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl border-2 border-border flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold">{subscriber.email}</div>
                          <div className="text-xs text-muted-foreground">
                            Subscribed: {new Date(subscriber.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <a
                          href={`mailto:${subscriber.email}`}
                          className="text-primary font-bold hover:underline"
                        >
                          Contact
                        </a>
                      </div>
                    ))}
                  </div>
                </Card>
                {/* Leaderboard */}
                <Card className="p-6">
                  <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-primary" />
                    Leaderboard
                  </h2>
                  <div className="space-y-3">
                    {leaderboard.map((entry) => (
                      <div
                        key={entry.rank}
                        className={`p-4 rounded-xl border-2 ${
                          entry.rank === 1
                            ? "bg-primary/10 border-primary"
                            : entry.rank === 2
                            ? "bg-secondary/10 border-secondary"
                            : entry.rank === 3
                            ? "bg-accent/10 border-accent"
                            : "bg-background/50 border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg ${
                                entry.rank === 1
                                  ? "bg-primary text-primary-foreground"
                                  : entry.rank === 2
                                  ? "bg-secondary text-secondary-foreground"
                                  : entry.rank === 3
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {entry.rank}
                            </div>
                            <div>
                              <div className="font-bold">{entry.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {entry.email} | {entry.time} | {entry.score} points
                              </div>
                            </div>
                          </div>
                          <a
                            href={`mailto:${entry.email}`}
                            className="text-primary font-bold hover:underline"
                          >
                            Contact
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;