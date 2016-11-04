/***
Module dected_maxheight
@class dected_maxheight
@main all
@author Victor Morales
***/

yOSON.AppCore.addModule('dected_maxheight', (Sb) => {
  let st              = {},
      dom             = {},
      defaults,
      events,
      fn,
      catchDom,
      afterCatchDom,
      suscribeEvents,
      initialize;

  defaults = {
    parent      : ".parent",
    el          : ".view_more",
    classEl     : "class",
    textHeight  : ".eleHeight",
    maxHeight   : 0
  };

  catchDom = () => {
    dom.parent      = $(st.parent);
    dom.el          = $(st.el, dom.parent);
    dom.textHeight  = $(st.textHeight, dom.parent);
  };

  fn = {
    compareHeight() {
      if (dom.textHeight.height() > st.maxHeight) {
        dom.el.addClass(st.classEl);
      }
    }
  };

  initialize = (opts) => {
    st = $.extend({}, defaults, opts);
    catchDom();
    fn.compareHeight();
  };

return { init: initialize };
}, [

]);
