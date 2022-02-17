import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddNote } from './add-note';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddNoteService {

  constructor(private http: HttpClient) { }

  postNote(_AddNote: AddNote, cb: any){
    this.http.post<AddNote>(`${environment.apiUrl}/api/WallStreetBets/notes?favID=${_AddNote.favID}&noteDescription=${_AddNote.noteDescription}`, _AddNote).subscribe(cb);
  }
}
