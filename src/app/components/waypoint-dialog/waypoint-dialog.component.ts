import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface WaypointDialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-waypoint-dialog',
  templateUrl: './waypoint-dialog.component.html',
})
export class WaypointDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WaypointDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WaypointDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
