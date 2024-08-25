import { Injectable } from '@angular/core';
import { TariffItemModel } from '../models/tariff-item.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TariffsDataService {
  getAll(): Observable<TariffItemModel[]> {
    //Mock get from server
    return of([
      {
        id: '1',
        name: "Tariff A",
        price: 3.5,
        supplier: 'Company A',
        description: 'Description of Tariff A'
      },
      {
        id: '2',
        name: 'Tariff B',
        price: 4.0,
        supplier: 'Company B',
        description: 'Description of Tariff B'
      },
      {
        id: '3',
        name: 'Tariff C',
        price: 3.8,
        supplier: 'Company C',
        description: 'Description of Tariff C'
      },
      {
        id: '4',
        name: "Tariff D",
        price: 1.5,
        supplier: 'Company D',
        description: 'Description of Tariff D'
      },
      {
        id: '5',
        name: 'Tariff E',
        price: 6.0,
        supplier: 'Company E',
        description: 'Description of Tariff E'
      },
      {
        id: '6',
        name: 'Tariff F',
        price: 3.2,
        supplier: 'Company F',
        description: 'Description of Tariff F'
      },
      {
        id: '7',
        name: 'Tariff G',
        price: 4.6,
        supplier: 'Company G',
        description: 'Description of Tariff G'
      },
      {
        id: '8',
        name: 'Tariff H',
        price: 12,
        supplier: 'Company H',
        description: 'Description of Tariff H'
      },
      {
        id: '9',
        name: 'Tariff I',
        price: 2.2,
        supplier: 'Company I',
        description: 'Description of Tariff I'
      }
    ]);
  }
}
