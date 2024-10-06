import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { ref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "urunler",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const newProduct = ref({ \u00FCr\u00FCn_numarasi: "", \u00FCr\u00FCn_ismi: "", \u00FCr\u00FCn_fiyati: "", \u00FCr\u00FCn_adedi: "" });
    const successMessage = ref("");
    const expandedProductId = ref(null);
    ref(false);
    ref(false);
    ref(null);
    ref(null);
    const productEditCount = ref(0);
    ref(null);
    const searchQuery = ref("");
    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    ref(false);
    ref("");
    ref([]);
    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        var _a, _b, _c, _d;
        const search = searchQuery.value.toLowerCase();
        return ((_a = product == null ? void 0 : product.\u00FCr\u00FCn_numarasi) == null ? void 0 : _a.toLowerCase().includes(search)) || ((_b = product == null ? void 0 : product.\u00FCr\u00FCn_ismi) == null ? void 0 : _b.toLowerCase().includes(search)) || ((_c = product == null ? void 0 : product.\u00FCr\u00FCn_kayit_tarihi) == null ? void 0 : _c.toLowerCase().includes(search)) || ((_d = product == null ? void 0 : product.\u00FCr\u00FCn_fiyati) == null ? void 0 : _d.toString().toLowerCase().includes(search));
      });
    });
    const paginatedProducts = computed(() => {
      const start = 0;
      const end = currentPage.value * itemsPerPage.value;
      return filteredProducts.value.slice(start, end);
    });
    const hasMoreProducts = computed(() => {
      return currentPage.value * itemsPerPage.value < filteredProducts.value.length;
    });
    const hasLessProducts = computed(() => {
      return currentPage.value !== 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d7cc4fa9><h1 data-v-d7cc4fa9>\xDCr\xFCnler</h1>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="add-product-section" data-v-d7cc4fa9><h3 data-v-d7cc4fa9>Yeni \xDCr\xFCn Ekle</h3><input${ssrRenderAttr("value", newProduct.value.\u00FCr\u00FCn_numarasi)} placeholder="\xDCr\xFCn numarasi" data-v-d7cc4fa9><input${ssrRenderAttr("value", newProduct.value.\u00FCr\u00FCn_ismi)} placeholder="\xDCr\xFCn ismi" data-v-d7cc4fa9><input${ssrRenderAttr("value", newProduct.value.\u00FCr\u00FCn_fiyati)} placeholder="\xDCr\xFCn fiyati" data-v-d7cc4fa9><input${ssrRenderAttr("value", newProduct.value.\u00FCr\u00FCn_adedi)} placeholder="\xDCr\xFCn adedi" data-v-d7cc4fa9><button data-v-d7cc4fa9>\xDCr\xFCn Ekle</button></div>`);
      if (successMessage.value) {
        _push(`<p class="success-message" data-v-d7cc4fa9>${ssrInterpolate(successMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 data-v-d7cc4fa9>\xDCr\xFCn Listesi</h3><input${ssrRenderAttr("value", searchQuery.value)} placeholder="\xDCr\xFCn numarasi, \xDCr\xFCn Ad\u0131, \xDCr\xFCn fiyiti, kayit tarihi ara" class="search-input" data-v-d7cc4fa9><table data-v-d7cc4fa9><thead data-v-d7cc4fa9><tr data-v-d7cc4fa9><th data-v-d7cc4fa9>Kayitli \xFCr\xFCn listesi (${ssrInterpolate(products.value.length)} kayitli \xFCr\xFCn bulunmaktad\u0131r) - Filtrelenen \xFCr\xFCn say\u0131s\u0131: ${ssrInterpolate(filteredProducts.value.length)}</th></tr></thead><tbody data-v-d7cc4fa9><!--[-->`);
      ssrRenderList(paginatedProducts.value, (product, index) => {
        _push(`<!--[--><tr data-v-d7cc4fa9><td class="table-row" title="\xDCr\xFCn bilgilerini g\xF6stermek i\xE7in t\u0131kla" data-v-d7cc4fa9><div class="arrow-wrapper" data-v-d7cc4fa9><span class="row-element-first arrow" data-v-d7cc4fa9>${ssrInterpolate(expandedProductId.value === product.\u00FCr\u00FCn_numarasi ? "\u2191" : "\u2193")}</span></div><span class="row-element" data-v-d7cc4fa9>\xDCr\xFCn numarasi: ${ssrInterpolate(product.\u00FCr\u00FCn_numarasi)}</span><span class="row-element" data-v-d7cc4fa9>${ssrInterpolate(product.\u00FCr\u00FCn_ismi)}</span><span class="row-element" data-v-d7cc4fa9>TL: ${ssrInterpolate(product.\u00FCr\u00FCn_fiyati)}</span><span class="row-element" data-v-d7cc4fa9>Stok: ${ssrInterpolate(product.\u00FCr\u00FCn_adedi)}</span><button class="row-element row-element-last remove-button" data-v-d7cc4fa9>\xDCr\xFCn\xFC Sil</button></td></tr>`);
        if (expandedProductId.value === product.\u00FCr\u00FCn_numarasi) {
          _push(`<tr class="details-row" data-v-d7cc4fa9><td colspan="1" data-v-d7cc4fa9><div data-v-d7cc4fa9><p data-v-d7cc4fa9><strong data-v-d7cc4fa9>\xDCr\xFCn Ad\u0131:</strong> ${ssrInterpolate(product.\u00FCr\u00FCn_ismi)}</p><p data-v-d7cc4fa9><strong data-v-d7cc4fa9>Fiyat:</strong> ${ssrInterpolate(product.\u00FCr\u00FCn_fiyati)} TL</p><p data-v-d7cc4fa9><strong data-v-d7cc4fa9>Stok Miktar\u0131:</strong> ${ssrInterpolate(product.\u00FCr\u00FCn_adedi)}</p><p data-v-d7cc4fa9><strong data-v-d7cc4fa9>Kay\u0131t Tarihi:</strong> ${ssrInterpolate(product.\u00FCr\u00FCn_kayit_tarihi)}</p><span data-v-d7cc4fa9>\xDCr\xFCn stogunu d\xFCzenle: </span><div class="stock-adjustment" data-v-d7cc4fa9><input type="number"${ssrRenderAttr("value", productEditCount.value)} placeholder="Miktar" min="1" class="stock-input" data-v-d7cc4fa9><button class="stock-button" data-v-d7cc4fa9>\xDCr\xFCn stogunu art\u0131r</button><button class="stock-button" data-v-d7cc4fa9>\xDCr\xFCn stogune azalt</button></div></div></td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table><div class="buttons" data-v-d7cc4fa9><div data-v-d7cc4fa9>`);
      if (hasMoreProducts.value) {
        _push(`<button class="load-more-btn" data-v-d7cc4fa9> Daha fazla \xFCr\xFCn g\xF6ster </button>`);
      } else {
        _push(`<!---->`);
      }
      if (hasLessProducts.value) {
        _push(`<button class="load-less-btn" data-v-d7cc4fa9> Daha az \xFCr\xFCn g\xF6ster </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/urunler.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const urunler = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7cc4fa9"]]);

export { urunler as default };
//# sourceMappingURL=urunler-CbxKEpHp.mjs.map
