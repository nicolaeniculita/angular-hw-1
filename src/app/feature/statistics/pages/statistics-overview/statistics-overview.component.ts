import { Component } from '@angular/core';

import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics-overview',
  templateUrl: './statistics-overview.component.html',
  styleUrls: ['./statistics-overview.component.scss'],
  standalone: false,
})
export class StatisticsOverviewComponent {
  public readonly generalCards: StatCard[];
  public readonly genderCards: StatCard[];
  public readonly classCards: StatCard[];

  public constructor(private readonly statisticsService: StatisticsService) {
    const totalPassengers = this.statisticsService.getTotalPassengers();
    const totalSurvivors = this.statisticsService.getSurvivedCount();
    const totalDeaths = this.statisticsService.getDeceasedCount();
    const survivalRate = this.statisticsService.getSurvivalRatePercent();

    const malePassengers = this.statisticsService.getMaleCount();
    const femalePassengers = this.statisticsService.getFemaleCount();
    const maleSurvivors = this.statisticsService.getSurvivedCountBySex('male');
    const femaleSurvivors = this.statisticsService.getSurvivedCountBySex('female');
    const maleSurvivalRate = this.statisticsService.getSurvivalRateBySex('male');
    const femaleSurvivalRate = this.statisticsService.getSurvivalRateBySex('female');

    const firstClassPassengers = this.statisticsService.getPassengerCountByClass(1);
    const secondClassPassengers = this.statisticsService.getPassengerCountByClass(2);
    const thirdClassPassengers = this.statisticsService.getPassengerCountByClass(3);

    const firstClassSurvivors = this.statisticsService.getSurvivedCountByClass(1);
    const secondClassSurvivors = this.statisticsService.getSurvivedCountByClass(2);
    const thirdClassSurvivors = this.statisticsService.getSurvivedCountByClass(3);

    this.generalCards = [
      { label: 'TOTAL PASSENGERS', value: totalPassengers },
      { label: 'TOTAL SURVIVORS', value: totalSurvivors },
      { label: 'TOTAL DEATHS', value: totalDeaths },
      { label: 'SURVIVAL RATE', value: `${survivalRate}%` },
    ];

    this.genderCards = [
      { label: 'MALE PASSENGERS', value: malePassengers },
      { label: 'FEMALE PASSENGERS', value: femalePassengers },
      { label: 'MALE SURVIVORS', value: maleSurvivors },
      { label: 'FEMALE SURVIVORS', value: femaleSurvivors },
      { label: 'MALE SURVIVAL RATE', value: `${maleSurvivalRate}%` },
      { label: 'FEMALE SURVIVAL RATE', value: `${femaleSurvivalRate}%` },
    ];

    this.classCards = [
      { label: '1ST CLASS PASSENGERS', value: firstClassPassengers },
      { label: '2ND CLASS PASSENGERS', value: secondClassPassengers },
      { label: '3RD CLASS PASSENGERS', value: thirdClassPassengers },
      { label: '1ST CLASS SURVIVORS', value: firstClassSurvivors },
      { label: '2ND CLASS SURVIVORS', value: secondClassSurvivors },
      { label: '3RD CLASS SURVIVORS', value: thirdClassSurvivors },
    ];
  }
}

type StatCard = {
  label: string;
  value: string | number;
};
