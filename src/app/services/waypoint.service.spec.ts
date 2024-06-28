import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waypoint } from '../models/waypoint';

@Injectable({
  providedIn: 'root',
})
export class WaypointService {
  private apiUrl = 'http://localhost:8080/api/waypoint'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getWaypoints(): Observable<Waypoint[]> {
    return this.http.get<Waypoint[]>(this.apiUrl);
  }

  createWaypoint(waypoint: Waypoint): Observable<Waypoint> {
    return this.http.post<Waypoint>(this.apiUrl, waypoint);
  }

  updateWaypoint(id: number, waypoint: Waypoint): Observable<Waypoint> {
    return this.http.put<Waypoint>(`${this.apiUrl}/${id}`, waypoint);
  }

  deleteWaypoint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
