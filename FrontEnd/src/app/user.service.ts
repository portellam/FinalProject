import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // PROPERTIES //
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
  
  // TOGGLES
  userVisible: boolean = false;
  // ================================================================================ //

  // METHODS //

  // DEPENDENCIES
  constructor(private _HttpClient: HttpClient) {
  }

  // CRUD FUNCTIONS
  getAll(cb: any) {
    this._HttpClient.get<User[]>(`https://localhost:7262/api/WallStreetBets?`).subscribe(cb);
  }

  getLogin() {
    return this.userVisible;
  }

  get() {
    return this._User;
  }

  post(_User: User, cb: any) {
    this._HttpClient.post<User>(`https://localhost:7262/api/WallStreetBets?username=${_User.username}&first_name=${_User.first_name}`, _User).subscribe(cb);
  }

  put(_User: User, cb: any) {
    this._HttpClient.put<User>(`https://localhost:7262/api/WallStreetBets?username=${_User.username}&first_name=${_User.first_name}`, _User).subscribe(cb);
  }

  // TODO: NOT tested! 
  // NOTE: allow a user to delete account, use username andn firstName as authentication.
  delete(_User: User, cb: any) {
    this._HttpClient.delete<User>(`https://localhost:7262/api/WallStreetBets?username=${_User.username}&first_name=${_User.first_name}`).subscribe(cb);
  }

  // Login  // TODO: this may work. do the same as userVisible.
  signIn(_User: User) {
    this._User = _User;
    this.userVisible = true;
  }

  signOut(_User: User) {
    this._User = this.newUser;
    this.userVisible = false;
  }

  // ================================================================================ //
}
