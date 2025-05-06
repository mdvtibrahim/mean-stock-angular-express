export interface ApiResponse {
    message: string;
    data: Student[];  // Assuming data is an array of students
  }
export interface Student{
    _id:string,
    name:string,
    age:number,
    total:number
}
export interface StudentCreate{
    name:string,
    age:number,
    total:number
}