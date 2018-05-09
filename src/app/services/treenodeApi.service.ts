import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TreenodeApiService {
  private dataUrl = './sampledata.csv';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.dataUrl, {responseType: 'text'});
  }
}
