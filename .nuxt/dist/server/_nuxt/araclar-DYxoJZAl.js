import { _ as __nuxt_component_0 } from "./client-only-Bwxzq3Sq.js";
import { ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
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
import "ufo";
const _sfc_main = {
  __name: "araclar",
  __ssrInlineRender: true,
  setup(__props) {
    const cars = ref([]);
    const newCar = ref({ arac_id: "", arac_sahibi: "", adres: "", arac_markasi: "" });
    const successMessage = ref("");
    const expandedCarId = ref(null);
    ref(false);
    ref(null);
    const searchQuery = ref("");
    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    ref(false);
    ref("");
    const filteredCars = computed(() => {
      return cars.value.filter((car) => {
        var _a, _b, _c, _d, _e;
        const search = searchQuery.value.toLowerCase();
        return ((_a = car == null ? void 0 : car.arac_id) == null ? void 0 : _a.toLowerCase().includes(search)) || ((_b = car == null ? void 0 : car.arac_sahibi) == null ? void 0 : _b.toLowerCase().includes(search)) || ((_c = car == null ? void 0 : car.adres) == null ? void 0 : _c.toLowerCase().includes(search)) || ((_d = car == null ? void 0 : car.arac_markasi) == null ? void 0 : _d.toLowerCase().includes(search)) || ((_e = car == null ? void 0 : car.kayit_tarihi) == null ? void 0 : _e.toLowerCase().includes(search));
      });
    });
    const paginatedCars = computed(() => {
      const start = 0;
      const end = currentPage.value * itemsPerPage.value;
      return filteredCars.value.slice(start, end);
    });
    const hasMoreCars = computed(() => {
      return currentPage.value * itemsPerPage.value < filteredCars.value.length;
    });
    const hasLessCars = computed(() => {
      return currentPage.value !== 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a2ff69ec><h1 data-v-a2ff69ec>Araclar</h1>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="add-car-section" data-v-a2ff69ec><h3 data-v-a2ff69ec>Yeni Arac Ekle</h3><input${ssrRenderAttr("value", unref(newCar).arac_id)} placeholder="Arac plakasi" data-v-a2ff69ec><input${ssrRenderAttr("value", unref(newCar).arac_sahibi)} placeholder="Arac Sahibi" data-v-a2ff69ec><input${ssrRenderAttr("value", unref(newCar).adres)} placeholder="Adres" data-v-a2ff69ec><input${ssrRenderAttr("value", unref(newCar).arac_markasi)} placeholder="Arac Markası" data-v-a2ff69ec><button data-v-a2ff69ec>Arac Ekle</button></div>`);
      if (unref(successMessage)) {
        _push(`<p class="success-message" data-v-a2ff69ec>${ssrInterpolate(unref(successMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 data-v-a2ff69ec>Arac Listesi</h3><input${ssrRenderAttr("value", unref(searchQuery))} placeholder="Arac plakasi, arac sahibi, arac markasi, adres, tarih ara" class="search-input" data-v-a2ff69ec><table data-v-a2ff69ec><thead data-v-a2ff69ec><tr data-v-a2ff69ec><th data-v-a2ff69ec>Kayitli arac listesi. (${ssrInterpolate(unref(cars).length)} kayitli arac blunmaktadir) - Filtrelenen arac sayisi: ${ssrInterpolate(unref(filteredCars).length)}: </th></tr></thead><tbody data-v-a2ff69ec><!--[-->`);
      ssrRenderList(unref(paginatedCars), (car, index) => {
        _push(`<!--[--><tr data-v-a2ff69ec><td class="table-row" title="Arac biligilerini göstermek icin tikla" data-v-a2ff69ec><div class="arrow-wrapper" data-v-a2ff69ec><span class="row-element-first arrow" data-v-a2ff69ec>${ssrInterpolate(unref(expandedCarId) === car.arac_id ? "↑" : "↓")}</span></div><span class="row-element" data-v-a2ff69ec>${ssrInterpolate(car.arac_id)}</span><button class="row-element row-element-last remove-button" data-v-a2ff69ec>Araci Sil</button></td></tr>`);
        if (unref(expandedCarId) === car.arac_id) {
          _push(`<tr class="details-row" data-v-a2ff69ec><td colspan="1" data-v-a2ff69ec><div data-v-a2ff69ec><p data-v-a2ff69ec><strong data-v-a2ff69ec>Arac Sahibi:</strong> ${ssrInterpolate(car.arac_sahibi)}</p><p data-v-a2ff69ec><strong data-v-a2ff69ec>Adres:</strong> ${ssrInterpolate(car.adres)}</p><p data-v-a2ff69ec><strong data-v-a2ff69ec>Kayıt Tarihi:</strong> ${ssrInterpolate(car.kayit_tarihi)}</p><p data-v-a2ff69ec><strong data-v-a2ff69ec>Arac Markası:</strong> ${ssrInterpolate(car.arac_markasi)}</p></div></td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table><div class="buttons" data-v-a2ff69ec><div data-v-a2ff69ec>`);
      if (unref(hasMoreCars)) {
        _push(`<button class="load-more-btn" data-v-a2ff69ec> Daha fazla arac göster </button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hasLessCars)) {
        _push(`<button class="load-less-btn" data-v-a2ff69ec> Daha az arac göster </button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/araclar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const araclar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a2ff69ec"]]);
export {
  araclar as default
};
//# sourceMappingURL=araclar-DYxoJZAl.js.map
