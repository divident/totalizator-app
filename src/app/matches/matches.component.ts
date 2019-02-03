import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../services/match.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, startWith} from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Match } from '../shared/match';
import { BaseDataSource } from '../shared/base-data-source';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  matches: BaseDataSource<Match>;
  matchesCount: number;
  teams: string[];
  leagues: string[];

  available = false;
  filteredTeams: Observable<string[]>;
  filteredLeagues: Observable<string[]>;
  leagueControl = new FormControl();
  teamControl = new FormControl();

  displayedCoulumns: string[] = ["league", "team_one", "team_two", "exchange", 
  "play_date", "score_team_one", "score_team_two"]

  queryData = {
    "team": "",
    "league": "",
    "page": "1",
    "available": "1"
  }


  constructor(private matchService: MatchService,
    private router: Router) { }

  ngOnInit() {
    this.matches = new BaseDataSource(this.matchService);
    this.loadMatches();
    this.matchService.getTeams().subscribe(teams => this.teams = teams)
    this.matchService.getLeagues().subscribe(leagues => this.leagues = leagues);
    this.filteredLeagues = this.leagueControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.leagues))
    )

    this.filteredTeams = this.teamControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.teams))
    )

    this.matches.getDataLength().subscribe(res => this.matchesCount = res)
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadMatches())
    ).subscribe();
  }

  setAvailable() {
    this.queryData["available"] = !this.available ? "1" : "0";
    this.loadMatches();
  }

  private _filter(value: string, options: string[]): string[] {
    if (!value) return options;
    const filterValue = value.toLocaleLowerCase();
    return options.filter(option => option.toLocaleLowerCase().includes(filterValue))
  }


  setTeam(value: string) {
    this.queryData["team"] = value;
    this.loadMatches();
  }

  setLeague(value: string) {
    this.queryData["league"] = value;
    this.loadMatches();
  }

  loadMatches() {
    let query: [string, string][] = [];
    query.push()
    for(let [key, val] of Object.entries(this.queryData)) {
      if(key == "page"){
        query.push([key, (this.paginator.pageIndex + 1).toString()]);
      }else {
        query.push([key, val])
      }
    }
    this.matches.loadData(...query)
  }

  clearFilters() {
    for (let key in this.queryData) {
      if(key == "page") continue;
      this.queryData[key] = ""
    }
    this.leagueControl.reset();
    this.teamControl.reset();
    this.matches.loadData();
  }
 
  selectMatch(row: Match): void {
    if(this.available) return;
    this.router.navigate(["/matches", row.id])
  }

  getDisplayedColumns(): string[] {
    if (!this.available) {
      return this.displayedCoulumns.filter(res => (!res.includes("score")))
    }
    else {
      return this.displayedCoulumns;
    }
  }
}
