"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ReputationScoreProps {
  overallScore: number;
  trustworthinessScore: number;
  governanceScore: number;
  technicalScore: number;
  communityScore: number;
}

export function ReputationScoreCard({
  overallScore = 85,
  trustworthinessScore = 92,
  governanceScore = 78,
  technicalScore = 85,
  communityScore = 80,
}: Partial<ReputationScoreProps>) {
  // Calculate the percentage for the circular progress
  const circumference = 40 * 2 * Math.PI;
  const dashOffset = circumference - (overallScore / 100) * circumference;
  
  // Determine rating text based on overall score
  const getRatingText = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Satisfactory";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reputation Score</CardTitle>
        <CardDescription>Your current reputation metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative h-24 w-24 mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{overallScore}</span>
            </div>
            <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-muted-foreground/20 stroke-current"
                strokeWidth="8"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-primary stroke-current"
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={dashOffset}
              />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">{getRatingText(overallScore)}</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Trustworthiness</span>
              <span className="font-medium">{trustworthinessScore}/100</span>
            </div>
            <Progress value={trustworthinessScore} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Governance Influence</span>
              <span className="font-medium">{governanceScore}/100</span>
            </div>
            <Progress value={governanceScore} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Technical Expertise</span>
              <span className="font-medium">{technicalScore}/100</span>
            </div>
            <Progress value={technicalScore} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Community Contribution</span>
              <span className="font-medium">{communityScore}/100</span>
            </div>
            <Progress value={communityScore} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
