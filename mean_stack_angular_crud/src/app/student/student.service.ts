  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { environment } from 'src/environments/environment';
  import { ApiResponse, Student, StudentCreate } from '../shared/models/student.model';
  import { catchError, map, Observable, throwError } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class StudentService {
    private apiUrl = environment.apiUrl
    constructor(private http : HttpClient) { }


    createStudent(stud:StudentCreate):Observable<StudentCreate>{
      return this.http.post<StudentCreate>(`${this.apiUrl}/createstudent`,stud).pipe(
        map(response => response),
        catchError(this.handleError)
      )
    }
    getStudent():Observable<ApiResponse>{
      return this.http.get<ApiResponse>(`${this.apiUrl}/getstudent`)
    }

    updateStudent(id: string, student: StudentCreate):Observable<StudentCreate>{
    return this.http.put<StudentCreate>(`${this.apiUrl}/updatestudent/${id}`,student).pipe(
      map(response=>response),
      catchError(this.handleError)
    )
    }
    deleteStudent(id:string){
      return this.http.delete(`${this.apiUrl}/deletestudent/${id}`)
    }
    
    private handleError(error: any): Observable<never> {
      let errorMessage = 'An unknown error occurred!';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Backend error
        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
      }
      
      // Log the error message for debugging purposes (optional)
      console.error(errorMessage);
      
      // Return an observable with a user-facing error message
      return throwError(errorMessage);  // This will propagate the error back to the component
    }

  }
