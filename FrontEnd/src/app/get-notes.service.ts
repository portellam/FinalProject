import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetNotes } from './get-notes';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetNotesService {

  constructor(private http: HttpClient) { }

  retrieveNotesTableInfo(cb: any){
    this.http.get<GetNotes[]>(`${environment.apiUrl}/api/WallStreetBets/notes`).subscribe(cb)
  }
}
