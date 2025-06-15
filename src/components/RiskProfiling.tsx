
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, TrendingUp } from "lucide-react";

interface RiskProfilingProps {
  onComplete: (riskProfile: RiskProfile) => void;
}

interface RiskProfile {
  category: 'Conservative' | 'Moderate' | 'Aggressive';
  score: number;
  suitableFunds: string[];
}

const RiskProfiling = ({ onComplete }: RiskProfilingProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "What is your age group?",
      options: [
        { text: "Below 25 years", score: 3 },
        { text: "25-35 years", score: 3 },
        { text: "35-45 years", score: 2 },
        { text: "45-55 years", score: 1 },
        { text: "Above 55 years", score: 0 }
      ]
    },
    {
      question: "What is your investment horizon?",
      options: [
        { text: "Less than 1 year", score: 0 },
        { text: "1-3 years", score: 1 },
        { text: "3-5 years", score: 2 },
        { text: "5-10 years", score: 3 },
        { text: "More than 10 years", score: 4 }
      ]
    },
    {
      question: "What percentage of your income do you save/invest?",
      options: [
        { text: "Less than 10%", score: 0 },
        { text: "10-20%", score: 1 },
        { text: "20-30%", score: 2 },
        { text: "30-40%", score: 3 },
        { text: "More than 40%", score: 4 }
      ]
    },
    {
      question: "How would you react if your investment loses 20% value in a year?",
      options: [
        { text: "Panic and sell immediately", score: 0 },
        { text: "Very concerned, consider selling", score: 1 },
        { text: "Concerned but hold", score: 2 },
        { text: "Stay calm and continue investing", score: 3 },
        { text: "See it as buying opportunity", score: 4 }
      ]
    },
    {
      question: "Which best describes your investment knowledge?",
      options: [
        { text: "Beginner - Limited knowledge", score: 0 },
        { text: "Basic - Some understanding", score: 1 },
        { text: "Intermediate - Good understanding", score: 2 },
        { text: "Advanced - Strong knowledge", score: 3 },
        { text: "Expert - Extensive experience", score: 4 }
      ]
    },
    {
      question: "What is your primary investment goal?",
      options: [
        { text: "Capital preservation", score: 0 },
        { text: "Regular income", score: 1 },
        { text: "Moderate growth", score: 2 },
        { text: "Long-term wealth creation", score: 3 },
        { text: "Maximum returns despite risk", score: 4 }
      ]
    }
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRiskProfile(newAnswers);
    }
  };

  const calculateRiskProfile = (allAnswers: number[]) => {
    const totalScore = allAnswers.reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = questions.length * 4;
    const percentageScore = (totalScore / maxPossibleScore) * 100;

    let category: 'Conservative' | 'Moderate' | 'Aggressive';
    let suitableFunds: string[];

    if (percentageScore <= 40) {
      category = 'Conservative';
      suitableFunds = ['Liquid Funds', 'Short Duration Funds', 'Conservative Hybrid Funds', 'Gilt Funds'];
    } else if (percentageScore <= 70) {
      category = 'Moderate';
      suitableFunds = ['Large Cap Funds', 'Balanced Advantage Funds', 'Multi Cap Funds', 'ELSS Funds'];
    } else {
      category = 'Aggressive';
      suitableFunds = ['Mid Cap Funds', 'Small Cap Funds', 'Sectoral/Thematic Funds', 'International Funds'];
    }

    const riskProfile: RiskProfile = {
      category,
      score: totalScore,
      suitableFunds
    };

    onComplete(riskProfile);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Risk Profiling Assessment
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>As per AMFI guidelines:</strong> This assessment helps determine suitable investment products based on your risk tolerance and financial situation.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {currentQuestion > 0 && (
          <Button variant="outline" onClick={goBack} className="w-full">
            Previous Question
          </Button>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600">
            * This assessment is for educational purposes. Please consult with a financial advisor for personalized advice.
            All mutual fund investments are subject to market risks.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskProfiling;
