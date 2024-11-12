export interface Experience {
  title: string;
  company: string;
  description: string;
  duration: string;
}

export interface Education {
  degree: string;
  school: string;
  fieldOfStudy: string;
  graduationYear: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  openAIKey: string;
}

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  questions: ApplicationQuestion[];
}

export interface ApplicationQuestion {
  id: string;
  question: string;
  type: 'text' | 'multipleChoice' | 'yesNo';
  options?: string[];
}