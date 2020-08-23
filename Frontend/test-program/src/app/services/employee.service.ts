import { Injectable } from '@angular/core';
import { employee } from '../interfaces/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url:string="http://localhost:3000";
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.url+'/employees/');
  }

  getEmployeeById(id:string): Observable<employee> {
    return this.http.get<employee>(this.url+'/employees/'+id);
  }

  updateEmployee(id:number,fullname: string, functions: string):Observable<any>{
    return this.http.put<any>(this.url+'/employees/'+id,{
      "id":id,
      "fullname":fullname,
      "functions":functions
    });
  }

  addEmployee(id:number,fullname:string,functions:string):Observable<employee>{

    return this.http.post<employee>(this.url+'/employees/',{
      "fullname":fullname,
      "functions":functions,
      "Id":id
    });
  }

  deleteEmployee(id:string):Observable<any>{
    return this.http.delete(this.url+'/employees/'+id);
  }

  getRolByIdEmployee(id: string): Observable<rol> {
    return this.http.get<rol>(this.url+'/roles/employee/'+id);
  }

  getRol(): Observable<rol[]> {
    return this.http.get<rol[]>(this.url+'/roles/');
  }

  addRol(id:number,idemployee:number,idboss:number):Observable<rol>{

    return this.http.post<rol>(this.url+'/roles/',{
      "id":id,
      "idemployee":idemployee,
      "Idboss":idboss
    });
  }
  


}
