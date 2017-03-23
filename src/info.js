import { DateTime } from './datetime';
import { Locale } from './impl/locale';

export class Info {
  static hasDST(zone = DateTime.defaultZone) {
    return !zone.universal && DateTime.now().month(1).offset() !== DateTime.now().month(5).offset();
  }

  static months(length, locale, numbering) {
    return new Locale(locale, numbering).months(length);
  }

  static monthsFormat(length, locale, numbering) {
    return new Locale(locale, numbering).months(length, true);
  }

  static weekdays(length, locale, numbering) {
    return new Locale(locale, numbering).weekdays(length);
  }

  static weekdaysFormat(length, locale, numbering) {
    return new Locale(locale, numbering).weekdays(length, true);
  }

  static meridiems(locale, numbering) {
    return new Locale(locale, numbering).meridiems();
  }

  static features() {
    let intl = false, ftp = false, zones = false;

    if (Intl.DateTimeFormat) {
      intl = true;

      ftp = typeof new Intl.DateTimeFormat().formatToParts !== 'undefined';

      try {
        Intl.DateTimeFormat({ timeZone: 'America/New_York' });
        zones = true;
      } catch (e) {
        zones = false;
      }
    }

    return { intl, intlParseFormat: ftp, englishParseFormat: ftp, timezones: zones };
  }
}