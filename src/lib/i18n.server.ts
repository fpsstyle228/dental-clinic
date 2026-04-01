import fs from 'fs/promises';
import path from 'path';

export type Dictionaries = Record<string, Record<string, string>>;

export async function loadTranslations(locale: string, namespaces: string[] = []): Promise<Dictionaries> {
  const basePath = path.join(process.cwd(), 'public', 'locales', locale);
  const fallbackBasePath = path.join(process.cwd(), 'public', 'locales', defaultLocale);
  const dicts: Dictionaries = {};
  for (const ns of namespaces) {
    let fallback: Record<string, string> = {};
    try {
      const rawFallback = await fs.readFile(path.join(fallbackBasePath, `${ns}.json`), 'utf8');
      fallback = JSON.parse(rawFallback);
    } catch {
      fallback = {};
    }

    let current: Record<string, string> = {};
    try {
      const raw = await fs.readFile(path.join(basePath, `${ns}.json`), 'utf8');
      current = JSON.parse(raw);
    } catch {
      current = {};
    }

    // Merge so that current locale overrides fallback (defaultLocale)
    dicts[ns] = { ...fallback, ...current };
  }
  return dicts;
}

export function makeT(dicts: Dictionaries) {
  return function t(key: string, options: Record<string, string | number> = {}) {
    const [ns, k] = key.includes(':') ? key.split(':') : ['common', key];
    const value = (dicts?.[ns] && (dicts as any)[ns][k]) || key;
    if (typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (_, m) => String(options[m] ?? `{${m}}`));
    }
    return value;
  };
}

export const supportedLocales = ['en', 'es', 'uk', 'de'] as const;
export type Locale = typeof supportedLocales[number];
export const defaultLocale: Locale = 'en';
