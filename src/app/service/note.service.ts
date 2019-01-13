import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../model/note';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class NoteService {

  private notesUrl = 'http://localhost:4444/api/notes';

  constructor(
    private http: HttpClient) { }

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  get(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.notesUrl}/${id}`);
  }

  create(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, httpOptions);
  }

  update(note: Note): Observable<Note> {
    return this.http.put<Note>(this.notesUrl, note, httpOptions);
  }

  delete(id: number): Observable<Note> {
    return this.http.delete<Note>(`${this.notesUrl}/${id}`, httpOptions);
  }
}
