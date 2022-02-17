import { Component, Input } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';

  // PROPERTIES //
  // User
  _User: User = {
    id: 0,
    username: '',
    first_name: ''
  }

  // TOGGLES
  userVisible: boolean = false;
  
  // ================================================================================ //
  // METHODS //

  // DEPENDENCIES
  constructor(private _UserService: UserService) {
    this.getLogin();
    this.getAllUsers();
  }

  // CRUD FUNCTIONS
  getLogin() {
    this._User = this._UserService.get();
  }

  getAllUsers() {
    this.getLogin();
    this._UserService.getAll(
      (results: User[]) => {
        for(var i: number = 0; i < results.length; i++)
        {
          if(this._User == results[i])
          {
            return;
          }    
        }
      }
    );
    this.getLogin();
  }
}
