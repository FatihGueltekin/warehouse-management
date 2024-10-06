import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {
  __name: "satislar",
  __ssrInlineRender: true,
  setup(__props) {
    const sales = ref([]);
    const newSale = ref({
      satis_numarasi: "",
      satis_tarihi: "",
      satis_yili: "",
      satis_ayi: "",
      satis_g\u00FCn\u00FC: "",
      satilan_\u00FCr\u00FCnler: [],
      satis_plakasi: "",
      satis_iptal_edildi: false,
      satis_iptal_tarihi: null,
      satis_m\u00FCsteri_adi: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-fa6f2156><h1 class="page-title" data-v-fa6f2156>Sales Management</h1>`);
      if (sales.value.length) {
        _push(`<table class="sales-table" data-v-fa6f2156><thead data-v-fa6f2156><tr data-v-fa6f2156><th data-v-fa6f2156>Sale Number</th><th data-v-fa6f2156>Date</th><th data-v-fa6f2156>Customer</th><th data-v-fa6f2156>License Plate</th><th data-v-fa6f2156>Products</th><th data-v-fa6f2156>Actions</th></tr></thead><tbody data-v-fa6f2156><!--[-->`);
        ssrRenderList(sales.value, (sale) => {
          var _a2;
          var _a;
          _push(`<tr data-v-fa6f2156><td data-v-fa6f2156>${ssrInterpolate(sale.satis_numarasi)}</td><td data-v-fa6f2156>${ssrInterpolate(sale.satis_tarihi)}</td><td data-v-fa6f2156>${ssrInterpolate(sale.satis_m\u00FCsteri_adi)}</td><td data-v-fa6f2156>${ssrInterpolate(sale.satis_plakasi)}</td><td data-v-fa6f2156>${ssrInterpolate((_a2 = (_a = sale.satilan_\u00FCr\u00FCnler) == null ? void 0 : _a.join(", ")) != null ? _a2 : "")}</td><td data-v-fa6f2156><button class="btn-remove" data-v-fa6f2156>Remove</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<p data-v-fa6f2156>No sales found.</p>`);
      }
      _push(`<div class="add-sale-section" data-v-fa6f2156><h2 data-v-fa6f2156>Add New Sale</h2><div class="input-grid" data-v-fa6f2156><div class="input-group" data-v-fa6f2156><label data-v-fa6f2156>Sale Number:</label><input${ssrRenderAttr("value", newSale.value.satis_numarasi)} type="text" required data-v-fa6f2156></div><div class="input-group" data-v-fa6f2156><label data-v-fa6f2156>Sale Date (YYYY-MM-DD):</label><input${ssrRenderAttr("value", newSale.value.satis_tarihi)} type="date" required data-v-fa6f2156></div><div class="input-group" data-v-fa6f2156><label data-v-fa6f2156>Customer Name:</label><input${ssrRenderAttr("value", newSale.value.satis_m\u00FCsteri_adi)} type="text" required data-v-fa6f2156></div><div class="input-group" data-v-fa6f2156><label data-v-fa6f2156>Car Plate:</label><input${ssrRenderAttr("value", newSale.value.satis_plakasi)} type="text" required data-v-fa6f2156></div><div class="input-group" data-v-fa6f2156><label data-v-fa6f2156>Products Sold (comma separated):</label><input${ssrRenderAttr("value", newSale.value.satilan_\u00FCr\u00FCnler)} type="text" placeholder="e.g., 1,2,3" data-v-fa6f2156></div><button class="btn-add" data-v-fa6f2156>Add Sale</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/satislar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const satislar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa6f2156"]]);

export { satislar as default };
//# sourceMappingURL=satislar-572LtG5Y.mjs.map
