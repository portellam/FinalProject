import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // TODO: added debug. Fixed user login. Need to carry over at app component, otherwise user login clears.

  // PROPERTIES //
  // User
  Users: User[] = [];
  _User: User = {
    id: 0,
    username: '',
    first_name: ''
  }
  newUser: User = {
    id: 0,
    username: '',
    first_name: ''
  }
  //_username: string = '';

  // TOGGLES
  userVisible: boolean = false;
  signUpVisible: boolean = false;
  deleteVisible: boolean = false;
  editVisible: boolean = false;
  // ================================================================================ //

  // METHODS //

  // DEPENDENCIES
  constructor(private _UserService: UserService, private _Router:Router) {
    this.getAll();
  }
  
  ngOnInit(): void {
  }

  // CRUD FUNCTIONS
  getAll() {
    this._UserService.getAll(
      (result: User[]) => {
        this.Users = result;
      }
    );
  }

  getLogin() {
    this._User = this._UserService.get();
    this.userVisible = this._UserService.getLogin();
  }

  post() {
    this._UserService.post(this._User, this.Users);
  }

  put() {
    this._UserService.put(this._User, this.Users);
  }

  // TODO: test
  delete() {
    this._UserService.delete(this._User, this.Users);
  }
  // ================================================================================ //

  // FUNCTIONS

  // put
  edit() {
    // refresh List
    this.getAll();

    // sort List for username match, if true exit now.
    for(var i: number = 0; i < this.Users.length; i++)
    {
      while (i != this._User.id)
      {
        if(this.newUser.username == this.Users[i].username)
        {
          alert(`Failure! Username is already taken.`)
          this.clearNew();
          return;
        }
        break;
      }
    }

    if(this.newUser.username.length <= 0)
    {
      this.clearNew();
      alert(`Failure! Username is invalid.`)
      return;
    }

    if(this.newUser.first_name.length <= 0)
    {
      this.clearNew();
      alert(`Failure! First-name is invalid.`)
      return;
    }

    if(this.newUser.username.length > 0 && this.newUser.first_name.length > 0)
    {
      // no match
      alert(`"${this.newUser.username}" is available.`);

      // update user
      this._User = this.newUser;
      this.clearNew();

      // put
      this.put();
      this.toggleEdit();
      alert(`Success! User updated.`)
    }
  }

  // delete
  // TODO: not tested!
  deleteThis() {
    // refresh List
    this.getAll();

    // sort List for username match, if true delete user.
    for(var i: number = 0; i < this.Users.length; i++)
    {
      // match
      if(this._User.username == this.Users[i].username && this._User.first_name == this.Users[i].first_name)
      {
        // delete
        this.delete();
        this.clear();
        this.toggleDelete();
        alert(`Authenticated! User deleted.`)
      }

      // NOTE: this code is NOT necessary, but requires a known index of the user to function.
      /*  
      else if(this._username != this.Users[i].username && this._firstName == this.Users[i].first_name)
      {
        alert(`Failure! Username mis-match.`)
      }
      else if(this._username == this.Users[i].username && this._firstName != this.Users[i].first_name)
      {
        alert(`Failure! First-name mis-match.`)
      }
      */
    }
    // no match
    alert(`"Not Authenticated! Username and/or First-name mis-match!`);
  }

  // function clears interface instance.
  clear() {
    this._User.id = 0;
    this._User.username = '';
    this._User.first_name = '';
  }

  clearNew() {
    this.newUser.id = 0;
    this.newUser.username = '';
    this.newUser.first_name = '';
  }

  // function checks if user exists, and signs in existing user.
  signIn() {
    // refresh List
    this.getAll();

    // sort List for match. If true, sign-in success.
    for(var i: number = 0; i < this.Users.length; i++)
    {
      if(this._User.username == this.Users[i].username)
      {
        this._UserService.signIn(this.Users[i]);

        this.getLogin();
        alert(`Success! Login complete.`)

        // auto re-direct
        this._Router.navigate(['/']);
        return;
      }
    }
    alert(`Failure! Username does not exist.`)
  }

  // functions signs out user.
  signOut() {
    this._UserService.signOut(this._User);

    this.getLogin();

    alert(`User signed out. Good bye.`)

    // auto re-direct
    //this._Router.navigate(['/']); // NOTE: leave as is.
  }

  // function checks if user does NOT exist, and signs up new user.
  signUp() {
    // refresh List
    this.getAll();

    // sort List for match. If true, sign-up failure.
    for(var i: number = 0; i < this.Users.length; i++)
    {
      if(this._User.username == this.Users[i].username)
      {
        alert(`Failure! Username is already taken.`)
        this.clear();
        return;
      }
    }

    // add User
    this.getAll();
    this.post();
    alert(`Success! Registration complete.`)

    // auto sign-in
    this.signIn();
  }
  // ================================================================================ //

  // TOGGLES
  toggleEdit() {
    if(this.deleteVisible) {
      this.toggleDelete();
    }

    this.editVisible = !this.editVisible;
  }

  toggleDelete() {
    
    if(this.editVisible) {
      this.toggleEdit();
    }
    this.deleteVisible = !this.deleteVisible;
  }

  toggleSignUp() {
      this.signUpVisible = !this.signUpVisible;
  }
}
