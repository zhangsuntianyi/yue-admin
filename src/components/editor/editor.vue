<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import WangEditor from 'wangeditor';
import 'wangeditor/release/wangEditor.min.css';

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i += 1) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: '',
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: val => oneOf(val, ['html', 'text']),
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200,
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: true,
    },
    /**
     * 上传图片是否可多选
     */
    multipleImage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    editorId() {
      return `editor_${this._uid}`;
    },
  },
  data() {
    return {
      editor: null
    };
  },
  methods: {
    setHtml(val) {
      this.editor.txt.html(val);
    },
  },
  mounted() {
    this.editor = new WangEditor(`#${this.editorId}`);

    // 配置图片上传 start
    /*// 配置上传参数名
    this.editor.customConfig.uploadFileName = 'file';
    // 配置上传地址
    this.editor.customConfig.uploadImgServer = this.uploadUrl;
    // 配置头部
    this.editor.customConfig.uploadImgHeaders = this.headers;

    if (this.multipleImage) {
      this.editor.customConfig.uploadImgMaxLength = 10;
      // 自己定义上传的方法
      this.editor.customConfig.customUploadImg = (files, insert) => {
        const promises = [];
        _.forEach(files, (file) => {
          promises.push(new Promise((resolve, reject) => {
            const param = new FormData();
            param.append('file', file);
            HttpUtil.use({
              method: 'post',
              url: '/imageUpload',
              data: param,
              success: (responseData) => {
                resolve(responseData);
              },
              error: () => {
                reject();
              },
            });
          }));
        });
        Promise.all(promises).then((responseData) => {
          _.forEach(responseData, (item) => {
            console.log(item);
            insert(item);
            this.editor.cmd.do('insertHTML', '<p><br></p>');
          });
        }).catch(() => {
          this.$Message.error('上传失败');
        });
      };
    } else {
      this.editor.customConfig.uploadImgMaxLength = 1;
      // 上传处理
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      this.editor.customConfig.uploadImgHooks = {
        // eslint-disable-next-line
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          const url = result.data;
          insertImg(url);
          // result 必须是一个 JSON 格式字符串！！！否则报错
        },
      };
    }

    // 上传图片错误
    this.editor.customConfig.customAlert = (info) => {
      this.$Message.error(info);
    };*/
    // 配置图片上传 end

    this.editor.customConfig.zIndex = 100;
    this.editor.customConfig.onchange = (html) => {
      const text = this.editor.txt.text();
      if (this.cache) {
        localStorage.editorCache = html;
      }
      this.$emit('input', this.valueType === 'html' ? html : text);
      this.$emit('on-change', html, text);
    };
    this.editor.customConfig.onchangeTimeout = this.changeInterval;
    // create这个方法一定要在所有配置项之后调用
    this.editor.create();
    // 如果本地有存储加载本地存储内容
    const html = this.value || (this.cache && localStorage.editorCache);
    if (html) {
      this.editor.txt.html(html);
    }
  },
};
</script>

<style>

</style>
