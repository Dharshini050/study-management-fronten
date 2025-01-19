import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logUrl = 'http://127.0.0.1:8000/log-frontend/'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  logMessage(message: string, level: string = 'INFO') {
    const logData = { message, level };
    this.http.post(this.logUrl, logData).subscribe(
      () => console.log('Log sent successfully'),
      error => console.error('Error sending log:', error)
    );
  }
}
