export const chunk = (arr, size) =>
  Array.isArray(arr) ? Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)) : [];



    export const GeneratorPrints = (prints) => {
      if(!prints || !Array.isArray(prints)) {
        return [];
      }
      try {
        const chunkItems = chunk(prints, 8);
        let popped = chunkItems.pop();

        if(popped.length >= 5) {
          chunkItems.push(popped);
        }
        return chunkItems.map(it => {
          let newChunk = chunk(it, 8);
          let endItems = newChunk.pop();
          endItems.push({
            isRegister: true, icon: '/svg/more-cate.svg', 
            border: true, name : 'Xem tất cả',
            toogle: 'down'
          });
          newChunk.push(endItems);
          return newChunk;
        });
      } catch (ex) {
        return [];
      }
    }
    
    export const GeneratorGrid = (prints) => {
      if(!prints || !Array.isArray(prints)) {
        return [];
      }
      try {
        const chunkItems = chunk(prints, 3);
        let lastArr = chunkItems.pop();
        if(lastArr.length == 2 ) {
          lastArr.push({
            isRegister: true, icon: '/svg/minus.svg', 
            border: true, name : 'Thu gọn',
            toogle: 'up'
          })
          chunkItems.push(lastArr);
        }
        return chunkItems;
      } catch (ex) {
        return [];
      }
    }