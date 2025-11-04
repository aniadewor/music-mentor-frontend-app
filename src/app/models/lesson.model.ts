export class Lesson{

  id?:number;
  title?:string;
  description?:string;
  className?:string;
  content?:string;
  creationDate?:number;
  author:string;

  constructor(){
    this.id = 0,
    this.title='',
    this.description='',
    this.className='',
    this.content='',
    this.creationDate=Date.now(),
    this.author=''
  }
}