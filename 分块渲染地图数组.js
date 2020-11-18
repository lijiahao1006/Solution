const mixin = {
  async renderSplit(dataList){ // 执行分割数组操作
    const length = 150; // 一次渲染的数量
    let data = dataList;
    while(data.length > 0){
        let arr = data.splice(0, length)
        this.renderBMap(arr)
        await this.sleep(100);
    } 
  },
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)), // 异步处理函数
  renderBMap(arr){ // 加载地图标记点
    arr.forEach(item => {
        this.map.addOverlay(item.pl);
        this.map.addOverlay(item.label);
    });
  }
}