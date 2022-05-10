import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import API_URI from './API_URI'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  setSliderImg(files: any) {
    return this.http.post(`${API_URI}/admin/setSliderImg`, files)
  }

  getSliders() {
    return this.http.get(`${API_URI}/admin/getSliders`)
  }

  deleteSlider(sliderInfo: any) {
    return this.http.post(`${API_URI}/admin/deleteSlider`, sliderInfo)
  }

  updateSlider(sliderInfo: any) {
    return this.http.post(`${API_URI}/admin/updateSlider`, sliderInfo)
  }

  getCards(cardType: any) {
    return this.http.post(`${API_URI}/admin/getCards`, cardType)
  }

  getCardsTable(cardType: any) {
    return this.http.post(`${API_URI}/admin/getCardsTable`, cardType)
  }

  updateCard(card: any) {
    return this.http.post(`${API_URI}/admin/updateCard`, card)
  }
}
