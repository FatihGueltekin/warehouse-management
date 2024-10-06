import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { useSSRContext, ref, unref, mergeProps, computed } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main$3 = {
  __name: "SparePartInput",
  __ssrInlineRender: true,
  emits: ["submitPartIds"],
  setup(__props, { emit: __emit }) {
    const inputValue = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "input-container" }, _attrs))} data-v-58bca01d><span class="baslik" data-v-58bca01d>\xDCr\xFCnleri plakaya isle: </span><div class="input-wrapper" data-v-58bca01d><input type="text"${ssrRenderAttr("value", unref(inputValue))} placeholder="\xDCr\xFCn numarasi ekle (virg\xFClle ayir)" class="styled-input" data-v-58bca01d>`);
      if (unref(inputValue)) {
        _push(`<span class="clear-button" data-v-58bca01d>X</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="styled-button" data-v-58bca01d>\xDCr\xFCnleri isle</button></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SparePartInput.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SparePartInput = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-58bca01d"]]);
const _sfc_main$2 = {
  __name: "CarsSearch",
  __ssrInlineRender: true,
  props: {
    cars: {
      type: Array,
      required: true
    }
  },
  emits: ["selectCar"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const searchQuery = ref("");
    const selectedCar = ref(null);
    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const filteredCars = computed(() => {
      return props.cars.filter(
        (car) => car.arac_id.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a486e5c8><input${ssrRenderAttr("value", unref(searchQuery))} placeholder="Arac plakasi ara" class="search-input" data-v-a486e5c8><table data-v-a486e5c8><thead data-v-a486e5c8><tr data-v-a486e5c8><th data-v-a486e5c8>Kayitli arac listesi. (${ssrInterpolate(__props.cars.length)} kayitli arac blunmaktadir): </th></tr></thead><tbody data-v-a486e5c8><!--[-->`);
      ssrRenderList(unref(paginatedCars), (car, index2) => {
        _push(`<tr class="${ssrRenderClass({ "selected-car": unref(selectedCar) && unref(selectedCar).arac_id === car.arac_id })}" data-v-a486e5c8><td data-v-a486e5c8>${ssrInterpolate(car.arac_id)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="buttons" data-v-a486e5c8><div data-v-a486e5c8>`);
      if (unref(hasMoreCars)) {
        _push(`<button class="load-more-btn" data-v-a486e5c8> Daha fazla arac g\xF6ster </button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hasLessCars)) {
        _push(`<button class="load-less-btn" data-v-a486e5c8> Daha az arac g\xF6ster </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CarsSearch.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CarsSearch = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a486e5c8"]]);
const _sfc_main$1 = {
  __name: "SpareParts",
  __ssrInlineRender: true,
  props: {
    parts: {
      type: Array,
      required: true
    }
  },
  emits: ["selectPart"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const searchQuery = ref("");
    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const filteredParts = computed(() => {
      return props.parts.filter(
        (part) => part.\u00FCr\u00FCn_numarasi.toString().includes(searchQuery.value.toLowerCase()) || part.\u00FCr\u00FCn_ismi.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
    const paginatedParts = computed(() => {
      const start = 0;
      const end = currentPage.value * itemsPerPage.value;
      return filteredParts.value.slice(start, end);
    });
    const hasMoreParts = computed(() => {
      return currentPage.value * itemsPerPage.value < filteredParts.value.length;
    });
    const hasLessParts = computed(() => {
      return currentPage.value !== 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-971737e6><input${ssrRenderAttr("value", unref(searchQuery))} placeholder="Par\xE7a ara - numara veya isim ara" class="search-input" data-v-971737e6><table data-v-971737e6><thead data-v-971737e6><tr data-v-971737e6><th data-v-971737e6>\xDCr\xFCn numarasi</th><th data-v-971737e6>\xDCr\xFCn adi</th><th data-v-971737e6>Stok adedi</th></tr></thead><tbody data-v-971737e6><!--[-->`);
      ssrRenderList(unref(paginatedParts), (part, index2) => {
        _push(`<tr data-v-971737e6><td data-v-971737e6>${ssrInterpolate(part.\u00FCr\u00FCn_numarasi)}</td><td data-v-971737e6>${ssrInterpolate(part.\u00FCr\u00FCn_ismi)}</td><td data-v-971737e6>${ssrInterpolate(part.\u00FCr\u00FCn_adedi)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="buttons" data-v-971737e6><div data-v-971737e6>`);
      if (unref(hasMoreParts)) {
        _push(`<button class="load-more-btn" data-v-971737e6> Daha fazla par\xE7a g\xF6ster </button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hasLessParts)) {
        _push(`<button class="load-less-btn" data-v-971737e6> Daha az par\xE7a g\xF6ster </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SpareParts.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SpareParts = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-971737e6"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const cars = ref([]);
    const allSpareParts = ref([]);
    const selectedCar = ref(null);
    const showError = ref(false);
    const errorMessage = ref("");
    const selectCar = (car) => {
      selectedCar.value = car;
    };
    const decreaseStock = async (partsIds) => {
      console.log("partsId: ", partsIds);
      if (!selectedCar.value) {
        showError.value = true;
        errorMessage.value = "Arac (Plaka) secilme. L\xFCtfe bir arac secin";
        return;
      }
      if (!partsIds.length || partsIds.some((id) => !id)) {
        showError.value = true;
        errorMessage.value = "\xDCr\xFCn numarasi bulunamadi. Gecerli \xFCr\xFCn numarasi ekleyin.";
        return;
      }
      console.log("partIds: ", partsIds);
      for (let i = 0; i < partsIds.length; i++) {
        const partId = partsIds[i];
        const part = allSpareParts.value.find((p) => p.\u00FCr\u00FCn_numarasi === partId);
        if (part && part.adet > 0) {
          part.adet -= 1;
          if (part.adet < 0) {
            showError.value = true;
            errorMessage.value = `${partId} yeterli stogu bulunmamaktadir.`;
            break;
          }
        } else {
          showError.value = true;
          errorMessage.value = `${partId} numarasinda bir \xFCr\xFCn bulunamadi.`;
          break;
        }
      }
      if (showError.value) {
        return;
      }
      try {
        await $fetch("/api/parts", {
          method: "POST",
          body: allSpareParts.value
        });
      } catch (error) {
        showErrorModal("\xDCr\xFCnler sisteme eklenemedi.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3504925e><h2 data-v-3504925e>Araclar</h2><h3 data-v-3504925e>Bir arac seciniz (Plaka): <span class="${ssrRenderClass({ "car-selected": unref(selectedCar), "car-not-selected": !unref(selectedCar) })}" data-v-3504925e>${ssrInterpolate(unref(selectedCar) ? unref(selectedCar) : "Arac Secilmedi")}</span></h3>`);
      _push(ssrRenderComponent(SparePartInput, { onSubmitPartIds: decreaseStock }, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<h3 data-v-3504925e>Arac Plakasi sec</h3>`);
      _push(ssrRenderComponent(CarsSearch, {
        cars: unref(cars),
        onSelectCar: selectCar
      }, null, _parent));
      _push(`<h3 data-v-3504925e>\xDCr\xFCn listesi: </h3>`);
      _push(ssrRenderComponent(SpareParts, { parts: unref(allSpareParts) }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3504925e"]]);

export { index as default };
//# sourceMappingURL=index-DuVGOmAB.mjs.map
