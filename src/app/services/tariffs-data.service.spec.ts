import { TestBed } from '@angular/core/testing';
import { TariffsDataService } from './tariffs-data.service';
import { TariffItemModel } from '../models/tariff-item.model';

describe('TariffsDataService', () => {
  let service: TariffsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariffsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of TariffItemModel array', (done: DoneFn) => {
    service.getAll().subscribe((tariffs: TariffItemModel[]) => {
      expect(tariffs).toBeTruthy();
      expect(tariffs.length).toBe(9);
      expect(tariffs[0].name).toBe('Tariff A');
      done();
    });
  });

  it('should return the correct data for a specific tariff', (done: DoneFn) => {
    service.getAll().subscribe((tariffs: TariffItemModel[]) => {
      const tariff = tariffs.find(tariff => tariff.id === '4');
      expect(tariff).toBeTruthy();
      expect(tariff?.name).toBe('Tariff D');
      expect(tariff?.price).toBe(1.5);
      expect(tariff?.supplier).toBe('Company D');
      done();
    });
  });
});
