import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupportedLang } from '../models/supported-lang.model';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { DEFAULT_LANG } from '../config/i18n.config';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private readonly _langKey = 'lang';
  private readonly _currentLang$ = new BehaviorSubject<SupportedLang>('fr_fr');
  readonly currentLang$ = this._currentLang$.asObservable();

  constructor(
    private readonly translateService: TranslateService,
    private readonly location: Location
  ) { 
    const params = new URLSearchParams(this.location.path());
    const lang = params.get(this._langKey) as SupportedLang || DEFAULT_LANG;
    this.translateService.use(lang);
    this._currentLang$.next(lang)
  }

  use(lang: SupportedLang) {
    this._currentLang$.next(lang);
    this.translateService.use(lang);
    this.location.replaceState('', `?${this._langKey}=${lang}`);
  }
}
