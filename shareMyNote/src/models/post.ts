export interface post {
  uid:string,
  username:string,
  subject:string,
  category:string,
  lessonNumber:number,
  description:string,
  photos:Array<String>,
  comments?:Array<String>,
}
