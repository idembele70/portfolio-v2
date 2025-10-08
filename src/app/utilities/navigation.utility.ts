export class NavigationUtility {
  static openLink(documentRef: Document, href: string | null) {
    if (!href || href === '#') return;
    documentRef.defaultView?.open(href, '_blank', 'noopener, noreferrer')
  }
};
