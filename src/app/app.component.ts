import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faClock, faFilePdf, faFolder } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { interval, map, startWith, Subject, takeUntil } from 'rxjs';
import { CardLinkDirective } from "./directives/card-link.directive";
import { SmartLinkDirective } from "./directives/smart-link.directive";
import { TiltCardDirective } from './directives/tilt-card.directive';
import { SupportedLang } from './models/supported-lang.model';
import { LangService } from './services/lang.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslatePipe, FontAwesomeModule, SmartLinkDirective, TiltCardDirective, CardLinkDirective, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly langService = inject(LangService);
  readonly currentLangControl = new FormControl<SupportedLang>('en_us');
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.langService.currentLang$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLangControl.setValue(lang, { emitEvent: false })
      })

    this.currentLangControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        if (!lang) return;
        this.langService.use(lang)
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly dateTime$ = interval(1000)
    .pipe(
      startWith(this.nowDateTime),
      map(() => this.nowDateTime
      )
    )

  constructor(private readonly library: FaIconLibrary) {
    this.library.addIcons(
      faGithub,
      faLinkedinIn,
      faFilePdf,
      faFolder,
      faClock
    )
  }

  private get nowDateTime() {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Paris',
      weekday: 'long',
    }).format(new Date())
  }
}
