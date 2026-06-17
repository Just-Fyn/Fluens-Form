export interface Form {
  id: number;
  creatorId: string;
  shareToken: string;
  title: string;
  description: string;
  questions: Question[];
  settings: Partial<FormSettings>;
  totalScore: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface DBForm {
  id: number;
  creator_id: string;
  share_token: string;
  title: string;
  description: string;
  questions: Question[];
  settings: Partial<FormSettings>;
  total_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface ClientForm extends Omit<
  Form,
  "id" | "creatorId" | "createdAt" | "updatedAt"
> {}

export interface EditorForm {
  shareToken: string | null;
  title: string;
  description: string;
  questions: Question[];
  settings: Partial<FormSettings>;
  totalScore: number | null;
}

export interface DraftForm extends Omit<
  Form,
  "id" | "creatorId" | "shareToken" | "createdAt" | "updatedAt"
> {}

export type QuestionType = "text" | "radio" | "checkbox" | "select";

export type QuestionOption = {
  id: string;
  title: string;
};

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  totalScore: number;
  correctAnswers: string[];
  options: QuestionOption[];
  required: boolean;
};

export interface FormSettings {
  isQuiz: boolean;
  
  allowSeeWrongAnswers: boolean;
  allowSeeCorrectAnswers: boolean;
  allowSeeScore: boolean;
  
  defaultScoreValue: number;
  
  shuffleQuestions: boolean;
  
  allowSeeResult: boolean;
  
  questionRequiredDefault: boolean; // complete
  
  /* ====== TO ADDED NEXT ====== 
  
  releaseMarks: 'immediately' | 'later'; 
  
  confirmationMessage: string;
  showLinkToSubmitAnother: boolean;
  
  showProgressBar: boolean;
  
  disableAutosave: boolean;
  
  */ 

}

// === SUBMISSION === //

export interface Submission {
  id: number;
  formId: number;
  uuid: string;
  data: SubmissionData;
  createdAt: string;
  updatedAt: string;
}

export interface DBSubmission {
  id: number;
  form_id: number;
  uuid: string;
  data: SubmissionData;
  created_at: string;
  updated_at: string;
}

export type SubmissionData = {
  title: string;
  description: string;
  submissionQuestions: SubmissionQuestion[];
  score: number | null;
  totalScore: number | null;
};

export interface ClientSubmission extends Omit<
  Form,
  "id" | "creatorId" | "totalScore" | "questions" | "createdAt" | "updatedAt"
> {
  submissionQuestions: SubmissionQuestion[];
}

export type SubmissionQuestion = {
  id: string;
  title: string;
  type: QuestionType;
  options: QuestionOption[];
  required: boolean;
  answers: any;
  score: number | null;
  correctAnswers?: string[];
  totalScore?: number | null;
};
