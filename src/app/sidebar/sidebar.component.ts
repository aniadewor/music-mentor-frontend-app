import { Component } from '@angular/core';
import { UserStateService } from '../service/user-state-service.service';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 sidebarVisible: boolean = false;
 user: User = new User();
 Role = Role;

 constructor(private userStateService: UserStateService, private userService: UserServiceService){}
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
   ngOnInit() {
    const currentUser = this.userStateService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.user.id = currentUser.id;
    }
    if (currentUser?.email){
this.userService.getUserByEmail(currentUser?.email).subscribe(userDate => {
        this.user = userDate;
  })
    }
  }
  }
  
