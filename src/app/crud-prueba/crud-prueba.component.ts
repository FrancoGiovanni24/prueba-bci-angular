import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../service/UserService';
@Component({
  selector: 'app-crud-prueba',
  templateUrl: './crud-prueba.component.html',
  styleUrls: ['./crud-prueba.component.scss'],
})

export class CrudPruebaComponent implements OnInit {

  // Configuración de la tabla de Angular Material
  displayedColumns: string[] = ['id', 'name', 'job', 'actions'];
  dataSource: User[] = [];

  // Variables para crear y editar
  newUser: { name: string, job: string } = { name: '', job: '' };
  editUserObj: User | null = null;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }


 // Carga la lista de usuarios 
  loadUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.dataSource = response.data;
    });
  }

  //crear un usuario
  createUser(): void {
    if (!this.newUser.name || !this.newUser.job) return;

    this.userService.addUser(this.newUser).subscribe(response => {
      alert(`Usuario CREADO (Simulado) con ID: ${response.id}`);
      // Se calcula el ID máximo actual en la tabla y se le suma 1 para el nuevo usuario.
      const maxId = this.dataSource.reduce((max, user) => (user.id && user.id > max ? user.id : max), 0);
      // Simular la adición del usuario en la tabla para actualizar la UI
      this.dataSource = [...this.dataSource, { ...this.newUser, id: maxId + 1 }];
      this.newUser = { name: '', job: '' };
    });
  }

  //Agrega id y suma ID de api 
  startEdit(user: User): void {
    this.editUserObj = { ...user }; 
  }
  
  //Guarda las modificaciones realizada en los usuarios 
  saveEdit(): void {
    if (!this.editUserObj || !this.editUserObj.id) return;
    this.userService.editUser(this.editUserObj.id, this.editUserObj as { name: string, job: string }).subscribe(response => {
      alert(`Usuario ID ${this.editUserObj!.id} EDITADO (Simulado)`);
      this.dataSource = this.dataSource.map(u => 
        u.id === this.editUserObj!.id ? { ...u, name: response.name, job: response.job } : u
      );
      this.editUserObj = null;
    });
  }

  // 4. Elimina un usuario 
  deleteUser(id: number | undefined): void {
    if (!id || !confirm(`¿Seguro que deseas eliminar el usuario con ID ${id}?`)) return;
    // Se verifica que el ID no sea undefined antes de proceder.
    if (id === undefined) {
      return;
    }
    if (!confirm(`¿Seguro que deseas eliminar el usuario con ID ${id}?`)) return;
    this.userService.deleteUser(id).subscribe(() => {
      alert(`Usuario ID ${id} ELIMINADO (Simulado - Status 204)`);
      this.dataSource = this.dataSource.filter(u => u.id !== id);
    });
  }
}
