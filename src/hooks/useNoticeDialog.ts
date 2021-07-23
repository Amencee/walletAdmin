import { useQuasar } from 'quasar';
import { NoticeInfo } from './model/NoticeInfo';
import { reactive, toRefs, ref, watch } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { backServerUrl } from 'src/utils/index';


function useEditor() {
  const $q = useQuasar();

  const font = {
    arial: 'Arial',
    arial_black: 'Arial Black',
    comic_sans: 'Comic Sans MS',
    courier_new: 'Courier New',
    impact: 'Impact',
    lucida_grande: 'Lucida Grande',
    times_new_roman: 'Times New Roman',
    verdana: 'Verdana'
  };

  const toolbar = [
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: 'only-icons',
        options: ['left', 'center', 'right', 'justify']
      },
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
    ['token', 'hr', 'link', 'custom_btn'],
    ['print', 'fullscreen'],
    [
      {
        label: $q.lang.editor.formatting,
        icon: $q.iconSet.editor.formatting,
        list: 'no-icons',
        options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
      },
      {
        label: $q.lang.editor.fontSize,
        icon: $q.iconSet.editor.fontSize,
        fixedLabel: true,
        fixedIcon: true,
        list: 'no-icons',
        options: [
          'size-1',
          'size-2',
          'size-3',
          'size-4',
          'size-5',
          'size-6',
          'size-7'
        ]
      },
      {
        label: $q.lang.editor.defaultFont,
        icon: $q.iconSet.editor.font,
        fixedIcon: true,
        list: 'no-icons',
        options: [
          'default_font',
          'arial',
          'arial_black',
          'comic_sans',
          'courier_new',
          'impact',
          'lucida_grande',
          'times_new_roman',
          'verdana'
        ]
      },
      'removeFormat'
    ],
    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

    ['undo', 'redo'],
    ['viewsource']
  ];

  return { toolbar, font };
}

export default function useNoticeDialog(props: any) {
  const $q = useQuasar();
  const router = useRouter();
  const { toolbar, font } = useEditor();
  const store = useStore();

  const {
    dialogRef,
    onDialogHide,
    onDialogOK,
    onDialogCancel
  } = useDialogPluginComponent();

  const data = reactive({
    title: '',
    content: '',
    dialog: false,
    position: 'top',
    noticeTip: '请输入完整内容',
    lang: { label: 'English', value: 'en' },
    options: [
      { label: '中文', value: 'zh' },
      { label: '日文', value: 'ja' },
      { label: 'English', value: 'en' }
    ]
  });
  const account = store.state.account?.accountName;


  if (props.row) {
    data.title = props.row.title;
    data.content = props.row.content;
    console.log("Amence select lang", props.row.lang);
    const choiceOption = data.options.find(
      item => item.value == props.row.lang
    );
    if (choiceOption) {
      data.lang = choiceOption;
    }
  }

  const pushNotice = () => {
    if (!checkInputFormat() || !checkEditorFormat()) {
      data.dialog = true;
      return;
    }
    let notice;
    if (props.row) {
      notice = new NoticeInfo(
        data.title,
        data.content,
        data.lang.value,
        props.row.id,
        props.row.name
      );
    } else {
      notice = new NoticeInfo(data.title, data.content, data.lang.value);
      console.log('Amence 选中语言',data.lang);
    }
    notice.name = account;

    const pushNoticeUrl = backServerUrl + '/v1/pushServerNotice';
    axios.post(pushNoticeUrl, notice).then(res => {
      if (res.data.success) {
        onDialogHide();
        // 刷新主页面
        router.push({ path: '/index' });
        return;
      }
      data.dialog = true;
      data.noticeTip = res.data.result;
    });

  };

  const checkInputFormat = () => {
    return data.title ? true : false;
  };
  const checkEditorFormat = () => {
    return data.content ? true : false;
  };

  return {
    dialogRef,
    onDialogHide,
    onDialogOK,
    onDialogCancel,
    toolbar,
    font,
    ...toRefs(data),
    pushNotice,
    checkInputFormat,
    checkEditorFormat
  };
}