import { provideTranslateService } from "@ngx-translate/core";
import { SupportedLang } from "../models/supported-lang.model";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

export const FALLBACK_LANG: SupportedLang = 'fr_fr';
export const DEFAULT_LANG: SupportedLang = 'fr_fr';
export const SUPPORTED_LANGS: readonly SupportedLang[] = ['en_us', 'fr_fr'];

const I18N_PREFIX = 'assets/i18n/';
const I18N_SUFFIX = '.json';

export const i18nProviders = [
  provideTranslateService({
    loader: provideTranslateHttpLoader({
      prefix: I18N_PREFIX,
      suffix: I18N_SUFFIX
    }),
    fallbackLang: FALLBACK_LANG,
    lang: DEFAULT_LANG,
  }),
]