import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Target, Zap } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  time: string;
  email: string;
}

const Community = () => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState({ num1: 0, num2: 0, operation: "×", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [showForm, setShowForm] = useState(!localStorage.getItem("userName") || !localStorage.getItem("userEmail"));
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Fetch leaderboard on component mount
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/leaderboard");
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setFeedback("Failed to load leaderboard");
      }
    };
    fetchLeaderboard();
  }, []);

  const generateQuestion = () => {
    // Generate one to two-digit numbers (1-99)
    const num1 = Math.floor(Math.random() * 99) + 1;
    const num2 = Math.floor(Math.random() * 99) + 1;
    const answer = num1 * num2;

    setCurrentQuestion({ num1, num2, operation: "×", answer });
  };

  const startGame = () => {
    if (!userName || !userEmail) {
      setFeedback("Please enter your name and email to start!");
      return;
    }
    // Save user details to localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);
    setShowForm(false);
    setGameActive(true);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setUserAnswer("");
    setFeedback("");
    generateQuestion();
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === currentQuestion.answer) {
      const points = 100 + streak * 10;
      setScore(score + points);
      setStreak(streak + 1);
      setFeedback(`Correct! +${points} points`);
      setTimeout(() => setFeedback(""), 500);
    } else {
      setStreak(0);
      setFeedback("Wrong! Streak reset");
      setTimeout(() => setFeedback(""), 500);
    }
    setUserAnswer("");
    generateQuestion();
  };

  const endGame = async () => {
    setGameActive(false);
    setFeedback(`Game Over! Final Score: ${score}`);
    try {
      const response = await fetch("http://localhost:3000/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          score,
          time: `${60 - timeLeft}s`,
        }),
      });
      const updatedLeaderboard = await response.json();
      setLeaderboard(updatedLeaderboard);
    } catch (error) {
      console.error("Error submitting score:", error);
      setFeedback("Failed to submit score");
    }
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
  }, [gameActive, timeLeft]);

  const handleChangeDetails = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserName("");
    setUserEmail("");
    setShowForm(true);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Multiplication</span> Master
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test your multiplication skills with numbers 1-99 and compete for top spots!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Math Game */}
            <div className="lg:col-span-2">
              <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black">Multiplication Challenge</h2>
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-black text-primary">{timeLeft}s</span>
                  </div>
                </div>

                {showForm ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Target className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-2">Enter Your Details</h3>
                      <p className="text-muted-foreground">Provide your name and email to join the leaderboard!</p>
                    </div>
                    <div className="max-w-md mx-auto space-y-4">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Your Email"
                        className="w-full px-4 py-2 border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button variant="hero" size="lg" onClick={startGame}>
                        Start Game
                      </Button>
                    </div>
                  </div>
                ) : !gameActive && timeLeft === 60 ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Target className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-2">Ready to Multiply?</h3>
                      <p className="text-muted-foreground">
                        Solve multiplication problems with numbers 1-99 in 60 seconds!
                      </p>
                      <p className="text-sm text-primary font-bold mt-2">
                        Build streaks for bonus points!
                      </p>
                    </div>
                    <Button variant="hero" size="lg" onClick={startGame}>
                      Start Game
                    </Button>
                  </div>
                ) : gameActive ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-background/50 p-4 rounded-xl text-center">
                        <div className="text-sm text-muted-foreground mb-1">Score</div>
                        <div className="text-2xl font-black text-primary">{score}</div>
                      </div>
                      <div className="bg-background/50 p-4 rounded-xl text-center">
                        <div className="text-sm text-muted-foreground mb-1">Streak</div>
                        <div className="text-2xl font-black text-secondary flex items-center justify-center gap-1">
                          <Zap className="w-5 h-5" />
                          {streak}
                        </div>
                      </div>
                      <div className="bg-background/50 p-4 rounded-xl text-center">
                        <div className="text-sm text-muted-foreground mb-1">Bonus</div>
                        <div className="text-2xl font-black text-accent">+{streak * 10}</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-12 rounded-2xl text-center">
                      <div className="text-6xl md:text-8xl font-black text-foreground mb-8">
                        {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2}
                      </div>
                      <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                        placeholder="Your answer"
                        className="w-full max-w-xs mx-auto px-6 py-4 text-3xl font-black text-center bg-background border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                      />
                    </div>
                    <Button variant="hero" size="lg" onClick={checkAnswer} className="w-full">
                      Submit Answer
                    </Button>
                    {feedback && (
                      <div
                        className={`text-center text-lg font-bold py-3 rounded-lg ${
                          feedback.includes("Correct")
                            ? "bg-accent/20 text-accent"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {feedback}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Trophy className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-2">Game Over!</h3>
                      <p className="text-4xl font-black text-primary mb-2">{score} Points</p>
                      <p className="text-muted-foreground">Best Streak: {streak} answers</p>
                    </div>
                    <div className="space-y-4">
                      <Button variant="hero" size="lg" onClick={startGame}>
                        Play Again
                      </Button>
                      <Button variant="outline" size="lg" onClick={handleChangeDetails}>
                        Change Details
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
                <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  Weekly Rewards
                </h3>
                <p className="text-muted-foreground">
                  Top players on the leaderboard each week receive exclusive in-game perks including special Danfo skins, boost packs, and premium currency!
                </p>
              </div>
            </div>
            {/* Leaderboard */}
            <div>
              <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-4 sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-black">Leaderboard</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Weekly top scorers</p>
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
                            <div className="text-xs text-muted-foreground">{entry.time}</div>
                          </div>
                        </div>
                        <div className="text-xl font-black">{entry.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-center text-muted-foreground">
                    Leaderboard resets every Monday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;