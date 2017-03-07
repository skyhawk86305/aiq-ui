export function ScrollToTopDirective() {
  return {
    restrict: 'A',
    link(scope, elem, attrs) {
      scope.$watch(attrs.scrollToTop, () => elem[0].scrollTop = 0);
    }
  };
}
