import { Component, OnInit } from '@angular/core';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NoteService} from './service/note.service';
import { Note } from './model/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'notes';

  notes: Note[];

  constructor(
    public dialog: MatDialog,
    private noteService: NoteService) {}

  ngOnInit() {
  }

  openNoteDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NoteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((note) => {
      this.noteService.create(note).subscribe((n) => {
        this.notes.push(n);
      });
    });
  }
}
