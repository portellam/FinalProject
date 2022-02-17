import { Component, Input } from '@angular/core';
import { LoginComponent } from './login/login.component';
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
  }

  // Login
  inputLogin(_User: User, _userVisible: boolean) {
    this._User = _User;
    this.userVisible = _userVisible;
  }
}
