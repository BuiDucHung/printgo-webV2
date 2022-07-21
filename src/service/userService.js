import RequestUtils from "libs/RequestUtils";



export const SanPham = { 
    thietke: {},
    inAn: {},
    async findNameThietKe(id) {
      if(this.thietke[id]) {
        return this.thietke[id]
      }
      const cms = await RequestUtils.openCdp('/config/cm-thiet-ke', {}, []);
      for(let cm of cms) {
        this.thietke[cm.id] = cm.name;
      }
      return this.thietke[id]
    },

    async fetchByCode(code) {
      return RequestUtils.getCdp('/product/find-code', { code });
    }
  }