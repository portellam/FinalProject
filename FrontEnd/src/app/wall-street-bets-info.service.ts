import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WallStreetBetsInfo } from './wall-street-bets-info';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WallStreetBetsInfoService {

  constructor(private http: HttpClient) { }

  retrieveWallStreetBetsInfo(cb: any) {
    console.log(`${environment.apiUrl}/api/WallStreetBets/nbshare`);
    this.http.get<WallStreetBetsInfo[]>(`${environment.apiUrl}/api/WallStreetBets/nbshare`).subscribe(cb);
  }
}
