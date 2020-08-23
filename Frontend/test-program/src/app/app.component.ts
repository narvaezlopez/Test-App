import { Component, OnInit,NgModule } from '@angular/core';
import { employee } from '../../src/app/interfaces/employee';
import { EmployeeService } from './services/employee.service';
import { rol } from './interfaces/rol';
import { BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  employees: employee[] = [];
  roles:rol[] = [];
  idBoss:any[]=[];
  i:number=0;
  section:number=0;

  updateUser={
    id:null,
    fullname:null,
    functions:null,
    idboss:null
  }

  constructor(private employeeService:EmployeeService) {}

  ngOnInit(){
    this.employeeService.getEmployees().subscribe((data)=>{
        this.employees=data;
        this.employees.forEach(element => {
          this.employeeService.getRolByIdEmployee(element.id.toString())
          .subscribe((data)=>{
            this.idBoss[element.id]=data[0].idboss;
            this.i++;
          })
        });
    })
    
  }

  Agregar(x:number){
    this.section=x;
  }

  delete(id){
    console.log(id);
    this.employeeService.deleteEmployee(id).subscribe((data)=>{
      this.employeeService.getEmployees().subscribe((data)=>{
        this.employees=data;
        this.employees.forEach(element => {
          this.employeeService.getRolByIdEmployee(element.id.toString())
          .subscribe((data)=>{
            this.idBoss[element.id]=data[0].idboss;
            this.i++;
            console.log(this.idBoss)
          })
        });
    })
    })
  }

  add(id:number, fullname: string, functions: string, idboss:number): void {
    this.employeeService.addEmployee(id, fullname, functions)
      .subscribe(employee => {
        this.employees.push(employee);
    });
    this.employeeService.addRol(id,id,idboss).subscribe(rol=>{
      this.roles.push(rol);
    })
    this.employeeService.getEmployees().subscribe((data)=>{
      this.employees=data;
      this.employees.forEach(element => {
        this.employeeService.getRolByIdEmployee(element.id.toString())
        .subscribe((data)=>{
          this.idBoss[element.id]=data[0].idboss;
          this.i++;
          console.log(this.idBoss)
        })
      });
  })
  }

  edit(){
    this.employeeService.updateEmployee(this.updateUser.id, this.updateUser.fullname,this.updateUser.functions)
    .subscribe((data)=>{
      
    })
  }

  update(id){
    this.section=2;
    console.log(id);
      this.updateUser.id=null;
      this.updateUser.fullname=null;
      this.updateUser.functions=null;
      this.employeeService.getEmployeeById(id).subscribe((data)=>{
      this.updateUser.id=data[0].id;
      this.updateUser.fullname=data[0].fullname;
      this.updateUser.functions=data[0].functions;
    })
    this.employeeService.getRolByIdEmployee(id).subscribe(
      (data)=>{
        this.updateUser.idboss=data[0].idboss;
          console.log(this.updateUser.idboss)
      }
    )
  }

}
