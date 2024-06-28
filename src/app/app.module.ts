import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WaypointDialogComponent } from './components/waypoint-dialog/waypoint-dialog.component';
import { WaypointService } from './services/waypoint.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    WaypointDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    GoogleMapsModule,
    FormsModule,
  ],
  providers: [WaypointService],
  bootstrap: [AppComponent],
})
export class AppModule {}
