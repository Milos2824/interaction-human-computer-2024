import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageModel } from '../models/page.model';
import { FlightModel } from '../models/flight.model';
import { SafePipe } from '../safe.pipe';
import { RouterLink } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-home',
  imports: [/*JsonPipe, */NgIf, HttpClientModule, NgFor, CommonModule, SafePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public webService: WebService
  public flights: PageModel<FlightModel> | undefined = undefined;
  constructor() {
    this.webService = WebService.getInstance()
    
  }
  ngOnInit(): void {
    this.webService.getRecommendedFlights().subscribe(res => this.flights = res)
  }

  public getMapUrl() {
    const destination = this.flights?.content[0]?.destination || 'World';
    return `https://www.google.com/maps?output=embed&q=${encodeURIComponent(destination)}`;
  }
}
