import noop from 'lodash/noop';
import Pagination from '../Pagination';

export default {
  components: {
    Pagination,
  },

  computed: {
    pageInfo() {
      return {
        _page: this.page,
        _pagesize: this.pageSize,
      };
    },
  },

  data() {
    return {
      count: 0,
      page: 1,
      pageSize: 20,
    };
  },

  methods: {
    resetPageInfo() {
      this.page = 1;
      this.pageSize = 20;
    },

    gotoPage(to) {
      this.page = to;
      this.refresh();
    },
    gotoTop() {
      if (!this.$refs.header) {
        return;
      }
      let {header} = this.$refs;
      header = header instanceof Element ? header : header.$el;
      this.$nextTick()
        .then(() => {
          header.scrollIntoView({
            behavior: 'smooth',
          });
        });
    },
    refresh: noop,
  },
};
