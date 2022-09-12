import { Component, OnInit } from '@angular/core';
import { Notes } from './notes';
import { NotesService } from './notes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'notesapp';

  public notes: Notes[];
  public editNotes: Notes;
  public deleteNotes: Notes;
  public viewNotes: Notes;

  constructor(private notesService: NotesService){
  }

  ngOnInit() {
    this.getNotes();
  }

  public getNotes(): void {
    this.notesService.getNotes().subscribe(
      (response: Notes[]) => {
        this.notes = response;
        console.log(this.notes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public onAddNotes(addForm: NgForm): void {
    document.getElementById('add-notes-form').click();
    this.notesService.addNotes(addForm.value).subscribe(
      (response: Notes) => {
        console.log(response);
        this.getNotes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  

  public onUpdateNotes(notes: Notes): void {
    this.notesService.updateNotes(notes).subscribe(
      (response: Notes) => {
        console.log(response);
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNotes(notesId: number): void {
    this.notesService.deleteNotes(notesId).subscribe(
      (response: void) => {
        console.log(response);
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //search note function

  public searchNotes(key: string): void {
    console.log(key);
    const results: Notes[] = [];
    for (const notes of this.notes) {
      if (notes.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || notes.content.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(notes);
      }
    }
    this.notes = results;
    if (results.length === 0 || !key) {
      this.getNotes();
    }
  }

  // Modal

  public onOpenModal(notes: Notes, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addNotesModal');
    }
    if (mode === 'edit') {
      this.editNotes = notes;
      button.setAttribute('data-target', '#updateNotesModal');
    }
    if (mode === 'delete') {
      this.deleteNotes = notes;
      button.setAttribute('data-target', '#deleteNotesModal');
    }
    if (mode === 'view') {
      this.viewNotes = notes;
      button.setAttribute('data-target', '#viewNotesModal');
    }
    container.appendChild(button);
    button.click();
  }
  
}
