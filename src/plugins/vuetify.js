import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#333333',
        secondary: '2B2B2B',
        white: 'ffffff',
        orange: 'FC6D2B',
        darkgrey: '707070',
        complete: '2BFC83',
        inprogress: 'FFB936',
        incomplete: 'FF1212',
        lightgrey: 'cacaca'
      }
    }
  }
});
