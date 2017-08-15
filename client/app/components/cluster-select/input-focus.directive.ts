export function ClusterSelectInputFocus() {
  return {
    link(scope, elem, attrs) {
      elem.bind('click',() => {
        window.setTimeout(function(){
          document.getElementById('cluster-select-filter').focus();
        }, 0);
      })
    }
  };
}
