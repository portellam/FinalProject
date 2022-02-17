import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteFavorite } from './delete-favorite';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteFavoriteService {

  constructor(private http: HttpClient) { }

  deleteFavorite(deleteFavorite: DeleteFavorite, cb: any){
    this.http.delete(`${environment.apiUrl}/api/WallStreetBets/favorites?username=${deleteFavorite.username}&ticker=${deleteFavorite.ticker}`).subscribe(cb)
  }
}
