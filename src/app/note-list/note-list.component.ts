import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NoteService} from '../service/note.service';
import { Note } from '../model/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})

export class NoteListComponent implements OnInit {

  @Input() notes: Note[];
  @Output() notesChange = new EventEmitter();

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getAll()
      .subscribe((noteData) => {
        this.notes = noteData;
        this.notesChange.emit(this.notes);
      });
  }

  deleteNote(note: Note) {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.delete(note.id).subscribe();
    this.notesChange.emit(this.notes);
  }
}
