import { Question } from "./Question.model";
import { User } from "./user.model";

export interface Quiz{

  id?:number;
  title?:string;
  description?:string;
  scoreSum?:number;
  owner?:User;
  numberOfQuestions?:number;
  question?:Question[];
}
