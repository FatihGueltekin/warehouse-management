import { _ as __nuxt_component_0 } from "./nuxt-link-4qR3BMav.js";
import { _ as _export_sfc, a as __nuxt_component_1 } from "../server.mjs";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "ufo";
import "hookable";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout" }, _attrs))} data-v-943fb6ce><nav class="menu" data-v-943fb6ce><ul data-v-943fb6ce><li data-v-943fb6ce>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Ana sayfa`);
      } else {
        return [
          createTextVNode("Ana sayfa")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-943fb6ce>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/araclar" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Araclar`);
      } else {
        return [
          createTextVNode("Araclar")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-943fb6ce>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/urunler" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Ürünler`);
      } else {
        return [
          createTextVNode("Ürünler")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-943fb6ce>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/satislar" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Satislar`);
      } else {
        return [
          createTextVNode("Satislar")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav><main data-v-943fb6ce>`);
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(`</main><footer data-v-943fb6ce><p data-v-943fb6ce>© 2024</p></footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-943fb6ce"]]);
export {
  _default as default
};
//# sourceMappingURL=default-D7VaM3Uo.js.map
