
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      //base: , //部署至非根目录时需要
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: 'myumi',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
