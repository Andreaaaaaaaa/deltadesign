import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-12903',
  {
    props: {
      theme: figma.enum('类型', {
        '基本': 'file',
        '输入框': 'file-input',
        '拖拽上传': 'file-flow',
        '图片上传': 'image',
      }),
      disabled: figma.enum('状态', {
        '置灰': true,
        '上传前': undefined,
        'hover': undefined,
        '点击': undefined,
        '上传中': undefined,
        '上传成功': undefined,
        '上传失败': undefined,
        '图片操作': undefined,
        '拖拽中': undefined,
        '上传中（批量）': undefined,
        '拖拽中（批量）': undefined,
      }),
    },
    example: ({ theme, disabled }) =>
      html`<t-upload
  :theme="${theme}"
  ${disabled}
  action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo-large"
/>`,
    imports: ['import { Upload as TUpload } from "@tencent/delta-ui"'],
  }
)
