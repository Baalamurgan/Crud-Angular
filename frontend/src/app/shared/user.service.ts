import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { users } from '../users/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUri = "http://localhost:8000/api"
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {
  }

  GetUsers() {
    return this.http.get(`${this.baseUri}/userslist`);
  }

  GetUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUri}/user/${id}`);
  }

  createUser(data: users): Observable<any> {
    return this.http.post(`${this.baseUri}/create`, data, { headers: this.headers })
      .pipe(catchError(this.handleError))
  }

  editUser(data: users, id: any): Observable<any> {
    console.log(data)
    return this.http.put(`${this.baseUri}/user/${id}`, data, { headers: this.headers })
      .pipe(catchError(this.handleError))
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.baseUri}/user/${id}`)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  // createEmployee(data): Observable<any> {
  //   let url = `${this.basebaseUri}/create`;
  //   return this.http.post(url, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  // To Get Employee Details For Single Record Using Id
  // getEmployeeById(empid) {
  //   return this.http.get(`${this.baseUri}/editEmployee/${empid}`);
  // }

  // // To Updated Specific Employee
  // updateEmployee(id, body) {
  //   return this.http.post(`${this.baseUri}/updateEmployee/${id}`, body);
  // }

  // // To Create/Add New Employee
  // addEmployee(body) {
  //   return this.http.post(`${this.baseUri}/addEmployee`, body);
  // }

  // // To Delete Any Employee
  // deleteEmployee(empid) {
  //   return this.http.get(`${this.baseUri}/deleteEmployee/${empid}`);
  // }


}
