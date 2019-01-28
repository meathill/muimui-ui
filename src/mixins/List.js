import paged from './paged';
import format from './format';

export default {
  mixins: [paged, format],
  data() {
    return {
      isLoading: false,
      isLoaded: false,
      isSearching: false,
      message: null,

      list: null,
    };
  },

  methods: {
    refresh() {

    },
  },

  beforeMount() {
    this.refresh();
  },
};
