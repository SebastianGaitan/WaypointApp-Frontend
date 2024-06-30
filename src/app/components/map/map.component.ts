import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { WaypointService } from '../../services/waypoint.service';
import { Waypoint } from '../../models/waypoint';
import {
  WaypointDialogComponent,
  WaypointDialogData,
} from '../waypoint-dialog/waypoint-dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [
    trigger('spin', [
      state('active', style({ transform: 'rotate(360deg)' })),
      transition('* => active', [
        animate(
          '1s linear',
          keyframes([
            style({ transform: 'rotate(0deg)' }),
            style({ transform: 'rotate(360deg)' }),
          ])
        ),
      ]),
      transition('active => *', [animate('0s')]),
    ]),
  ],
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  waypoints: Waypoint[] = [];
  selectedWaypoint: Waypoint | null = null;
  options: google.maps.MapOptions = {
    center: { lat: 4.711, lng: -74.0721 },
    zoom: 12,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  addMode: boolean = false;
  newWaypoint: Waypoint = {
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
  };

  constructor(
    private waypointService: WaypointService,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadWaypoints();
  }

  loadWaypoints(): void {
    this.waypointService.getWaypoints().subscribe((waypoints) => {
      this.waypoints = waypoints;
    });
  }

  enableAddMode(): void {
    this.addMode = true;
  }

  addWaypoint(event: google.maps.MapMouseEvent): void {
    if (!this.addMode) {
      return;
    }

    const latLng = event.latLng;
    if (latLng) {
      this.newWaypoint.latitude = latLng.lat();
      this.newWaypoint.longitude = latLng.lng();
      this.openDialog();
      this.addMode = false; // Stop the spinning animation
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WaypointDialogComponent, {
      width: '250px',
      data: { name: '', description: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newWaypoint.name = result.name;
        this.newWaypoint.description = result.description;
        this.saveNewWaypoint();
      } else {
        this.cancelAddMode();
      }
    });
  }

  saveNewWaypoint(): void {
    this.waypointService
      .createWaypoint(this.newWaypoint)
      .subscribe((waypoint) => {
        this.waypoints.push(waypoint);
        this.newWaypoint = {
          name: '',
          description: '',
          latitude: 0,
          longitude: 0,
        };
      });
  }

  cancelAddMode(): void {
    this.addMode = false;
    this.newWaypoint = { name: '', description: '', latitude: 0, longitude: 0 };
  }

  onMarkerClick(index: number): void {
    this.selectedWaypoint = this.waypoints[index];
  }

  closeSidebar(): void {
    this.selectedWaypoint = null;
    this.loadWaypoints(); // Refresh the waypoints after closing the sidebar
  }
}
