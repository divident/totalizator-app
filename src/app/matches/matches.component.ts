import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../services/match.service';
import { Match } from '../shared/match';
import { MatchesDataSource } from './MatchesDataSource';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap, debounceTime } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  matches: MatchesDataSource;
  matchesCount: number;
  teams: string[];
  leagues: string[];

  filteredTeams: Observable<string[]>;
  filteredLeagues: Observable<string[]>;
  leagueControl = new FormControl();
  teamControl = new FormControl();

  private displayedCoulumns: string[] = ["league", "team_one", "team_two", "exchange", "play_date"]
  queryData = {
    "team": "",
    "league": ""
  }

  constructor(private matchService: MatchService,
    private router: Router) { }

  ngOnInit() {
    this.matches = new MatchesDataSource(this.matchService);
    this.matches.loadMatches();
    this.matchService.getTeams().subscribe(teams => this.teams = teams)
    this.matchService.getLeagues().subscribe(leagues => this.leagues = leagues);
    this.filteredLeagues = this.leagueControl.valueChanges.pipe(
      tap(value => console.log(value)),
      map(value => this._filter(value, this.leagues))
    )

    this.filteredTeams = this.teamControl.valueChanges.pipe(
      tap(value => console.log(value)),
      map(value => this._filter(value, this.teams))
    )
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadMatches())
    ).subscribe();
  }

  private _filter(value: string, options: string[]): string[] {
    if (!value) return options;
    const filterValue = value.toLocaleLowerCase();
    return options.filter(option => option.toLocaleLowerCase().includes(filterValue))
  }


  setTeam(value: string) {
    console.log("Set team", value)
    this.queryData["team"] = value;
    this.loadMatches();
  }

  setLeague(value: string) {
    console.log("Set league", value)
    this.queryData["league"] = value;
    this.loadMatches();
  }

  loadMatches() {
    this.matches.loadMatches(this.queryData["team"], this.queryData["league"], this.paginator.pageIndex)
  }

  clearFilters() {
    for (let key in this.queryData) {
      this.queryData[key] = ""
    }
    this.leagueControl.reset();
    this.teamControl.reset();
    this.matches.loadMatches();
  }
 
  selectMatch(row): void {
    console.log("Select match", row)
    this.router.navigate(["/matches", row.id])
  }
}
