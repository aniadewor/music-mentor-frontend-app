import { QuestionType } from "./questionType.enum";
import { Quiz } from "./quiz.model";

export interface Question {

   id?:number;
   quiz?:Quiz;
   questionTitle?:string;
   answer1?:string;
   answer2?:string;
   answer3?:string;
   answer4?:string;
   correctAnswer?:string;
   score?:number;
   questionType?:QuestionType;
}
