import { Injectable } from '@angular/core';

import { TITANIC_PASSENGERS } from '../../../shared/titanic-data';
import { PassengerData } from '../../../shared/models/titanic-data.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly passengers: PassengerData[] = TITANIC_PASSENGERS;

  public getTotalPassengers(): number {
    return this.passengers.length;
  }

  public getSurvivedCount(): number {
    return this.passengers.filter((p) => p.survived === 1).length;
  }

  public getDeceasedCount(): number {
    return this.passengers.filter((p) => p.survived === 0).length;
  }

  public getSurvivalRatePercent(): number {
    const total = this.getTotalPassengers();
    if (total === 0) {
      return 0;
    }
    return Math.round((this.getSurvivedCount() / total) * 1000) / 10; 
  }

  public getAverageAge(): number {
    const ages = this.passengers.map((p) => p.age).filter((a): a is number => a !== null);
    if (ages.length === 0) {
      return 0;
    }
    const sum = ages.reduce((acc, age) => acc + age, 0);
    return Math.round((sum / ages.length) * 10) / 10;
  }

  public getAverageFare(): number {
    const fares = this.passengers.map((p) => p.fare);
    if (fares.length === 0) {
      return 0;
    }
    const sum = fares.reduce((acc, fare) => acc + fare, 0);
    return Math.round((sum / fares.length) * 100) / 100;
  }

  public getMaleCount(): number {
    return this.passengers.filter((p) => p.sex === 'male').length;
  }

  public getFemaleCount(): number {
    return this.passengers.filter((p) => p.sex === 'female').length;
  }

  public getAverageAgeSurvived(): number {
    const ages = this.passengers
      .filter((p) => p.survived === 1)
      .map((p) => p.age)
      .filter((a): a is number => a !== null);
    if (ages.length === 0) {
      return 0;
    }
    const sum = ages.reduce((acc, age) => acc + age, 0);
    return Math.round((sum / ages.length) * 10) / 10;
  }

  public getAverageAgeDeceased(): number {
    const ages = this.passengers
      .filter((p) => p.survived === 0)
      .map((p) => p.age)
      .filter((a): a is number => a !== null);
    if (ages.length === 0) {
      return 0;
    }
    const sum = ages.reduce((acc, age) => acc + age, 0);
    return Math.round((sum / ages.length) * 10) / 10;
  }

  public getMostCommonEmbarked(): { code: string; label: string; count: number } {
    const counts = new Map<string, number>();

    for (const p of this.passengers) {
      const code = p.embarked ?? '';
      if (code === '') {
        continue;
      }
      counts.set(code, (counts.get(code) ?? 0) + 1);
    }

    let bestCode = 'S';
    let bestCount = 0;
    for (const [code, count] of counts.entries()) {
      if (count > bestCount) {
        bestCode = code;
        bestCount = count;
      }
    }

    return {
      code: bestCode,
      label: bestCode === 'S' ? 'Southampton' : bestCode === 'C' ? 'Cherbourg' : 'Queenstown',
      count: bestCount,
    };
  }

  public getSurvivalRateBySex(sex: 'male' | 'female'): number {
    const group = this.passengers.filter((p) => p.sex === sex);
    if (group.length === 0) {
      return 0;
    }
    const survived = group.filter((p) => p.survived === 1).length;
    return Math.round((survived / group.length) * 1000) / 10;
  }

  public getSurvivedCountBySex(sex: 'male' | 'female'): number {
    return this.passengers.filter((p) => p.sex === sex && p.survived === 1).length;
  }

  public getPassengerCountByClass(pclass: 1 | 2 | 3): number {
    return this.passengers.filter((p) => p.pclass === pclass).length;
  }

  public getSurvivedCountByClass(pclass: 1 | 2 | 3): number {
    return this.passengers.filter((p) => p.pclass === pclass && p.survived === 1).length;
  }
}
