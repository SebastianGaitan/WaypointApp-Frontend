import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Waypoint } from '../../models/waypoint';
import { WaypointService } from '../../services/waypoint.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() waypoint!: Waypoint;
  @Output() close = new EventEmitter<void>();

  constructor(private waypointService: WaypointService) {}

  save(): void {
    this.waypointService
      .updateWaypoint(this.waypoint.id!, this.waypoint)
      .subscribe(() => {
        this.close.emit();
      });
  }

  delete(): void {
    this.waypointService.deleteWaypoint(this.waypoint.id!).subscribe(() => {
      this.close.emit();
    });
  }
}
