import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarketStack } from './market-stack';
import { StockInfo } from './stock-info';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketStackService {

  constructor(private http: HttpClient) { }

  retrieveMarketStackInfo(ticker: string, cb: any) {
    this.http.get<MarketStack>(
      `${environment.apiUrl}/api/WallStreetBets/marketstack?ticker=${ticker}`)
      .subscribe(cb);
  }
}
