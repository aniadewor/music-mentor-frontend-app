import { Question } from "./question.model";
import { User } from "./user.model";

export interface Quiz{

  id?:number;
  title?:string;
  description?:string;
  scoreSum?:number;
  ownerId?:number;
  numberOfQuestions?:number;
  question?:Question[];
  schoolName?:string;
}
