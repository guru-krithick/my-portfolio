export type HeatMapDetail = {
    date: string;
    submissionCount: number;
  };
  
  export type SubmitStats = {
    allQuestionsCount: Array<{ difficulty: string; count: number }>;
    acSubmissionNum: Array<{ difficulty: string; count: number }>;
    rank: number;
  };
  
  export type ContestInfo = {
    attended: boolean;
    trendDirection: string;
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
    rating: number;
    ranking: number;
    contest: {
      title: string;
      startTime: number;
    };
  };