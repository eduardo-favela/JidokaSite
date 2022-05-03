import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import API_URI from './API_URI'

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  sendTokenToBackend(token: any) {
    return this.http.post(`${API_URI}/contacto/sendMail`,token)
  }
}
