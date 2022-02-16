import { proxy } from 'valtio'
import supabase from './modules/supabase';

const Template = {
  cards: [],
  favicons: {},
  search: '',

  isFullscreen: false,
  isScrolling: false,

  modal: {
    isVisible: false,
    content: '',
    data: {
      snapshot: {
        value: '',
        pickColor: '',
        pickIndex: -1,
        previousPickIndex: -1,
        tags: [],
        isShowingIcons: true,
        isUpdatingTabs: false,
        isShowingCustomPick: false,
        id: null
      },

      profile: {
        email: '',
        password: '',
        error: null,
        done: () => {},
        isPasswordVisible: false,
        isSignIn: true,
        isLoading: false
      },

      settings: {
        category: null,
        sync: {
          advanced: {
            applicationUrl: ''
          },

          supabase: {
            supabaseUrl: '',
            supabaseAnonKey: ''
          }
        }
      },

      share: {
        id: '',
        url: '',
        isPublic: false
      },

      tabs: {
        tabs: [],
        id: '',
        current: 'default',
        create: {
          url: '',
          title: '',
          favicon: ''
        }
      }
    }
  },

  contextMenu: {
    x: 0,
    y: 0,
    height: 0,

    data: '',
    type: '',

    isFlipped: false,
    isVisible: false,
    isPreventingDefault: import.meta.env.MODE === 'production'
  },

  settings: {
    sync: {
      isSynchronizing: true,
      isRealtime: true,

      advanced: {
        applicationUrl: ''
      },

      supabase: {
        supabaseUrl: '',
        supabaseAnonKey: ''
      }
    },

    behavior: {
      isFullscreen: false,

      cards: {
        isDeletingPermanently: false,
        isOpeningInWindow: false
      }
    }
  },

  dialogue: {
    isVisible: false,
    type: '',
    text: '',
    resolve: () => {},
  },

  environment: import.meta.env.VITE_APP_ENVIRONMENT,
  session: supabase.auth.session(),
};

const Store = proxy(Template);
export default Store;

export {
  Template
};