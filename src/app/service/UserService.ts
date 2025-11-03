import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// Interfaz para la estructura del recurso "User"
export interface User {
  id?: number; // Opcional para las peticiones de creación (POST)
  name: string;
  job: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface UserListResponse {
  data: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://reqres.in/api/users';

  private httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json' 
    })
  };

  constructor(private http: HttpClient) { }

  //  Crear 
  addUser(userData: { name: string, job: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData, this.httpOptions); 
  }

  //  Obtener 
  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(this.apiUrl, this.httpOptions); 
  }
  
  //  Editar o Actualizar 
  editUser(id: number, updatedData: { name: string, job: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, updatedData, this.httpOptions); 
  }

  // Eliminar
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions); 
  }
}
