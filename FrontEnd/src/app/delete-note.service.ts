import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteNote } from './delete-note';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteNoteService {

  constructor(private http: HttpClient) { }

  deleteNote(deleteNote: DeleteNote, cb: any){
    this.http.delete(`${environment.apiUrl}/api/WallStreetBets/notes?noteID=${deleteNote.noteID}`).subscribe(cb);
  }

  // Example URL: https://localhost:7262/api/WallStreetBets/notes?noteID=20
}
