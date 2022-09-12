import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notes } from './notes';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class NotesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getNotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(`${this.apiServerUrl}/notes/all`);
  }

  public addNotes(notes: Notes): Observable<Notes> {
    return this.http.post<Notes>(`${this.apiServerUrl}/notes/add`, notes);
  }

  public updateNotes(notes: Notes): Observable<Notes> {
    return this.http.put<Notes>(`${this.apiServerUrl}/notes/update`, notes);
  }

  public deleteNotes(notesId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notes/delete/${notesId}`);
  }
}
